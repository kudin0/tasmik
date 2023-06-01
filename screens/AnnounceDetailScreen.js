import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setAnnouncement } from "../features/announcementSlice";
import { ArrowLeftIcon, TrashIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AnnounceDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: { id, title, imgUrl, byName, date, details, userType },
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

  const alertDelete = () => {
    Alert.alert(
      "Delete Announcement",
      "Are you sure you want to delete this announcement?",
      [
        {
          text: "Cancel",
          onPress: null,
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteAnnouncement() },
      ]
    );
  };

  const deleteAnnouncement = async () => {
    try {
      await deleteDoc(doc(db, "announcement", id));
      navigation.navigate("Announcement");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        {userType == "lecturer" ? (
          <TouchableOpacity
            className="absolute right-5 p-2 rounded-full"
            onPress={alertDelete}
          >
            <TrashIcon size={25} color="#212529" />
          </TouchableOpacity>
        ) : null}
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
  );
};

export default AnnounceDetailScreen;
