import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";

const TasmikSessionCard = ({ tasmik, classroom }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative mt-2 flex-row"
      onPress={() => {
        navigation.navigate("TasmikDetail", {
          tasmik,
          classroom,
        });
      }}
    >
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 shadow shadow-black/30">
        <View>
          <Text className="text-[#212529] font-bold text-lg">
            {tasmik.title}
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Date: {tasmik.date} at {tasmik.time}
          </Text>
        </View>
        <AdjustmentsHorizontalIcon size={25} color="#826aed" />
      </View>
    </TouchableOpacity>
  );
};

export default TasmikSessionCard;
