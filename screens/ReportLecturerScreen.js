import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  HomeIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid";
import ReportCard from "../components/ReportCard";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import StudentReportList from "../components/StudentReportList";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

const ReportLecturerScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [students, setStudents] = useState([]);

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
          Performance Report
        </Text>
      </View>

      <View className="bg-[#F1F5F8] h-full">
        {/* content */}
        <ScrollView className="mx-5 space-y-2 mt-2">
          {students.map((student) => (
            <StudentReportList key={student.id} student={student} />
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View className="absolute inset-x-0 bottom-0 h-[90px] pb-3 bg-white shadow shadow-black/10">
        <View className="flex-row justify-between px-14 pt-[6px]">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="h-full items-center space-y-1">
              <UserCircleIcon size={30} color="#6c757d" />
              <Text className="text-xs text-[#6c757d]">Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Home")}
          >
            <View className="h-full items-center space-y-1">
              <HomeIcon size={30} color="#6c757d" />
              <Text className="text-xs text-[#6c757d]">Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="" onPress={() => {}}>
            <View className="h-full items-center space-y-1">
              <CalendarDaysIcon size={30} color="#6c757d" />
              <Text className="text-xs text-[#6c757d]">Attendance</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportLecturerScreen;
