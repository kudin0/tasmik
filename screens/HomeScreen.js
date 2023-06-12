import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import {
  BookOpenIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
  InboxStackIcon,
} from "react-native-heroicons/solid";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ScheduleCard from "../components/ScheduleCard";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import AnnouncementCard from "../components/AnnouncementCard";

function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [tasmikSessions, setTasmikSessions] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [initializing, setInitializing] = useState(true);

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
    try {
      const q = query(
        collection(db, "classroom", user.classroom, "session"),
        where("past", "==", "no"),
        limit(3)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasmikSessions(filteredData);
      if (initializing) {
        setInitializing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAnnouncements = async () => {
    try {
      const q = query(
        collection(db, "announcement"),
        limit(5),
        orderBy("date", "desc")
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userType: user.type,
      }));
      setAnnouncements(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && isFocused) {
      getTasmikSessions();
      getAnnouncements();
    }
  }, [user, isFocused]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("LogOut");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const alertLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: null,
        style: "cancel",
      },
      { text: "OK", onPress: () => logOut() },
    ]);
  };

  const scrollViewRef = useRef(null);

  const onScrollEndDrag = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const frameWidth = event.nativeEvent.layoutMeasurement.width;
    const maxOffsetX = contentWidth - frameWidth;
    if (contentOffsetX >= maxOffsetX) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const handleApplyLeaveButton = () => {
    if (user.type === "lecturer") {
      navigation.navigate("LeaveApplication");
    }

    if (user.type === "student") {
      navigation.navigate("ApplyLeave");
    }
  };

  const handleTasmikButton = () => {
    if (user.type === "lecturer") {
      navigation.navigate("TasmikLecturer");
    }

    if (user.type === "student") {
      navigation.navigate("Tasmik");
    }
  };

  const handleReportButton = () => {
    if (user.type === "lecturer") {
      navigation.navigate("ReportLecturer");
    }

    if (user.type === "student") {
      navigation.navigate("Report", { uid: user.uid });
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
      className="bg-[#826aed] pt-5 h-full flex"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex pb-5 px-5 bg-[#826aed]">
        <View className="flex-row">
          <View className="flex-row items-start">
            <Image
              source={require("../assets/logo1.png")}
              style={{
                width: undefined,
                height: 65,
                aspectRatio: 3,
                resizeMode: "contain",
              }}
            />
          </View>

          <TouchableOpacity className="ml-auto" onPress={alertLogOut}>
            <ArrowLeftOnRectangleIcon size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-lg font-bold text-[#FBFAFF]">
            Welcome, <Text className="text-[#FBFAFF]">{user.name}</Text>
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#F1F5F8] h-full"
      >
        {/* Announcement Card */}
        <ScrollView
          contentContainerStyle={{}}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={scrollViewRef}
          onScrollEndDrag={onScrollEndDrag}
        >
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              screen={"home"}
              announcement={announcement}
            />
          ))}
        </ScrollView>

        {/* Schedule */}
        <View className="flex pt-4 px-5 shadow shadow-black/20">
          <TouchableOpacity
            className="py-5 w-full bg-[#826aed] rounded-t-2xl"
            onPress={handleTasmikButton}
          >
            <View className="mx-6 flex-row items-center">
              <CalendarDaysIcon size={24} color="white" />
              <Text className="text-white font-semibold text-lg ml-3">
                Your Next Tasmik
              </Text>
            </View>
          </TouchableOpacity>
          <View className="rounded-b-2xl min-h-[60px] bg-white py-3">
            {tasmikSessions.map((tasmik, index) => (
              <View key={tasmik.id}>
                <ScheduleCard tasmik={tasmik} classroom={user.classroom} />
                {index != tasmikSessions.length - 1 ? (
                  <View className="border-b border-gray-400" />
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View className="mx-6 pt-7">
          <Text className="font-bold text-xl text-[#212529]">Features</Text>
        </View>
        <View className="">
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-1"
              onPress={handleTasmikButton}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm shadow-black/10">
                <CalendarDaysIcon size={45} color="#d62828" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Attendance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-1"
              onPress={handleApplyLeaveButton}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm shadow-black/10">
                <InboxStackIcon size={45} color="#588157" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Apply Leave
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-1"
              onPress={() => navigation.navigate("Announcement")}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm shadow-black/10">
                <MegaphoneIcon size={45} color="#3a86ff" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Announcement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-1"
              onPress={handleReportButton}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm shadow-black/10">
                <PresentationChartLineIcon size={45} color="#ffbe0b" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Report
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View className="my-20 justify-center items-center pb-20">
          <Text className="text-center text-base font-semibold">{`Made by\nMuhammad Izzudin bin Zamri\nA182956`}</Text>
        </View>
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
              <HomeIcon size={30} color="#826aed" />
              <Text className="text-xs text-[#826aed]">Home</Text>
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
}

export default HomeScreen;
