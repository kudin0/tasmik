import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ActivityIndicator } from "react-native";

const LeaveStatusCard = ({ leaveApplication, type }) => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(false);

  const cancelApplication = async () => {
    setInitializing(true);
    const leaveApplication = doc(db, "leave_application", leaveApplication.id);
    await updateDoc(leaveApplication, { status: "Canceled" });
    navigation.navigate("ApplyLeave");
  };

  const TypeStudent = () => {
    return (
      <View className="flex-row justify-between items-center">
        <View className="">
          <Text className="text-[#212529] font-bold text-lg">
            {leaveApplication.session}
          </Text>
          <Text className="text-[#826aed] font-semibold text-base">Reason</Text>
          <Text className="text-[#212529] font-semibold text-base">
            {leaveApplication.reason}
          </Text>
          <Text className="text-[#6c757d] font-semibold text-sm">
            {leaveApplication.details}
          </Text>
        </View>
        <View className="space-y-2">
          <Text className="text-[#6c757d] font-semibold text-sm">
            {leaveApplication.timestamp}
          </Text>
          <Text className="text-[#826aed] font-semibold text-sm text-right">
            {leaveApplication.status}
          </Text>
          {leaveApplication.status == "Pending" ? (
            <TouchableOpacity onPress={cancelApplication}>
              <View className="border rounded-xl p-2 px-6 justify-center self-end">
                <Text className="text-center">Cancel</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const TypeLecturer = () => {
    return (
      <TouchableOpacity
        className="flex-row justify-between"
        onPress={() =>
          navigation.navigate("ApplyLeaveDetails", {
            leaveApplication,
          })
        }
      >
        <View className="flex">
          <Text className="text-[#212529] font-bold text-lg">
            {leaveApplication.name}
          </Text>
          <Text className="text-[#826aed] font-bold text-lg">
            {leaveApplication.matric}
          </Text>
          <Text className="text-[#212529] font-bold text-lg">
            {leaveApplication.session}
          </Text>
        </View>
        <View className="space-y-2 justify-end">
          <Text className="text-[#6c757d] font-semibold text-sm">
            {leaveApplication.timestamp}
          </Text>
          {leaveApplication.status === "Pending" ? (
            <Text className="text-[#826aed] font-semibold text-sm text-right">
              {leaveApplication.status}
            </Text>
          ) : (
            <Text className="text-[#6c757d] font-semibold text-sm text-right">
              {leaveApplication.status}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (initializing)
    return (
      <View className="items-center justify-center w-fit h-fit bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

  return (
    <View className="bg-[#ffffff] relative my-2 rounded-xl w-full p-4 shadow shadow-black/20">
      <View>
        {type === "student" ? <TypeStudent /> : null}
        {type === "lecturer" ? <TypeLecturer /> : null}
      </View>
    </View>
  );
};

export default LeaveStatusCard;
