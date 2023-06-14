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
import { HomeIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { ArrowLeftIcon, CalendarDaysIcon } from "react-native-heroicons/solid";
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
import LeaveApplicationStudentCard from "../components/LeaveApplicationStudentCard";

const LeaveApplicationScreen = () => {
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
    try {
      const q = query(
        collection(db, "users"),
        where("type", "==", "student"),
        where("classroom", "==", user.classroom)
      );
      const studentsSnapshot = await getDocs(q);
      const students = [];

      for (const studentDoc of studentsSnapshot.docs) {
        const studentId = studentDoc.id;

        const leaveQuery = query(
          collection(db, "leave_application"),
          where("uid", "==", studentId),
          where("status", "==", "Pending")
        );
        const leaveSnapshot = await getDocs(leaveQuery);
        const pendingLeaveCount = leaveSnapshot.size;

        students.push({
          id: studentId,
          pendingLeaveCount: pendingLeaveCount,
          ...studentDoc.data(),
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

  const handleTasmikButton = () => {
    if (user.type === "lecturer") {
      navigation.navigate("TasmikLecturer");
    }

    if (user.type === "student") {
      navigation.navigate("Tasmik");
    }
  };

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
            Leave Application
          </Text>
        </View>

        {/* Content */}
        <View className="">
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            className="px-5 space-y-2 bg-[#F1F5F8] h-full"
          >
            {students.map((student) => (
              <LeaveApplicationStudentCard key={student.id} student={student} />
            ))}
            <View className="my-20"></View>
          </ScrollView>
        </View>

        {/* Bottom Navigation */}
        <View className="absolute inset-x-0 bottom-0 h-[90px] pb-3 bg-white shadow shadow-black/30">
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
            <TouchableOpacity className="" onPress={handleTasmikButton}>
              <View className="h-full items-center space-y-1">
                <CalendarDaysIcon size={30} color="#6c757d" />
                <Text className="text-xs text-[#6c757d]">Attendance</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LeaveApplicationScreen;
