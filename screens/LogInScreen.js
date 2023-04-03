import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";

const LogInScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          className="pt-[60px] bg-white"
          style={SafeViewAndroid.AndroidSafeArea}
        >
          {/* header */}
          <View className="flex-row relative h-12 bg-white drop-shadow-2xl items-center justify-center border-b border-gray-300">
            <TouchableOpacity
              onPress={navigation.goBack}
              className="absolute left-5 p-2 rounded-full"
            >
              <ArrowLeftIcon size={20} color="#3A5311" />
            </TouchableOpacity>
            <Text className="text-xl font-extrabold">Login Page</Text>
          </View>

          <View className="bg-[#BECBD3] h-full">
            <View className="items-center pb-3 my-4 space-x-2 pt-12">
              <Image
                source={require("../assets/logo.png")}
                className="w-24 h-24 pt-[50px]"
              />
              <Text className="font-extrabold text-5xl text-[#3A5311] py-5">
                myTasmik
              </Text>
            </View>
            <View className="pt-[10px] px-5">
              <Text className="mx-2 text-left text-lg font-semibold text-[#74B49B]">
                User Id
              </Text>
              <TextInput
                className="mb-5 pl-2 h-12 bg-white rounded-lg text-lg text-[#728C69]"
                maxLength={20}
                placeholder="User Id"
                placeholderTextColor="#728C69"
              />

              <Text className="mx-2 text-left text-lg font-semibold text-[#74B49B]">
                Password
              </Text>
              <TextInput
                className="mb-5 pl-2 h-12 bg-white rounded-lg text-lg text-[#728C69]"
                maxLength={20}
                placeholder="Password"
                placeholderTextColor="#728C69"
                secureTextEntry={true}
              />

              <TouchableOpacity className="items-end">
                <Text className="text-[#728C69] font-semibold text-md">
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-[100px] items-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                className="w-[270px] rounded-lg p-3 bg-[#3A5311]"
              >
                <Text className="text-center text-white text-2xl font-bold">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;
