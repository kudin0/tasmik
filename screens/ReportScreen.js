import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  HomeIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid";
import ReportCard from "../components/ReportCard";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import { auth, db } from "../firebase";
import { collectionGroup, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "firebase/database";

const ReportScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
      } else {
        console.log("User does not exists");
      }
    });
  }, []);

  const getStudentAttendance = async () => {
    const attedanceQuery = query(
      collectionGroup(db, "attendance"),
      where("uid", "==", user.uid)
    );

    try {
      const querySnapshot = await getDocs(attedanceQuery);
      const attendanceDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(attendanceDocs);
      console.log(attendanceDocs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getStudentAttendance();
    }
  }, [user]);

  return (
    <SafeAreaView
      className="pt-7 bg-[#826aed] h-full"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl text-[#ffffff] font-extrabold">Report</Text>
      </View>

      <View className="bg-[#F1F5F8] h-full">
        {/* content */}
        <ScrollView className="mx-5 space-y-2 mt-2">
          <ReportCard
            id={"0001"}
            title={"Module 1 - Week 1"}
            date={"##/##/####"}
            marks1={10}
            marks2={8}
            marks3={8}
            aspect1={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu.`}
            aspect2={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
            aspect3={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
          />
          <ReportCard
            id={"0001"}
            title={"Module 2 - Week 2"}
            date={"##/##/####"}
          />
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

export default ReportScreen;
