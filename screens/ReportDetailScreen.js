import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setReport } from "../features/reportSlice";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";

const ReportDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      title,
      date,
      marks1,
      marks2,
      marks3,
      aspect1,
      aspect2,
      aspect3,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setReport({
        id,
        title,
        date,
        marks1,
        marks2,
        marks3,
        aspect1,
        aspect2,
        aspect3,
      })
    );
  }, []);

  const totalMarks =
    marks1 && marks2 && marks3 ? marks1 + marks2 + marks3 : null;

  return (
    <SafeAreaView
      className="bg-[#F6F5F5] h-full"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex-row relative bg-white drop-shadow-2xl items-center justify-center border-b border-gray-300 py-4">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#3A5311" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold">Tasmik Details</Text>
      </View>

      {/* Top */}
      <View className="mx-5 py-2 space-y-3 mb-3">
        <Text className=" text-2xl font-bold text-[#3A5311]">{title}</Text>
        <View className="space-y-1 mt-3">
          <Text className="text-[#74B49B] text-lg font-bold">Total Marks</Text>
          <Text className="text-[#728C69] text-lg font-semibold">
            {totalMarks} / 30
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="bg-white divide-y space-y-2">
        <View className="mx-5 space-y-2 py-2">
          <View className="flex-row justify-between">
            <Text className="text-[#74B49B] text-base font-semibold">
              Aspect #1
            </Text>
            <Text className="text-[#74B49B] text-base font-semibold">
              Marks:
              <Text className="text-[#728C69]"> {marks1} / 10</Text>
            </Text>
          </View>
          <Text className="text-justify text-[#728C69] text-base font-semibold">{aspect1}</Text>
        </View>
        <View className="mx-5 space-y-2 py-2">
          <View className="flex-row justify-between">
            <Text className="text-[#74B49B] text-base font-semibold">
              Aspect #2
            </Text>
            <Text className="text-[#74B49B] text-base font-semibold">
              Marks:
              <Text className="text-[#728C69]"> {marks2} / 10</Text>
            </Text>
          </View>
          <Text className="text-justify text-[#728C69] text-base font-semibold">{aspect2}</Text>
        </View>
        <View className="mx-5 space-y-2 py-2">
          <View className="flex-row justify-between">
            <Text className="text-[#74B49B] text-base font-semibold">
              Aspect #3
            </Text>
            <Text className="text-[#74B49B] text-base font-semibold">
              Marks:
              <Text className="text-[#728C69]"> {marks3} / 10</Text>
            </Text>
          </View>
          <Text className="text-justify text-[#728C69] text-base font-semibold">{aspect3}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportDetailScreen;
