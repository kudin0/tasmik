import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  PresentationChartLineIcon,
  UserIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import ScheduleCard from "../components/ScheduleCard";

const HomeScreen = () => {
  const navigation = useNavigation();

  const alertLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: null,
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("LogIn"), },
    ]);
  };

  return (
    <SafeAreaView
      className="bg-[#BECBD3] pt-5 h-full flex"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex pt-7 mx-5">
        <View className="flex-row">
          <Text className="text-4xl font-extrabold text-[#3A5311]">
            myTasmik
          </Text>
          <Image source={require("../assets/logo.png")} className="w-7 h-7" />
          <TouchableOpacity className="ml-auto" onPress={alertLogOut}>
            <ArrowLeftOnRectangleIcon size={32} color="#3A5311" />
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-bold text-[#728C69]">
          Welcome, <Text className="text-[#3A5311]">Izzudin Zamri</Text>
        </Text>
      </View>

      {/* Schedule */}
      <View className="flex pt-9 mx-5">
        <TouchableOpacity
          className="py-5 w-full bg-[#3A5311] rounded-t-lg"
          onPress={() => navigation.navigate("Tasmik")}
        >
          <View className="mx-6 flex-row items-center">
            <CalendarDaysIcon size={24} color="white" />
            <Text className="text-white font-semibold text-lg ml-3">
              Your Next Tasmik
            </Text>
          </View>
        </TouchableOpacity>
        <View className="rounded-b-lg min-h-[210px] bg-white border-b border-x py-2">
          <ScheduleCard
            id={"0001"}
            title={"Module 3 - Week 3"}
            date={"##/##/####"}
            time={"##:##"}
            place={"BK2"}
            details={`- Surah Al-Mulk \n- Surah Al-Kahfi`}
          />
          <View className="border-b" />
          <ScheduleCard
            id={"0001"}
            title={"Module 3 - Week 3"}
            date={"##/##/####"}
            time={"##:##"}
            place={"BK2"}
            details={`- Surah Al-Mulk \n- Surah Al-Kahfi`}
          />
          <View className="border-b" />
          <ScheduleCard
            id={"0001"}
            title={"Module 3 - Week 3"}
            date={"##/##/####"}
            time={"##:##"}
            place={"BK2"}
            details={`- Surah Al-Mulk \n- Surah Al-Kahfi`}
          />
        </View>
      </View>

      {/* Button */}
      <View className="flex-row pt-12 mx-6 justify-between">
        <TouchableOpacity
          className="h-24 w-24 bg-[#3A5311] justify-center items-center rounded-lg drop-shadow-lg"
          onPress={() => navigation.navigate("Tasmik")}
        >
          <CalendarDaysIcon size={55} color="white" />
          <Text className="text-white font-semibold text-sm">Tasmik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="h-24 w-24 bg-[#3A5311] justify-center items-center rounded-lg drop-shadow-lg"
          onPress={() => navigation.navigate("Announcement")}
        >
          <MegaphoneIcon size={55} color="white" />
          <Text className="text-white font-semibold text-sm">Announcement</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-24 w-24 bg-[#3A5311] justify-center items-center rounded-lg drop-shadow-lg">
          <PresentationChartLineIcon size={55} color="white" />
          <Text className="text-white font-semibold text-sm">Report</Text>
        </TouchableOpacity>
      </View>

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
              <HomeIcon size={30} color="#3A5311" fill="#728C69" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Tasmik")}
          >
            <View className="h-full justify-center items-center">
              <CalendarDaysIcon size={30} color="#728C69" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
