import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const StudentBalanceCard = ({
  uid,
  name,
  matric,
  attendedCount,
  totalSession,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-[#ffffff] relative my-1 rounded-xl w-full p-4 shadow shadow-black/20"
      onPress={() => {
        navigation.navigate("TasmikBalance", { uid });
      }}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex">
          <Text className="text-[#826aed] font-bold text-lg">{name}</Text>
          <Text className="text-[#212529] font-bold text-base">{matric}</Text>
          <Text className="text-[#6c757d] font-bold text-base">
            Total session: {totalSession}
          </Text>
        </View>
        <View className="flex-row space-x-3">
          <View className="items-center justify-center">
            <Text className="text-[#6c757d] font-bold text-base">Attended</Text>
            <Text className="text-[#6c757d] font-bold text-lg">
              {attendedCount}
            </Text>
          </View>
          <View className="items-center justify-center">
            <Text className="text-[#826aed] font-bold text-base">Balance</Text>
            <Text className="text-[#826aed] font-bold text-lg">
              {totalSession - attendedCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StudentBalanceCard;
