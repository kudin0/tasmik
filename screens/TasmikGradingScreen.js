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
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  const [marks1, setMarks1] = useState("");
  const [marks2, setMarks2] = useState("");
  const [marks3, setMarks3] = useState("");
  const [totalMark, setTotalMark] = useState(0);

  const {
    params: { classroom, sessionId, sessionTitle, date, studentId },
  } = useRoute();

  useEffect(() => {
    const getTotalMark = () => {
      const total =
        (parseInt(marks1) || 0) +
        (parseInt(marks2) || 0) +
        (parseInt(marks3) || 0);
      setTotalMark(total);
    };

    getTotalMark();
  }, [marks1, marks2, marks3]);

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
          comment1: comment1,
          comment2: comment3,
          marks1: marks1,
          marks2: marks2,
          marks3: marks3,
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
            <Text className=" text-xl font-bold text-[#212529]">
              Total Mark: {totalMark} / 30
            </Text>

            {/* Form */}
            <View className="my-1">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Aspect #1
                </Text>
                <View className="flex-row items-center ml-auto">
                  <Text className="mx-2 text-left text-lg font-semibold text-[#212529]">
                    Marks:
                  </Text>
                  <TextInput
                    textAlign="center"
                    maxLength={4}
                    className="h-10 w-10 bg-white rounded-lg text-xl text-[#212529] shadow-sm"
                    onChangeText={(mark) => setMarks1(mark)}
                    value={marks1}
                    keyboardType="numeric"
                  />
                  <Text className="mx-2 text-left text-lg font-semibold text-[#212529]">
                    / 10
                  </Text>
                </View>
              </View>
              <TextInput
                multiline
                textAlignVertical="top"
                numberOfLines={3}
                className="mb-3 pl-2 h-24 bg-white rounded-xl text-lg text-[#212529] shadow-sm"
                onChangeText={(comment) => setComment1(comment)}
                value={comment1}
                placeholder="Comment for Aspect #1"
                placeholderTextColor="#adb5bd"
              />
            </View>

            <View className="my-1">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Aspect #2
                </Text>
                <View className="flex-row items-center ml-auto">
                  <Text className="mx-2 text-left text-lg font-semibold text-[#212529]">
                    Marks:
                  </Text>
                  <TextInput
                    textAlign="center"
                    maxLength={4}
                    className="h-10 w-10 bg-white rounded-lg text-xl text-[#212529] shadow-sm"
                    onChangeText={(mark) => setMarks2(mark)}
                    value={marks2}
                    keyboardType="numeric"
                  />
                  <Text className="mx-2 text-left text-lg font-semibold text-[#212529]">
                    / 10
                  </Text>
                </View>
              </View>
              <TextInput
                multiline
                textAlignVertical="top"
                numberOfLines={3}
                className="mb-3 pl-2 h-24 bg-white rounded-xl text-lg text-[#212529] shadow-sm"
                onChangeText={(comment) => setComment2(comment)}
                value={comment2}
                placeholder="Comment for Aspect #2"
                placeholderTextColor="#adb5bd"
              />
            </View>
            <View className="my-1">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Aspect #3
                </Text>
                <View className="flex-row items-center ml-auto">
                  <Text className="mx-2 text-left text-lg font-semibold text-[#212529]">
                    Marks:
                  </Text>
                  <TextInput
                    textAlign="center"
                    maxLength={4}
                    className="h-10 w-10 bg-white rounded-lg  text-xl text-[#212529] shadow-sm"
                    onChangeText={(mark) => setMarks3(mark)}
                    value={marks3}
                    keyboardType="numeric"
                  />
                  <Text className="mx-2 text-left text-lg font-semibold text-[#212529]">
                    / 10
                  </Text>
                </View>
              </View>
              <TextInput
                multiline
                textAlignVertical="top"
                numberOfLines={3}
                className="mb-3 pl-2 h-24 bg-white rounded-xl text-lg text-[#212529] shadow-sm"
                onChangeText={(comment) => setComment3(comment)}
                value={comment3}
                placeholder="Comment for Aspect #3"
                placeholderTextColor="#adb5bd"
              />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
            >
              <Text className="text-center text-white text-2xl font-bold">
                Apply Leave
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TasmikGradingScreen;
