import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const LeaveApplicationStudentCard = ({ student }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#ffffff] relative my-2 rounded-xl w-full p-4 shadow shadow-black/20">
      <TouchableOpacity
        className="flex-row justify-between"
        onPress={() => {
          navigation.navigate("LeaveApplicationStudent", { student });
        }}
      >
        <View className="flex">
          <Text className="text-[#212529] font-bold text-lg">
            {student.name}
          </Text>
          <Text className="text-[#826aed] font-bold text-lg">
            {student.matric}
          </Text>
        </View>
        <View className="items-end justify-center">
          <Text className="text-[#6c757d] font-bold text-lg">
            Pending Application:{" "}
            <Text className="text-[#826aed] font-bold text-lg">
              {student.pendingLeaveCount}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LeaveApplicationStudentCard;
