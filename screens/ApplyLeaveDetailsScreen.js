import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const ApplyLeaveDetailsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    params: {
      id,
      type,
      uid,
      name,
      matric,
      session,
      sessionId,
      reason,
      details,
      status,
      timestamp,
      classroom,
    },
  } = useRoute();

  const updateLeaveApplication = async () => {
    const leaveApplication = doc(db, "leave_application", id);
    await updateDoc(leaveApplication, { status: "Approved" });
  };

  const updateAttendance = async () => {
    try {
      const classroomRef = doc(db, "classroom", classroom);
      const sessionRef = doc(classroomRef, "session", sessionId);
      const attendanceCollectionRef = collection(sessionRef, "attendance");
      const documentRef = doc(attendanceCollectionRef, uid);

      await setDoc(documentRef, {
        status: "Applied Leave",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const approveApplication = async () => {
    try {
      setLoading(true);
      await Promise.all([updateLeaveApplication(), updateAttendance()]);
      navigation.navigate("LeaveApplication");
    } catch (error) {
      console.log(error);
    }
  };

  const rejectApplication = async () => {
    const leaveApplication = doc(db, "leave_application", id);
    await updateDoc(leaveApplication, { status: "Rejected" });
    navigation.navigate("LeaveApplication");
  };

  if (loading)
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
        <View className="flex-row relative py-4 bg-white items-center justify-center border-b border-gray-300">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#212529" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold text-[#212529]">
            Leave Application Details
          </Text>
        </View>

        <ScrollView className="mx-5 pt-3 space-y-4 h-full">
          <Text className="text-xl font-bold text-[#826aed]">
            {name} | {matric}
          </Text>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Session Applied</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {session}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Time of Application</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {timestamp}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">
              Status of Application
            </Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {status}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Reason for Leave</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {reason}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">
              Details of Application
            </Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {details}
            </Text>
          </View>
          {status == "Pending" ? (
            <View className="pt-[100px] space-y-2">
              <TouchableOpacity
                onPress={approveApplication}
                className="w-[270px] items-center self-center bg-[#826aed] shadow shadow-black/20 rounded-xl p-3"
              >
                <Text className="text-center text-white text-2xl font-bold">
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={rejectApplication}
                className="w-[270px] items-center self-center bg-[#ffffff] shadow shadow-black/20 rounded-xl p-3"
              >
                <Text className="text-center text-[#826aed] text-2xl font-bold">
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ApplyLeaveDetailsScreen;
