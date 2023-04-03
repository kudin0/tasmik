import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";

const ReportCard = ({
  id,
  title,
  date,
  marks1,
  marks2,
  marks3,
  aspect1,
  aspect2,
  aspect3,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative bg-white mt-2 flex-row"
      onPress={() => {
        navigation.navigate("ReportDetail", {
          id,
          title,
          date,
          marks1,
          marks2,
          marks3,
          aspect1,
          aspect2,
          aspect3,
        });
      }}
    >
      <View className="bg-[#BECBD3] justify-between items-center rounded-lg w-full flex-row p-4">
        <View>
          <Text className="text-[#3A5311] font-bold text-lg">{title}</Text>
          <Text className="text-[#728C69] font-semibold text-base">
            Date: {date}
          </Text>
        </View>
        <AdjustmentsHorizontalIcon size={25} color="#3A5311" />
      </View>
    </TouchableOpacity>
  );
};

export default ReportCard;
