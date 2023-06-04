import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { DocumentTextIcon } from "react-native-heroicons/solid";

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
    <View className="relative bg-white mt-2 flex-row">
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 border shadow shadow-black/10">
        <View>
          <Text className="text-[#212529] font-bold text-lg">{title}</Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Date: {date}
          </Text>
        </View>
        <TouchableOpacity
          className="justify-center items-center"
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
          <DocumentTextIcon size={25} color="#826aed" />
          <Text className="text-[#6c757d] font-semibold text-base">
            View Report
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportCard;
