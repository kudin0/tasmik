import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, ArrowPathIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid";
import ReportCard from "../components/ReportCard";

const ReportScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="bg-white h-full"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex-row relative h-12 bg-white items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#3A5311" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold">Tasmik Report</Text>
      </View>

      {/* Top */}
      <View className="pt-3 space-y-3">
        <View className="flex-row items-center justify-evenly">
          <TouchableOpacity className="pb-2 border-b-2 border-[#3A5311]">
            <Text className="text-base text-[#3A5311] font-bold">
              Session Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="pb-2">
            <Text className="text-base text-[#728C69] font-bold">
              Term Report
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mx-6 items-center justify-between space-x-3">
          <Text className="text-base text-[#728C69] font-semibold">
            Timeline
          </Text>
          <TouchableOpacity className="border border-[#728C69] px-2 py-1 rounded-full flex-row items-center space-x-1">
            <ArrowPathIcon size={20} color="#728C69" />
            <Text className="text-base text-[#728C69] font-semibold">
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* content */}
      <ScrollView className="mx-5 space-y-2 mt-2">
        <ReportCard
          id={"0001"}
          title={"Module 1 - Week 1"}
          date={"##/##/####"}
          marks1={10}
          marks2={8}
          marks3={8}
          aspect1={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu.`}
          aspect2={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
          aspect3={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
        />
        <ReportCard
          id={"0001"}
          title={"Module 2 - Week 2"}
          date={"##/##/####"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;
