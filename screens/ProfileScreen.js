import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
        console.log(user);
      } else {
        console.log("User does not exists");
      }
    });
  }, []);

  return (
    <SafeAreaView
      className="pt-7 bg-white h-full"
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
        <Text className="text-xl font-extrabold">Profile</Text>
      </View>

      {/* Top */}
      <View className="justify-between items-center bg-[#F6F5F5] py-5">
        <Image
          source={{
            uri: user.picture,
          }}
          className="w-32 h-32 rounded-full p-4"
        />
        <Text className="pt-2 text-[#728C69] font-bold text-2xl">
          {user.name}
        </Text>
        <Text className="pt-1 text-[#728C69] font-semibold text-lg">
          {user.matric}
        </Text>
      </View>

      {/* Details */}
      <View className="bg-[#F6F5F5] h-full">
        <View className="bg-white py-3">
          <Text className="font-bold text-lg text-[#3A5311] mx-5">
            Profile Details
          </Text>
        </View>
        <View className="mx-7 space-y-1 pt-3">
          <Text className="text-lg font-semibold text-[#728C69]">
            {user.dob}
          </Text>
          <Text className="text-base font-semibold text-[#74B49B]">
            Date of Birth
          </Text>
        </View>
        <View className="mx-7 space-y-1 pt-3">
          <Text className="text-lg font-semibold text-[#728C69]">
            {user.gender}
          </Text>
          <Text className="text-md font-semibold text-[#74B49B]">Gender</Text>
        </View>
        <View className="mx-7 space-y-1 pt-3">
          <Text className="text-lg font-semibold text-[#728C69]">
            Year {user.year}
          </Text>
          <Text className="text-base font-semibold text-[#74B49B]">
            Year of Study
          </Text>
        </View>
        <View className="mx-7 space-y-1 pt-3">
          <Text className="text-lg font-semibold text-[#728C69]">
            {user.course}
          </Text>
          <Text className="text-base font-semibold text-[#74B49B]">Course</Text>
        </View>
        <View className="mx-7 space-y-1 pt-3">
          <Text className="text-lg font-semibold text-[#728C69]">
            {user.nationality}
          </Text>
          <Text className="text-base font-semibold text-[#74B49B]">
            Nationality
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View className="absolute inset-x-0 bottom-0 h-20 bg-white drop-shadow-lg border-t border-gray-300">
        <View className="flex-row justify-between mx-16">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="h-full justify-center items-center">
              <UserIcon size={30} color="#3A5311" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Home")}
          >
            <View className="h-full justify-center items-center">
              <HomeIcon size={30} color="#74B49B" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Tasmik")}
          >
            <View className="h-full justify-center items-center">
              <CalendarDaysIcon size={30} color="#74B49B" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
