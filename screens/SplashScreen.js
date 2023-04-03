import React, { useLayoutEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SafeViewAndroid from "../components/SafeViewAndroid";

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={SafeViewAndroid.AndroidSafeArea}
      className="bg-[#BECBD3]"
    >
      {/* Backgorund */}
      <View>
        <Image
          source={require("../assets/bg.png")}
          className="w-full bg-gray-300 h-[500px]"
        />
        <View className="-top-[110px] h-full bg-white rounded-t-xl items-center justify-start">
          <Text className="text-[#3A5311] font-extrabold text-5xl top-[25px]">
            myTasmik
          </Text>
          <Text className="pt-[35px] text-2xl font-bold text-[#728C69]">
            Welcome to myTasmik App
          </Text>
          <Text className="pt-[60px] pb-[100px] text-2xl font-semibold text-center text-[#74B49B] max-w-[300px]">
            Mobile App for IPT Student's Quran Memorization
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")} className="w-[270px] rounded-lg p-3 bg-[#3A5311]">
            <Text className="text-center text-white text-2xl font-bold">
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu */}
    </SafeAreaView>
  );
};

export default SplashScreen;
