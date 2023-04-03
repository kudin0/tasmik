import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AnnouncementCard = ({ id, title, imgUrl, byName, date, details }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative bg-white mt-2"
      onPress={() => {
        navigation.navigate("AnnounceDetail", {
          id,
          title,
          imgUrl,
          byName,
          date,
          details,
        });
      }}
    >
      <View className="bg-[#BECBD3] justify-center items-center rounded-t-lg h-28 w-full">
        <Text className="text-[#3A5311] font-bold text-lg">{title}</Text>
      </View>
      <View className="flex-row justify-between mx-5 py-2 rounded-b-lg">
        <Text className="text-[#728C69] text-md font-semibold">{byName}</Text>
        <Text className="text-[#728C69] text-md font-semibold">{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AnnouncementCard;
