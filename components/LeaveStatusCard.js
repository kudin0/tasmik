import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const LeaveStatusCard = ({
  id,
  session,
  timestamp,
  reason,
  details,
  status,
}) => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(false);
  const updateStatus = async () => {
    setInitializing(true);
    const leaveApplication = doc(db, "leave_application", id);
    await updateDoc(leaveApplication, { status: "Canceled" });
    navigation.navigate("ApplyLeave");
  };

  if (initializing)
    return (
      <View className="items-center justify-center w-fit h-fit bg-white">
        <Image source={require("../assets/load.gif")} />
      </View>
    );

  return (
    <View className="relative my-2 flex-row">
      <View className="bg-[#ffffff] flex-row justify-between items-center rounded-lg w-full p-4 shadow shadow-black/20">
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
            <TouchableOpacity onPress={updateStatus}>
              <View className="border rounded-xl p-2 px-6 justify-center self-end">
                <Text className="text-center">Cancel</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default LeaveStatusCard;
