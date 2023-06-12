import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TermReportCard = ({ uid, term }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative bg-white mt-2 flex-row"
      onPress={() => {
        navigation.navigate("ReportTerm", { uid: uid, term: term });
      }}
    >
      <View className="bg-[#ffffff] justify-between items-center rounded-lg w-full flex-row px-4 py-2 border shadow shadow-black/10">
        <View>
          <Text className="text-[#826aed] font-bold text-lg">{term.term}</Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Attendance:{" "}
            <Text className="text-[#212529]">{term.attendance}</Text>
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Status: <Text className="text-[#212529]">{term.status}</Text>
          </Text>
          <Text className="text-[#6c757d] font-semibold text-base">
            Lecturer: <Text className="text-[#212529]">{term.lecturer}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TermReportCard;
