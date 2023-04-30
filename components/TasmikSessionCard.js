import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";

const TasmikSessionCard = ({
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
      className="relative mt-2 flex-row"
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
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 shadow shadow-black/20">
        <View>
          <Text className="text-[#212529] font-bold text-lg">{title}</Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Date: {date}
          </Text>
        </View>
        <AdjustmentsHorizontalIcon size={25} color="#826aed" />
      </View>
    </TouchableOpacity>
  );
};

export default TasmikSessionCard;
