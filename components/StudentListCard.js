import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const StudentsListCard = ({ id, name, matric, session }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);

  return (
    <TouchableOpacity className="relative mt-2 flex-row" onPress={() => {}}>
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 border shadow shadow-black/10">
        <View>
          <Text className="text-[#212529] font-bold text-lg">{name}</Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            {matric}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-[#212529] font-bold text-lg">Status</Text>
          <Text className="text-[#6c757d] font-semibold text-base">none</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StudentsListCard;
