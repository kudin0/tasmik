import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import {
  ArrowLeftIcon,
  PencilIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AnnouncementScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);

  const getAnnouncements = async () => {
    try {
      const q = query(collection(db, "announcement"), orderBy("date", "desc"));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAnnouncements(filteredData);
      if (initializing) {
        setInitializing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    getAnnouncements();
    getUser();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getAnnouncements();
    }
  }, [isFocused]);

  const handleTasmikButton = () => {
    if (user.type === "lecturer") {
      navigation.navigate("TasmikLecturer");
    }

    if (user.type === "student") {
      navigation.navigate("Tasmik");
    }
  };

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
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
        <Text className="text-xl text-[#ffffff] font-extrabold">
          Announcement
        </Text>
      </View>

      <View className="bg-[#F1F5F8]">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          className="bg-[#F1F5F8] h-full"
        >
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}

          <View className="my-20 py-20"></View>
        </ScrollView>
      </View>

      {/* lecturer add announcement */}
      {user.type == "lecturer" ? (
        <TouchableOpacity
          className="bg-white py-5 px-3 rounded-2xl shadow shadow-black/10 items-center justify-center absolute bottom-28 right-4"
          onPress={() => navigation.navigate("AnnounceWrite")}
        >
          <PlusIcon size={30} color="#826aed" />
          <Text className="tracking-tighter leading-tight text-center text-[#212529]">
            Announcement
          </Text>
        </TouchableOpacity>
      ) : null}

      {/* Bottom Navigation */}
      <View className="absolute inset-x-0 bottom-0 h-[90px] pb-3 bg-white shadow shadow-black/10">
        <View className="flex-row justify-between px-14 pt-[6px]">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Profile")}
          >
            <View className="h-full items-center space-y-1">
              <UserCircleIcon size={30} color="#6c757d" />
              <Text className="text-xs text-[#6c757d]">Account</Text>
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
          <TouchableOpacity className="" onPress={handleTasmikButton}>
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

export default AnnouncementScreen;
