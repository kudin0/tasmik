import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  HomeIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid";
import ReportCard from "../components/ReportCard";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import { auth, db } from "../firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "firebase/database";
import TermReportCard from "../components/TermReportCard";

const ReportPrevScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [terms, setTerms] = useState([]);
  const [initializing, setInitializing] = useState(true);

  const {
    params: { uid },
  } = useRoute();

  const getUser = async () => {
    try {
      const userSnapshot = await getDoc(doc(db, "users", uid));
      if (userSnapshot.exists) {
        setUser(userSnapshot.data());
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getTerms = async () => {
    const termQuery = query(
      collection(db, "users", uid, "past_classroom"),
      where("status", "==", "Completed")
    );
    try {
      const termSnapshot = await getDocs(termQuery);
      const termData = [];
      for (const docSnap of termSnapshot.docs) {
        termData.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
      setTerms(termData);
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    if (user) {
      getTerms();
    }
  }, [user]);

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
      {/* Header */}
      <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl text-[#ffffff] font-extrabold">Report</Text>
      </View>

      <View className="bg-[#F1F5F8] h-full px-5">
        <View className="flex-row items-center justify-evenly py-3">
          <TouchableOpacity className="pb-2">
            <Text
              className="text-base text-[#6c757d] font-bold"
              onPress={() => navigation.navigate("Report", { uid: uid })}
            >
              Current Term
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="pb-2 border-b-2 border-[#826aed]">
            <Text
              className="text-base text-[#826aed] font-bold"
              onPress={() =>
                navigation.navigate("ReportPrevious", { uid: uid })
              }
            >
              Previous Term
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View className="pb-2">
          <Text className="text-[#826aed] font-semibold text-lg">
            User Profile
          </Text>
          <View className="mt-2 space-y-2">
            <Text className="text-[#212529] text-lg w-fit">
              Name:
              <Text className="text-[#212529] font-semibold"> {user.name}</Text>
            </Text>
            <Text className="text-[#212529] text-lg">
              Matric:{" "}
              <Text className="text-[#212529] font-semibold">
                {user.matric}
              </Text>
            </Text>
          </View>
        </View>
        {/* content */}
        <Text className="text-[#826aed] font-semibold text-lg">
          List of Previous Term (if available)
        </Text>
        <ScrollView className="space-y-2 mt-2">
          {terms.map((term) => (
            <TermReportCard key={term.id} term={term} uid={uid} />
          ))}
        </ScrollView>
      </View>

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
          <TouchableOpacity className="" onPress={() => {}}>
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

export default ReportPrevScreen;
