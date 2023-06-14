import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import LeaveStatusCard from "../components/LeaveStatusCard";

const ApplyLeaveStatusScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [leaveApplications, setLeaveApplications] = useState([]);
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

  const getLeaveAppplication = async () => {
    try {
      const q = query(
        collection(db, "leave_application"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLeaveApplications(filteredData);
      if (initializing) {
        setInitializing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getLeaveAppplication();
    }
  }, [user]);

  function handleRefresh() {
    setRefreshKey((prevKey) => prevKey + 1);
  }

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

  return (
    <SafeAreaView className="bg-[#826aed] h-full">
      {/* Header */}
      <View className="flex-row relative h-12 bg-[#826aed] items-center justify-center border-b border-gray-300">
        <TouchableOpacity
          onPress={() => navigation.navigate("ApplyLeave")}
          className="absolute left-5 p-2 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl text-[#ffffff] font-extrabold">
          Leave Application
        </Text>
      </View>

      <View className="bg-[#F1F5F8] h-full">
        {/* Top */}
        <View className="py-3 pt-4 space-y-3">
          <View className="flex-row items-center justify-evenly">
            <TouchableOpacity className="pb-2">
              <Text
                className="text-base text-[#6c757d] font-bold"
                onPress={() => navigation.navigate("ApplyLeave")}
              >
                Application
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="pb-2 border-b-2 border-[#826aed]">
              <Text
                className="text-base text-[#826aed] font-bold"
                onPress={() => navigation.navigate("ApplyLeaveStatus")}
              >
                Leave Status
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          className="px-5 space-y-2 bg-[#F1F5F8] h-full"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {leaveApplications.map((leaveApplication) => (
            <LeaveStatusCard
              key={leaveApplication.id}
              type={"student"}
              leaveApplication={leaveApplication}
            />
          ))}

          <View className="py-20"></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ApplyLeaveStatusScreen;
