import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserCircleIcon, HomeIcon } from "react-native-heroicons/outline";
import { ArrowLeftIcon, CalendarDaysIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);

  const userInfoRef = doc(db, "users", auth.currentUser.uid);

  const getUser = () => {
    getDoc(userInfoRef).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
        if (initializing) {
          setInitializing(false);
        }
      } else {
        console.log("User does not exists");
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <Image source={require("../assets/load.gif")} />
      </View>
    );

  return (
    <SafeAreaView
      className="pt-7 bg-[#826aed] h-full"
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
        <Text className="text-xl text-[#ffffff] font-extrabold">Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#F1F5F8] h-full"
      >
        {/* Top */}
        <View className="justify-between items-center py-5">
          <Image
            source={{
              uri: user.picture,
            }}
            className="w-32 h-32 rounded-full p-4"
          />
          <Text className="pt-2 text-[#826aed] font-bold text-2xl">
            {user.name}
          </Text>
          <Text className="pt-1 text-[#212529] font-bold text-lg">
            {user.matric}
          </Text>
        </View>

        {/* Details */}
        <View className="h-full">
          <View className="bg-[#826aed] py-3">
            <Text className="font-bold text-lg text-[#ffffff] mx-5">
              Profile Details
            </Text>
          </View>
          <View className="mx-7 space-y-1 pt-3">
            <Text className="text-base font-semibold text-[#6c757d]">
              Date of Birth
            </Text>
            <Text className="text-lg font-semibold text-[#826aed]">
              {user.dob}
            </Text>
          </View>
          <View className="mx-7 space-y-1 pt-3">
            <Text className="text-base font-semibold text-[#6c757d]">
              Gender
            </Text>
            <Text className="text-lg font-semibold text-[#826aed]">
              {user.gender}
            </Text>
          </View>
          {user.year != null ? (
            <View className="mx-7 space-y-1 pt-3">
              <Text className="text-base font-semibold text-[#6c757d]">
                Year of Study
              </Text>
              <Text className="text-lg font-semibold text-[#826aed]">
                Year {user.year}
              </Text>
            </View>
          ) : null}
          {user.course != null ? (
            <View className="mx-7 space-y-1 pt-3">
              <Text className="text-base font-semibold text-[#6c757d]">
                Course
              </Text>
              <Text className="text-lg font-semibold text-[#826aed]">
                {user.course}
              </Text>
            </View>
          ) : null}
          <View className="mx-7 space-y-1 pt-3">
            <Text className="text-base font-semibold text-[#6c757d]">
              Nationality
            </Text>
            <Text className="text-lg font-semibold text-[#826aed]">
              {user.nationality}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute inset-x-0 bottom-0 h-[90px] pb-3 bg-white shadow shadow-black/10">
        <View className="flex-row justify-between px-14 pt-[6px]">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="h-full items-center space-y-1">
              <UserCircleIcon size={30} color="#826aed" />
              <Text className="text-xs text-[#826aed]">Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Home")}
          >
            <View className="h-full items-center space-y-1">
              <HomeIcon size={30} color="#6c757d" />
              <Text className="text-xs text-[#6c757d]">Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Tasmik")}
          >
            <View className="h-full items-center space-y-1">
              <CalendarDaysIcon size={30} color="#6c757d" />
              <Text className="text-xs text-[#6c757d]">Attendance</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
