import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
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
import { useNavigation } from "@react-navigation/native";
import ScheduleCard from "../components/ScheduleCard";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import AnnouncementCard from "../components/AnnouncementCard";

function HomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [tasmikSessions, setTasmikSessions] = useState([]);
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

  useEffect(() => {
    if (user) {
      getTasmikSessions();
    }
  }, [user]);

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

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <Image source={require("../assets/load.gif")} />
      </View>
    );

  return (
    <SafeAreaView
      className="bg-[#826aed] pt-5 h-full flex"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex pt-7 pb-5 px-5 bg-[#826aed]">
        <View className="flex-row">
          <Text className="text-4xl font-extrabold text-[#FBFAFF] pr-1">
            myTasmik
          </Text>
          <BookOpenIcon size={32} color="#ffffff" />
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
          <AnnouncementCard
            id={"0001"}
            screen={"home"}
            title={"Announcement #1"}
            byName={"Dr. Karim Abd Razak"}
            date={"##/##/####"}
            details={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu. Aliquam porta sodales libero, a mollis velit pulvinar vel. Suspendisse nec dui diam. Duis non velit vel libero fermentum blandit a ut eros. Morbi laoreet ex blandit nunc pharetra porttitor. \nInteger a condimentum arcu. Pellentesque faucibus fermentum dapibus. Curabitur laoreet accumsan vestibulum. Maecenas commodo eget lorem blandit tempus.`}
          />
          <AnnouncementCard
            id={"0002"}
            screen={"home"}
            title={"Announcement #2"}
            byName={"Dr. Karim Abd Razak"}
            date={"##/##/####"}
            details={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu. Aliquam porta sodales libero, a mollis velit pulvinar vel. Suspendisse nec dui diam. Duis non velit vel libero fermentum blandit a ut eros. Morbi laoreet ex blandit nunc pharetra porttitor. \nInteger a condimentum arcu. Pellentesque faucibus fermentum dapibus. Curabitur laoreet accumsan vestibulum. Maecenas commodo eget lorem blandit tempus.`}
          />
          <AnnouncementCard
            id={"0003"}
            screen={"home"}
            title={"Announcement #3"}
            byName={"Dr. Karim Abd Razak"}
            date={"##/##/####"}
            details={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor, mi eu accumsan imperdiet, sem nibh malesuada magna, ac placerat leo orci ut arcu. \n\nAliquam porta sodales libero, a mollis velit pulvinar vel. Suspendisse nec dui diam. Duis non velit vel libero fermentum blandit a ut eros. Morbi laoreet ex blandit nunc pharetra porttitor. \nInteger a condimentum arcu. Pellentesque faucibus fermentum dapibus. Curabitur laoreet accumsan vestibulum. Maecenas commodo eget lorem blandit tempus.`}
          />
        </ScrollView>

        {/* Schedule */}
        <View className="flex pt-4 px-5 shadow shadow-black/20">
          <TouchableOpacity
            className="py-5 w-full bg-[#826aed] rounded-t-2xl"
            onPress={() => navigation.navigate("Tasmik")}
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
                <ScheduleCard
                  id={tasmik.id}
                  title={tasmik.title}
                  date={tasmik.date}
                  time={tasmik.time}
                  place={tasmik.place}
                  details={tasmik.details}
                />
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
              paddingHorizontal: 15,
              paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-2 "
              onPress={() => navigation.navigate("Tasmik")}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm">
                <CalendarDaysIcon size={45} color="#d62828" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Attendance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-2 "
              onPress={() => navigation.navigate("Announcement")}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm">
                <MegaphoneIcon size={45} color="#3a86ff" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Announcement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-2 "
              onPress={() => navigation.navigate("Report")}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm">
                <PresentationChartLineIcon size={45} color="#ffbe0b" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-24 w-28 items-center justify-center rounded-2xl mx-2 "
              onPress={null}
            >
              <View className="rounded-full bg-[#ffffff] p-3 shadow-sm">
                <InboxStackIcon size={45} color="#588157" />
              </View>
              <Text className="text-[#212529] font-semibold text-base">
                Apply Leave
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View className="my-20 justify-center items-center">
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
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Tasmik")}
          >
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
