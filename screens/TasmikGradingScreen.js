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
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment/moment";

const TasmikGradingScreen = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState("");

  const {
    params: { classroom, sessionTitle, sessionId, date, id, name, matric },
  } = useRoute();

  const alertFormIncomplete = () => {
    Alert.alert("Report Incomplete", "Please fill out report fields.", [
      { text: "OK", onPress: null },
    ]);
  };

  const handleReportButton = async () => {
    if (!comment) {
      alertFormIncomplete();
      return;
    }
    try {
      const reportDocRef = doc(
        db,
        "classroom",
        classroom,
        "session",
        sessionId,
        "report",
        id
      );
      await setDoc(reportDocRef, {
        comment: comment,
        uid: id,
        session: sessionId,
        sessionTitle: sessionTitle,
        date: date,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigation.goBack();
    }
  };

  const handleForm = async () => {
    if (!comment) {
      alertFormIncomplete();
      return;
    }
    try {
      const reportDocRef = doc(
        db,
        "classroom",
        classroom,
        "session",
        sessionId,
        "report",
        id
      );
      await setDoc(reportDocRef, {
        comment: comment,
        uid: id,
        session: sessionId,
        sessionTitle: sessionTitle,
        date: date,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigation.goBack();
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
            Write Report
          </Text>
        </View>

        <View className="bg-[#F1F5F8] h-full pt-[10px] px-5 space-y-1">
          {/* Content */}
          <ScrollView className="">
            <View className="space-y-2">
              <Text className=" text-xl font-bold text-[#826aed]">
                {sessionTitle}
              </Text>
              <Text className=" text-xl font-bold text-[#212529]">
                {name} | {matric}
              </Text>
            </View>

            {/* Form */}
            <View className="mt-5">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Report
                </Text>
              </View>
              <TextInput
                multiline
                textAlignVertical="top"
                numberOfLines={3}
                className="mb-3 pl-2 h-24 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
                onChangeText={(comment) => setComment(comment)}
                value={comment}
                placeholder="Write your report here..."
                placeholderTextColor="#adb5bd"
              />
            </View>

            <TouchableOpacity
              onPress={handleForm}
              className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
            >
              <Text className="text-center text-white text-2xl font-bold">
                Add Report
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TasmikGradingScreen;
