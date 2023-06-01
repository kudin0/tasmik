import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AnnouncementCard = ({
  id,
  title,
  imgUrl,
  byName,
  date,
  details,
  screen,
  userType,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="relative"
      onPress={() => {
        navigation.navigate("AnnounceDetail", {
          id,
          title,
          imgUrl,
          byName,
          date,
          details,
          userType,
        });
      }}
    >
      {screen == "home" ? (
        <View className="h-28 w-screen bg-white justify-center items-center">
          <Text className="text-[#212529] text-lg font-semibold">{title}</Text>
        </View>
      ) : (
        <View className="my-2">
          <View className="bg-[#826aed] justify-center items-center rounded-t-xl h-28 w-full">
            <Text className="text-[#ffffff] font-bold text-lg">{title}</Text>
          </View>
          <View className="flex-row justify-between bg-[#ffffff] px-5 py-2 rounded-b-lg border-x border-b">
            <Text className="text-[#6c757d] text-md font-semibold">
              {byName}
            </Text>
            <Text className="text-[#6c757d] text-md font-semibold">{date}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AnnouncementCard;
