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
import LeaveStatusCard from "../components/LeaveStatusCard";

const LeaveApplicationScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [leaveApplications, setLeaveApplications] = useState([]);

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

  const getLeaveAppplication = async () => {
    try {
      const q = query(
        collection(db, "leave_application"),
        where("classroom", "==", user.classroom),
        orderBy("timestamp", "asc")
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLeaveApplications(filteredData);
      if (initializing) {
        setInitializing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getLeaveAppplication();
    }
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      getLeaveAppplication();
    }
  }, [isFocused]);

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
          <Text className="text-xl text-[#ffffff] font-extrabold">
            Leave Application
          </Text>
        </View>

        {/* Content */}
        <View className="bg-[#F1F5F8] h-full">
          <ScrollView className="px-5 space-y-2 bg-[#F1F5F8] h-screen">
            {leaveApplications.map((leaveApplication) => (
              <LeaveStatusCard
                key={leaveApplication.id}
                id={leaveApplication.id}
                type={"lecturer"}
                uid={leaveApplication.uid}
                name={leaveApplication.name}
                matric={leaveApplication.matric}
                sessionId={leaveApplication.sessionId}
                session={leaveApplication.session}
                reason={leaveApplication.reason}
                details={leaveApplication.details}
                status={leaveApplication.status}
                timestamp={leaveApplication.timestamp}
                classroom={leaveApplication.classroom}
              />
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
