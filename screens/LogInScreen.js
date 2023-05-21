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
  Alert,
  DevSettings,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alertNoAcc();
    }
  };

  const alertNoAcc = () => {
    Alert.alert(
      "Login Failed",
      "Your email or password is incorrect. Please try again",
      [{ text: "OK", onPress: null }]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="pt-[60px] bg-[#826aed]"
        style={SafeViewAndroid.AndroidSafeArea}
      >
        {/* header */}
        <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-xl text-[#ffffff] font-extrabold">
            Login Page
          </Text>
        </View>

        <View className="bg-[#F1F5F8] h-full">
          <View className="items-center mb-3 mt-12">
            <View className="rounded-full bg-[#826aed] p-4">
              <Image
                source={require("../assets/whale2.png")}
                className="w-28 h-28"
              />
            </View>
            <Text className="font-extrabold text-5xl text-[#826aed] py-5">
              myTasmik
            </Text>
          </View>
          <View className="pt-[10px] px-5">
            <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
              Email
            </Text>
            <TextInput
              className="mb-5 pl-2 h-12 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
              placeholder="Email"
              placeholderTextColor="#adb5bd"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              value={email}
              clearButtonMode="always"
            />

            <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
              Password
            </Text>
            <TextInput
              className="mb-5 pl-2 h-12 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
              maxLength={20}
              placeholder="Password"
              placeholderTextColor="#adb5bd"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              value={password}
              clearButtonMode="always"
            />

            <TouchableOpacity className="items-end">
              <Text className="text-[#826aed] font-semibold text-md">
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => loginUser(email, password)}
            className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
          >
            <Text className="text-center text-white text-2xl font-bold">
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LogInScreen;
