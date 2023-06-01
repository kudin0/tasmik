import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment/moment";

const TasmikGradingScreen = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState("");

  const {
    params: { classroom, sessionId, sessionTitle, date, studentId },
  } = useRoute();

  const alertFormIncomplete = () => {
    Alert.alert("Application Incomplete", "Please fill out all fields.", [
      { text: "OK", onPress: null },
    ]);
  };

  const handleForm = async () => {
    if (!leaveReason || !selectedSession) {
      alertFormIncomplete();
      return;
    }
    try {
      await addDoc(
        collection(
          db,
          "users",
          studentId,
          "reports",
          classroom,
          "session",
          sessionId
        ),
        {
          title: sessionTitle,
          status: "Attend",
          date: date,
          comment1: comment,
        }
      );
      navigation.navigate("GradingScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="pt-7 bg-[#826aed] h-full"
        style={SafeViewAndroid.AndroidSafeArea}
      >
        {/* Header */}
        <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-xl text-[#ffffff] font-extrabold">
            Grading Page
          </Text>
        </View>

        <View className="bg-[#F1F5F8] h-full pt-[10px] px-5 space-y-1">
          {/* Content */}
          <ScrollView className="">
            <Text className=" text-xl font-bold text-[#826aed]">
              {sessionTitle}
            </Text>

            {/* Form */}
            <View className="my-1">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Aspect #1
                </Text>
              </View>
              <TextInput
                multiline
                textAlignVertical="top"
                numberOfLines={3}
                className="mb-3 pl-2 h-24 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
                onChangeText={(comment) => setComment(comment)}
                value={comment}
                placeholder="Comment for Aspect #1"
                placeholderTextColor="#adb5bd"
              />
            </View>

            <TouchableOpacity
              onPress={() => {}}
              className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
            >
              <Text className="text-center text-white text-2xl font-bold">
                Mark Attendance
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TasmikGradingScreen;
