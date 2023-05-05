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
      <SafeAreaView
        className="bg-white h-full"
        style={SafeViewAndroid.AndroidSafeArea}
      >
        <View className="flex-row relative py-4 bg-white items-center justify-center border-b border-gray-300">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#212529" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold text-[#212529]">
            Announcement
          </Text>
        </View>
        <ScrollView>
          <View className="bg-[#826aed] h-28 justify-center items-center">
            <Text className="text-lg font-bold text-[#FBFAFF]">{title}</Text>
          </View>
          <View className="mx-5 space-y-2 py-2 mb-2 border-b border-[#6c757d]">
            <Text className="text-[#6c757d] text-sm font-semibold">
              Posted by {byName}
            </Text>
            <Text className="text-[#826aed] text-sm">{date}</Text>
          </View>
          <Text className="mx-5 text-[#212529] text-lg text-justify">
            {details}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AnnounceDetailScreen;
