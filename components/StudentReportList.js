import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { DocumentTextIcon } from "react-native-heroicons/solid";

const StudentReportList = ({ student }) => {
  const navigation = useNavigation();

  return (
    <View className="relative bg-white mt-2 flex-row">
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row p-4 border shadow shadow-black/10">
        <View>
          <Text
            numberOfLines={1}
            className="text-[#212529] font-bold text-lg w-48"
          >
            {student.name}
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            {student.matric}
          </Text>
        </View>
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => {
            navigation.navigate("Report", { uid: student.uid });
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

export default StudentReportList;
