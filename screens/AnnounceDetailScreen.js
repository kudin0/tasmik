import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setAnnouncement } from "../features/announcementSlice";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";

const AnnounceDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: { id, title, imgUrl, byName, date, details },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setAnnouncement({
        id,
        title,
        imgUrl,
        byName,
        date,
        details,
      })
    );
  }, []);

  return (
    <>
      <SafeAreaView className="bg-white h-full" style={SafeViewAndroid.AndroidSafeArea}>
        <View className="flex-row relative h-12 bg-white drop-shadow-2xl items-center justify-center border-b border-gray-300">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#3A5311" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold">Announcement</Text>
        </View>
        <ScrollView>
          <View className="bg-[#BECBD3] h-28 justify-center items-center mb-2">
            <Text className="text-base font-bold text-[#3A5311]">{title}</Text>
          </View>
          <View className="mx-5 space-y-2 pb-2 mb-2 border-b border-[#3A5311]">
            <Text className="text-[#728C69] text-sm font-semibold">Posted by {byName}</Text>
            <Text className="text-[#74B49B] text-sm">{date}</Text>
          </View>
          <Text className="mx-5 text-[#728C69] text-lg text-justify">
            {details}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AnnounceDetailScreen;
