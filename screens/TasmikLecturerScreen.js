import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, CalendarDaysIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  ArrowPathIcon,
  CalendarIcon,
  HomeIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import TasmikSessionCard from "../components/TasmikSessionCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const TasmikLecturerScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [classroom, setClassroom] = useState("");
  const [tasmikSessions, setTasmikSessions] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
      } else {
        console.log("User does not exists");
      }
    });
  }, []);

  const getTasmikSessions = async () => {
    const q = query(collection(db, "classroom", user.classroom, "session"));
    try {
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasmikSessions(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const getClassroomInfo = () => {
    getDoc(doc(db, "classroom", user.classroom)).then((snapshot) => {
      if (snapshot.exists) {
        setClassroom(snapshot.data());
        if (initializing) {
          setInitializing(false);
        }
      } else {
        console.log("User does not exists");
      }
    });
  };

  useEffect(() => {
    if (user) {
      getClassroomInfo();
      getTasmikSessions();
    }
  }, [user]);

  function handleRefresh() {
    setRefreshKey((prevKey) => prevKey + 1);
  }

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
      className="bg-[#826aed] h-full"
    >
      {/* Header */}
      <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl text-[#ffffff] font-extrabold">
          Attendance
        </Text>
      </View>

      <View className="bg-[#F1F5F8]">
        {/* Tasmik Info */}
        <View className="flex-row justify-between px-5 py-3">
          <View className="space-y-1">
            <Text className="text-[#826aed] font-bold text-lg">
              {classroom.lecturer_name}
            </Text>
            <Text className="text-[#6c757d] font-semibold text-base">
              Lecturer
            </Text>
          </View>
          <View className="items-end space-y-1">
            <Text className="text-[#826aed] font-bold text-lg">
              {classroom.term}
            </Text>
            <Text className="text-[#6c757d] font-semibold text-base">Term</Text>
          </View>
        </View>
        <View className="flex-row mx-6 items-center justify-between space-x-3 mb-1">
          <Text className="text-base text-[#6c757d] font-semibold">
            Timeline
          </Text>
          <TouchableOpacity
            className="border border-[#826aed] px-2 py-1 rounded-full flex-row items-center space-x-1"
            onPress={() => navigation.navigate("TasmikBalanceLecturer")}
          >
            <CalendarIcon size={20} color="#826aed" />
            <Text className="text-base text-[#826aed] font-semibold">
              Tasmik Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-[#826aed] px-2 py-1 rounded-full flex-row items-center space-x-1">
            <ArrowPathIcon size={20} color="#826aed" />
            <Text className="text-base text-[#826aed] font-semibold">
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* content */}
      <ScrollView className="px-5 space-y-2 bg-[#F1F5F8] h-full">
        {tasmikSessions.map((tasmik) => (
          <TasmikSessionCard
            key={tasmik.id}
            tasmik={tasmik}
            classroom={user.classroom}
          />
        ))}
      </ScrollView>

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
              <CalendarDaysIcon size={30} color="#826aed" />
              <Text className="text-xs text-[#826aed]">Attendance</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TasmikLecturerScreen;
