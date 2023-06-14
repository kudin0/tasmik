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
    params: { leaveApplication },
  } = useRoute();

  console.log(leaveApplication);

  const updateLeaveApplication = async () => {
    try {
      const leaveDoc = doc(db, "leave_application", leaveApplication.id);
      await updateDoc(leaveDoc, { status: "Approved" });
    } catch (error) {
      console.log("update", error);
    }
  };

  const updateAttendance = async () => {
    try {
      const classroomRef = doc(db, "classroom", leaveApplication.classroom);
      const sessionRef = doc(
        classroomRef,
        "session",
        leaveApplication.sessionId
      );
      const attendanceCollectionRef = collection(sessionRef, "attendance");
      const documentRef = doc(attendanceCollectionRef, leaveApplication.uid);

      await setDoc(documentRef, {
        status: "Applied Leave",
      });
    } catch (error) {
      console.log("update", error);
    }
  };

  const approveApplication = async () => {
    try {
      setLoading(true);
      await Promise.all([updateLeaveApplication(), updateAttendance()]);
      navigation.navigate("LeaveApplication");
    } catch (error) {
      console.log("approve", error);
    } finally {
      setLoading(false);
    }
  };

  const rejectApplication = async () => {
    const leaveDoc = doc(db, "leave_application", leaveApplication.id);
    await updateDoc(leaveDoc, { status: "Rejected" });
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
            {leaveApplication.name} | {leaveApplication.matric}
          </Text>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Session Applied</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {leaveApplication.session}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Time of Application</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {leaveApplication.timestamp}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">
              Status of Application
            </Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {leaveApplication.status}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Reason for Leave</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {leaveApplication.reason}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">
              Details of Application
            </Text>
            {leaveApplication.details == "" ? (
              <Text className="text-[#212529] text-lg font-semibold">none</Text>
            ) : (
              <Text className="text-[#212529] text-lg font-semibold">
                {leaveApplication.details}
              </Text>
            )}
          </View>
          {leaveApplication.status == "Pending" ? (
            <View className="pt-[100px] space-y-2">
              <TouchableOpacity
                onPress={approveApplication}
                className="w-[270px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
              >
                <Text className="text-center text-white text-2xl font-bold">
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={rejectApplication}
                className="w-[270px] items-center self-center bg-[#ffffff] shadow shadow-black/30 rounded-xl p-3"
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
