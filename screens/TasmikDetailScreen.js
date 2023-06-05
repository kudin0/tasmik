import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import StudentsListCard from "../components/StudentListCard";

const TasmikDetailScreen = () => {
  const navigation = useNavigation();
  const {
    params: { id, title, date, time, place, details, classroom },
  } = useRoute();

  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch the user data
      const userSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userSnapshot.exists) {
        setUser(userSnapshot.data());
      } else {
        console.log("User does not exist");
      }

      // Fetch the student data
      const q = query(
        collection(db, "users"),
        where("type", "==", "student"),
        where("classroom", "==", classroom)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const studentStatus = await Promise.all(
        filteredData.map(async (student) => {
          const attendanceDocRef = doc(
            db,
            "classroom",
            classroom,
            "session",
            id,
            "attendance",
            student.id
          );
          const attendanceDocSnap = await getDoc(attendanceDocRef);
          const status = attendanceDocSnap.exists()
            ? attendanceDocSnap.data().status
            : "none";
          return {
            ...student,
            status: status,
          };
        })
      );

      setStudents(studentStatus);
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (initializing) {
      fetchData();
    }
  }, [initializing]);

  const StudentsList = () => {
    return (
      <View className="px-5 pt-3 space-y-3 h-full">
        <Text className="text-[#6c757d] text-lg">List of Students</Text>
        <ScrollView>
          {students.map((student) => (
            <StudentsListCard
              key={student.id}
              id={student.id}
              name={student.name}
              status={student.status}
              matric={student.matric}
              sessionTitle={title}
              sessionId={id}
              onPressAttendance={() =>
                handleAttendanceButton(student.id, classroom, id)
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const handleAttendanceButton = async (studentId, classroom, session) => {
    try {
      const attendanceDocRef = doc(
        db,
        "classroom",
        classroom,
        "session",
        session,
        "attendance",
        studentId
      );
      await setDoc(attendanceDocRef, {
        status: "attended",
        uid: studentId,
        session: session,
        sessionTitle: title,
        date: date,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(true);
    }
  };

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

  return (
    <>
      <SafeAreaView
        className="bg-white h-full"
        style={SafeViewAndroid.AndroidSafeArea}
      >
        {/* Header */}
        <View className="flex-row relative bg-white items-center justify-center border-b border-gray-300 py-4">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#212529" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold text-[#212529]">
            Tasmik Details
          </Text>
        </View>

        <View className="mx-5 pt-3 space-y-3">
          <Text className=" text-xl font-bold text-[#826aed]">{title}</Text>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Date & Time</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {date} at {time}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Place</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {place}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Surah/ Juzu'</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {details}
            </Text>
          </View>
        </View>

        {user.type === "lecturer" ? <StudentsList /> : null}
      </SafeAreaView>
    </>
  );
};

export default TasmikDetailScreen;
