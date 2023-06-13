import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DocumentTextIcon } from "react-native-heroicons/solid";

const ReportCard = ({ report }) => {
  const navigation = useNavigation();

  return (
    <View className="relative bg-white mt-2 flex-row">
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 border shadow shadow-black/10">
        <View>
          <Text className="text-[#826aed] font-bold text-lg">
            {report.sessionTitle}
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Date: <Text className="text-[#212529]">{report.date}</Text>
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Progress: <Text className="text-[#212529]">{report.progress}</Text>
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Comment:
          </Text>
          <Text className="text-[#212529] font-semibold text-base w-64">
            {report.comment}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReportCard;
