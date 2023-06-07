import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ScheduleCard = ({ tasmik }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative bg-white flex-row"
      onPress={() => {
        navigation.navigate("TasmikDetail", {
          tasmik,
        });
      }}
    >
      <View className="bg-white w-full justify-center h-[70px]">
        <View className="mx-4">
          <Text className="text-lg font-semibold text-[#212529]">
            {tasmik.title}
          </Text>
          <Text className="text-base text-[#6c757d]">Date: {tasmik.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
