import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import TasmikBalanceCard from "../components/TasmikBalanceCard";
import StudentBalanceCard from "../components/StudentBalanceCard";

const TasmikBalanceLecturerScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [students, setStudents] = useState([]);
  const [attendedCount, setAttendedCount] = useState("");

  const getUser = async () => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
      } else {
        console.log("User does not exists");
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getStudents = async () => {
    const studentQuery = query(
      collection(db, "users"),
      where("type", "==", "student"),
      where("classroom", "==", user.classroom)
    );
    try {
      const studentsSnapshot = await getDocs(studentQuery);
      const students = [];

      const sessionQuery = query(
        collection(db, "classroom", user.classroom, "session")
      );
      const sessionSnapshot = await getDocs(sessionQuery);
      const totalSessions = sessionSnapshot.size;

      for (const studentDoc of studentsSnapshot.docs) {
        const studentId = studentDoc.id;
        let count = 0;

        for (const sessionDocSnap of sessionSnapshot.docs) {
          const sessionId = sessionDocSnap.id;

          const attendanceDocRef = doc(
            db,
            "classroom",
            user.classroom,
            "session",
            sessionId,
            "attendance",
            studentId
          );

          const attendanceDoc = await getDoc(attendanceDocRef);

          if (
            attendanceDoc.exists() &&
            attendanceDoc.data().status === "Attended"
          ) {
            count++;
          }
        }

        students.push({
          id: studentId,
          ...studentDoc.data(),
          attendedCount: count,
          totalSession: totalSessions,
        });
      }
      setStudents(students);
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    if (user && isFocused) {
      getStudents();
    }
  }, [user, isFocused]);

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="bg-[#826aed] h-full"
      >
        {/* Header */}
        <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-xl text-[#ffffff] font-extrabold">
            Tasmik Progress
          </Text>
        </View>

        {/* Content */}
        <View className="bg-[#F1F5F8] pt-2">
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            className="px-5 space-y-2 bg-[#F1F5F8] h-full"
          >
            {students.map((student) => (
              <StudentBalanceCard
                key={student.id}
                uid={student.id}
                name={student.name}
                matric={student.matric}
                attendedCount={student.attendedCount}
                totalSession={student.totalSession}
              />
            ))}
            <View className="my-20"></View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TasmikBalanceLecturerScreen;
