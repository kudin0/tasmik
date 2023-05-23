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
  ActivityIndicator,
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
import moment from "moment/moment";

const AnnounceWriteScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
      } else {
        console.log("User does not exists");
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const alertFormIncomplete = () => {
    Alert.alert("Form Incomplete", "Please fill out all fields.", [
      { text: "OK", onPress: null },
    ]);
  };

  const handleForm = async () => {
    if (!title || !details) {
      alertFormIncomplete();
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "announcement"), {
        date: moment().utcOffset("+8:00").format("DD/MM/YYYY"),
        by: user.name,
        title: title,
        details: details,
      });
      navigation.navigate("Announcement");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

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
            Add Announcement
          </Text>
        </View>

        <View className="bg-[#F1F5F8] h-full pt-[10px] px-5 space-y-1">
          {/* Content */}
          <ScrollView className="">
            {/* Form */}
            <View className="my-1">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Title
                </Text>
              </View>
              <TextInput
                textAlignVertical="top"
                className="mb-3 pl-2 h-12 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
                onChangeText={(title) => setTitle(title)}
                value={title}
                placeholder="Title of announcement"
                placeholderTextColor="#adb5bd"
              />
            </View>
            <View className="my-1">
              <View className="flex-row items-center mb-2">
                <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
                  Details
                </Text>
              </View>
              <TextInput
                multiline
                className="mb-3 pl-2 h-48 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
                onChangeText={(details) => setDetails(details)}
                value={details}
              />
            </View>

            <TouchableOpacity
              onPress={() => handleForm()}
              className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
            >
              <Text className="text-center text-white text-2xl font-bold">
                Post Announcement
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AnnounceWriteScreen;
