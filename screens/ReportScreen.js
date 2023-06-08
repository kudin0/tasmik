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

const ReportScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [reports, setReports] = useState([]);
  const [attendedCount, setAttendedCount] = useState("");
  const [tasmikSessions, setTasmikSessions] = useState([]);
  const [initializing, setInitializing] = useState(true);

  const {
    params: { uid },
  } = useRoute();

  const getUser = async () => {
    try {
      const userSnapshot = await getDoc(doc(db, "users", uid));
      if (userSnapshot.exists) {
        const classroomRef = doc(
          db,
          "classroom",
          userSnapshot.data().classroom
        );
        const classroomSnapshot = await getDoc(classroomRef);
        if (classroomSnapshot.exists) {
          const lecturerName = classroomSnapshot.data().lecturer_name;
          setUser({
            ...userSnapshot.data(),
            lecturerName: lecturerName,
          });
        }
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

  const getTasmikSessions = async () => {
    const sessionQuery = query(
      collection(db, "classroom", user.classroom, "session")
    );

    try {
      const sessionSnapshot = await getDocs(sessionQuery);
      const sessionData = [];
      const reportData = [];
      let count = 0;

      for (const docSnap of sessionSnapshot.docs) {
        const sessionId = docSnap.id;

        //fetch attendance data
        const attendanceDocRef = doc(
          db,
          "classroom",
          user.classroom,
          "session",
          sessionId,
          "attendance",
          user.uid
        );

        const attendanceDoc = await getDoc(attendanceDocRef);

        let status = "none";
        if (attendanceDoc.exists) {
          const attendanceData = attendanceDoc.data();
          if (attendanceData && attendanceData.status) {
            status = attendanceData.status;
          }
        }

        if (status === "Attended") {
          count++;
        }

        sessionData.push({
          id: sessionId,
          ...docSnap.data(),
          status: status !== "none" ? status : "none",
        });

        // fetch report data
        const reportDocRef = doc(
          db,
          "classroom",
          user.classroom,
          "session",
          sessionId,
          "report",
          user.uid
        );

        const reportDocSnapshot = await getDoc(reportDocRef);
        if (reportDocSnapshot.data() !== undefined) {
          reportData.push({
            ...reportDocSnapshot.data(),
          });
        }
      }

      setReports(reportData);
      setTasmikSessions(sessionData);
      setAttendedCount(count);
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    if (user) {
      getTasmikSessions();
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
        {/* Profile */}
        <View className="my-2 pb-2">
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
            <Text className="text-[#212529] text-lg">
              Session Attended:{" "}
              <Text className="text-[#212529] font-semibold">
                {attendedCount} out of {tasmikSessions.length}
              </Text>
            </Text>
            <Text className="text-[#212529] text-lg">
              Lecturer:{" "}
              <Text className="text-[#212529] font-semibold">
                {user.lecturerName}
              </Text>
            </Text>
          </View>
        </View>
        {/* content */}
        <Text className="text-[#826aed] font-semibold text-lg">
          List of Report by session (if available){" "}
        </Text>
        <ScrollView className="space-y-2 mt-2">
          {reports.map((report, index) => (
            <ReportCard key={index} report={report} />
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

export default ReportScreen;
