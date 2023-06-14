import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CheckCircleIcon, XCircleIcon } from "react-native-heroicons/outline";

const TasmikBalanceCard = ({ session }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#ffffff] relative my-1 rounded-xl w-full p-4 shadow shadow-black/30">
      <View className="flex-row justify-between">
        <View className="flex">
          <Text className="text-[#826aed] font-bold text-lg">
            {session.title}
          </Text>
          <Text className="text-[#6c757d] font-bold text-lg">
            {session.date}
          </Text>
        </View>
        <View className="items-end justify-center">
          {session.status === "Attended" ? (
            <View>
              <CheckCircleIcon size={35} color="#588157" />
            </View>
          ) : (
            <View>
              <XCircleIcon size={35} color="#d62828" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TasmikBalanceCard;
