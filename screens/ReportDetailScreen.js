import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";

const ReportDetailScreen = () => {
  const navigation = useNavigation();

  const {
    params: { report },
  } = useRoute();

  return (
    <SafeAreaView
      className="pt-7 bg-[#826aed] h-full"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl text-[#ffffff] font-extrabold">Report</Text>
      </View>

      <View className="bg-[#F1F5F8] h-full px-5">
        {/* Top */}
        <View className="py-2 space-y-3 mb-3">
          <Text className=" text-2xl font-bold text-[#826aed]">
            {report.sessionTitle}
          </Text>
          <Text className=" text-lg font-bold text-[#6c757d]">
            Date: {report.date}
          </Text>
          <Text className=" text-lg font-bold text-[#6c757d]">Comment:</Text>
          <Text className=" text-lg font-bold text-[#6c757d]">
            {report.comment}
          </Text>
        </View>

        <View></View>
      </View>

      {/* Content */}
      <View className="bg-white divide-y space-y-2"></View>
    </SafeAreaView>
  );
};

export default ReportDetailScreen;
