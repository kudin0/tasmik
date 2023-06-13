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
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleForgotPassword = (email) => {
    if (email === "") {
      alertNoEmail();
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alertSend();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const alertNoEmail = () => {
    Alert.alert("Request Failed", "Please input your email address.", [
      { text: "OK", onPress: null },
    ]);
  };

  const alertSend = () => {
    Alert.alert(
      "Password Reset Sent",
      "Password reset email sent successfully. Please check your email.",
      [{ text: "OK", onPress: navigation.goBack }]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="bg-[#826aed]"
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
            Forgot Password
          </Text>
        </View>

        <View className="bg-[#F1F5F8] h-full">
          <View className="items-center mb-3 my-12 py-8">
            <Image
              source={require("../assets/logo1.png")}
              style={{
                width: undefined,
                height: 105,
                aspectRatio: 3,
                resizeMode: "contain",
              }}
            />
          </View>
          <View className="pt-[10px] px-5">
            <Text className="mx-2 text-left text-lg font-semibold text-[#212529] pb-4">
              Forgot your password?
            </Text>
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
          </View>
          <TouchableOpacity
            onPress={() => handleForgotPassword(email)}
            className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
          >
            <Text className="text-center text-white text-2xl font-bold">
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
