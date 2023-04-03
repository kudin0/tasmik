import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  CalendarIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import TasmikSessionCard from "../components/TasmikSessionCard";

const TasmikScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="bg-white h-full"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex-row relative h-12 bg-white drop-shadow-2xl items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#3A5311" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold">Tasmik Session</Text>
      </View>

      {/* Tasmik Info */}
      <View className="flex-row justify-between mx-5 pt-3">
        <View className="space-y-1">
          <Text className="text-[#728C69] font-bold text-base">
            Dr. Karim Abd Razak
          </Text>
          <Text className="text-[#74B49B] text-base">Lecturer</Text>
        </View>
        <View className="items-end space-y-1">
          <Text className="text-[#728C69] font-bold text-base">
            Sem 1 2022/2023
          </Text>
          <Text className="text-[#74B49B] text-base">Term</Text>
        </View>
      </View>

      {/* Top */}
      <View className="pt-3 space-y-3">
        <View className="flex-row items-center justify-evenly">
          <TouchableOpacity className="pb-2 border-b-2 border-[#3A5311]">
            <Text className="text-base text-[#3A5311] font-bold">
              Next Tasmik
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="pb-2">
            <Text className="text-base text-[#728C69] font-bold">
              Past Tasmik
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mx-6 items-center justify-between space-x-3">
          <Text className="text-base text-[#728C69] font-semibold">
            Timeline
          </Text>
          <TouchableOpacity className="border border-[#728C69] px-2 py-1 rounded-full flex-row items-center space-x-1">
            <CalendarIcon size={20} color="#728C69" />
            <Text className="text-base text-[#728C69] font-semibold">
              Tasmik Balance
            </Text>
          </TouchableOpacity>
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
        <TasmikSessionCard
          id={"0001"}
          title={"Module 3 - Week 3"}
          date={"##/##/####"}
          time={"##:##"}
          place={"BK2"}
          details={`- Surah Al-Mulk \n- Surah Al-Kahfi`}
        />
        <TasmikSessionCard
          id={"0001"}
          title={"Module 4 - Week 4"}
          date={"##/##/####"}
          time={"##:##"}
          place={"BK2"}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute inset-x-0 bottom-0 h-20 bg-white drop-shadow-lg border-t border-gray-300">
        <View className="flex-row justify-between mx-16">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="h-full justify-center items-center">
              <UserIcon size={30} color="#728C69" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Home")}
          >
            <View className="h-full justify-center items-center">
              <HomeIcon size={30} color="#728C69" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Tasmik")}
          >
            <View className="h-full justify-center items-center">
              <CalendarDaysIcon size={30} color="#3A5311" fill="#728C69" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TasmikScreen;
