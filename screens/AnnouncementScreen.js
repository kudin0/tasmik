import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SafeViewAndroid from "../components/SafeViewAndroid";

const AnnouncementScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="bg-white h-full"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* header */}
      <View className="flex-row relative h-12 bg-white items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#3A5311" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold">Bulletin</Text>
      </View>
      
      <ScrollView
        className="space-y-2 bg-[#F6F5F5]"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <AnnouncementCard
          id={"0001"}
          title={"Announcement #1"}
          byName={"Dr. Karim Abd Razak"}
          date={"##/##/####"}
          details={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu. Aliquam porta sodales libero, a mollis velit pulvinar vel. Suspendisse nec dui diam. Duis non velit vel libero fermentum blandit a ut eros. Morbi laoreet ex blandit nunc pharetra porttitor. \nInteger a condimentum arcu. Pellentesque faucibus fermentum dapibus. Curabitur laoreet accumsan vestibulum. Maecenas commodo eget lorem blandit tempus.`}
        />
        <AnnouncementCard
          title={"Announcement #2"}
          byName={"Dr. Karim Abd Razak"}
          date={"##/##/####"}
          details={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu. Aliquam porta sodales libero, a mollis velit pulvinar vel. Suspendisse nec dui diam. Duis non velit vel libero fermentum blandit a ut eros. Morbi laoreet ex blandit nunc pharetra porttitor. \nInteger a condimentum arcu. Pellentesque faucibus fermentum dapibus. Curabitur laoreet accumsan vestibulum. Maecenas commodo eget lorem blandit tempus.`}
        />
        <AnnouncementCard
          title={"Announcement #3"}
          byName={"Dr. Karim Abd Razak"}
          date={"##/##/####"}
          details={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu. \n\nAliquam porta sodales libero, a mollis velit pulvinar vel. Suspendisse nec dui diam. Duis non velit vel libero fermentum blandit a ut eros. Morbi laoreet ex blandit nunc pharetra porttitor. \nInteger a condimentum arcu. Pellentesque faucibus fermentum dapibus. Curabitur laoreet accumsan vestibulum. Maecenas commodo eget lorem blandit tempus.`}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnnouncementScreen;
