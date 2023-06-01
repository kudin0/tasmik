import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ActivityIndicator } from "react-native";

const LeaveStatusCard = ({
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
}) => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(false);

  const cancelApplication = async () => {
    setInitializing(true);
    const leaveApplication = doc(db, "leave_application", id);
    await updateDoc(leaveApplication, { status: "Canceled" });
    navigation.navigate("ApplyLeave");
  };

  const TypeStudent = () => {
    return (
      <View className="flex-row justify-between items-center">
        <View className="">
          <Text className="text-[#212529] font-bold text-lg">{session}</Text>
          <Text className="text-[#826aed] font-semibold text-base">Reason</Text>
          <Text className="text-[#212529] font-semibold text-base">
            {reason}
          </Text>
          <Text className="text-[#6c757d] font-semibold text-sm">
            {details}
          </Text>
        </View>
        <View className="space-y-2">
          <Text className="text-[#6c757d] font-semibold text-sm">
            {timestamp}
          </Text>
          <Text className="text-[#826aed] font-semibold text-sm text-right">
            {status}
          </Text>
          {status == "Applied" ? (
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
          })
        }
      >
        <View className="flex">
          <Text className="text-[#212529] font-bold text-lg">{name}</Text>
          <Text className="text-[#826aed] font-bold text-lg">{matric}</Text>
          <Text className="text-[#212529] font-bold text-lg">{session}</Text>
        </View>
        <View className="space-y-2 justify-end">
          <Text className="text-[#6c757d] font-semibold text-sm">
            {timestamp}
          </Text>
          {status === "Applied" ? (
            <Text className="text-[#826aed] font-semibold text-sm text-right">
              {status}
            </Text>
          ) : (
            <Text className="text-[#6c757d] font-semibold text-sm text-right">
              {status}
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
