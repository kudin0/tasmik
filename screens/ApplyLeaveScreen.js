import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment/moment";
import { set } from "firebase/database";

const ApplyLeaveScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [tasmikSessions, setTasmikSessions] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [leaveReason, setLeaveReason] = useState(null);
  const [leaveDetails, setLeaveDetails] = useState("");

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
    getUser();
  }, []);

  const getTasmikSessions = async () => {
    const sessionQuery = query(
      collection(db, "classroom", user.classroom, "session")
    );

    try {
      const sessionSnapshot = await getDocs(sessionQuery);
      const sessionData = [];

      for (const docSnap of sessionSnapshot.docs) {
        const sessionId = docSnap.id;

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

        if (
          !attendanceDoc.exists() ||
          attendanceDoc.data().status !== "Attended"
        ) {
          sessionData.push({
            ...docSnap.data(),
          });
        }
      }

      setTasmikSessions(sessionData);
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

  const DropdownPicker = ({ options }) => {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
      setOpen(!open);
    };

    const handleSelect = (option) => {
      setSelectedSession(option);
      setOpen(false);
    };

    return (
      <View className="relative z-10">
        <TouchableOpacity
          className="pl-2 h-12 bg-white rounded-lg justify-center shadow-sm"
          onPress={toggleDropdown}
        >
          {selectedSession ? (
            <Text className="text-lg text-[#212529]">
              {selectedSession.title}
            </Text>
          ) : (
            <Text className="text-lg text-[#adb5bd]">Select a session</Text>
          )}
        </TouchableOpacity>
        {open && (
          <View className="absolute top-[85%] w-full bg-white rounded-b-lg pl-2 space-y-2 pt-2">
            {options.map((option) => (
              <TouchableOpacity
                className="h-12 justify-center"
                key={option.id}
                onPress={() => handleSelect(option)}
              >
                <Text className="text-lg text-[#212529]">{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const alertFormIncomplete = () => {
    Alert.alert("Application Incomplete", "Please fill out all fields.", [
      { text: "OK", onPress: null },
    ]);
  };

  const handleForm = async () => {
    if (!leaveReason || !selectedSession) {
      alertFormIncomplete();
      console.log(
        "leaveReason: ",
        leaveReason,
        "selectedSession: ",
        selectedSession
      );
      return;
    }
    try {
      await addDoc(collection(db, "leave_application"), {
        uid: user.uid,
        name: user.name,
        matric: user.matric,
        timestamp: moment().utcOffset("+8:00").format("DD-MM-YYYY hh:mm A"),
        reason: leaveReason,
        sessionId: selectedSession.id,
        session: selectedSession.title,
        details: leaveDetails,
        status: "Pending",
        classroom: user.classroom,
      });
      setLeaveReason("");
      setSelectedSession("");
      setLeaveDetails("");
      navigation.navigate("ApplyLeaveStatus");
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            Leave Application
          </Text>
        </View>

        <View className="bg-[#F1F5F8] h-full">
          {/* Top */}
          <View className="py-3 pt-4 space-y-3">
            <View className="flex-row items-center justify-evenly">
              <TouchableOpacity className="pb-2 border-b-2 border-[#826aed]">
                <Text
                  className="text-base text-[#826aed] font-bold"
                  onPress={() => navigation.navigate("ApplyLeave")}
                >
                  Application
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="pb-2">
                <Text
                  className="text-base text-[#6c757d] font-bold"
                  onPress={() => navigation.navigate("ApplyLeaveStatus")}
                >
                  Leave Status
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <View className="pt-[10px] px-5 space-y-1">
            <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
              Session
            </Text>
            <DropdownPicker options={tasmikSessions} />
            <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
              Reason
            </Text>
            <TextInput
              className="mb-3 pl-2 h-12 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
              placeholder="Reason for leave"
              placeholderTextColor="#adb5bd"
              clearButtonMode="always"
              onChangeText={(leaveReason) => setLeaveReason(leaveReason)}
              value={leaveReason}
            />
            <Text className="mx-2 text-left text-lg font-semibold text-[#826aed]">
              Further details <Text className="text-[#6c757d]">(optional)</Text>
            </Text>
            <TextInput
              className="mb-3 pl-2 h-12 bg-white rounded-lg text-lg text-[#212529] shadow-sm"
              placeholder="Further details"
              placeholderTextColor="#adb5bd"
              clearButtonMode="always"
              onChangeText={(leaveDetails) => setLeaveDetails(leaveDetails)}
              value={leaveDetails}
            />
          </View>
          <TouchableOpacity
            onPress={() => handleForm()}
            className="w-[270px] mt-[100px] items-center self-center bg-[#826aed] shadow shadow-black/30 rounded-xl p-3"
          >
            <Text className="text-center text-white text-2xl font-bold">
              Apply Leave
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ApplyLeaveScreen;
