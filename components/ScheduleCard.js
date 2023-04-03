import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";

const ScheduleCard = ({
  id,
  title,
  date,
  time,
  place,
  details,
  attendance,
  aspect1,
  aspect2,
  aspect3,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative bg-white flex-row"
      onPress={() => {
        navigation.navigate("TasmikDetail", {
          id,
          title,
          date,
          time,
          place,
          details,
          attendance,
          aspect1,
          aspect2,
          aspect3,
        });
      }}
    >
      <View className="bg-white w-full justify-center py-3 rounded-b-lg border-[#3A5311] h-[70px]">
        <View className="mx-4">
          <Text className="text-lg font-semibold text-[#728C69]">
            Module 3 - Week 3
          </Text>
          <Text className="text-base font-semibold text-[#74B49B]">
            Date: ##/##/####
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
