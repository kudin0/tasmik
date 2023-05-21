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
        <View className="-top-[110px] h-full bg-[#F1F5F8] rounded-t-2xl items-center justify-start shadow shadow-black/10">
          <View className="flex-row items-center justify-center mt-3">
            <Text className="text-[#826aed] font-extrabold text-5xl pr-1">
              myTasmik
            </Text>
            <Image
              source={require("../assets/whale1.png")}
              className="w-16 h-12"
            />
          </View>

          <Text className="mt-2 text-2xl font-bold text-[#212529]">
            Welcome to myTasmik App
          </Text>
          <Text className="mt-[60px] text-2xl font-semibold text-center text-[#6c757d] max-w-[300px]">
            Mobile App for IPT Student's Quran Memorization
          </Text>
          <TouchableOpacity
            className="w-[270px] mt-[60px] rounded-xl p-3 bg-[#826aed] shadow shadow-black/30"
            onPress={() => navigation.navigate("LogIn")}
          >
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
