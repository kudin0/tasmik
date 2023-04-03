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
import { setTasmik } from "../features/tasmikSlice";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";

const TasmikDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: { id, title, date, time, place, details, attendance },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setTasmik({
        id,
        title,
        date,
        time,
        place,
        details,
        attendance,
      })
    );
  }, []);

  return (
    <>
      <SafeAreaView
        className="bg-white h-full"
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

        <ScrollView className="mx-5 pt-3 space-y-3">
          <Text className=" text-xl font-bold text-[#3A5311]">{title}</Text>
          <View className="space-y-1">
            <Text className="text-[#74B49B] text-lg">
              Date & Time
            </Text>
            <Text className="text-[#728C69] text-lg font-semibold">
              {date} at {time}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#74B49B] text-lg">
              Place
            </Text>
            <Text className="text-[#728C69] text-lg font-semibold">
              {place}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#74B49B] text-lg">
              Surah/ Juzu'
            </Text>
            <Text className="text-[#728C69] text-lg font-semibold">
              {details}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TasmikDetailScreen;
