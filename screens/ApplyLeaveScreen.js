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

const ApplyLeaveScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [classroom, setClassroom] = useState("");
  const [tasmikSessions, setTasmikSessions] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [leaveReason, setLeaveReason] = useState(null);
  const [leaveDetails, setLeaveDetails] = useState("");
  const [open, setOpen] = useState(false);

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
    try {
      const q = query(
        collection(db, "classroom", user.classroom, "session"),
        where("past", "==", "no")
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        value: doc.data().title,
        label: doc.data().title,
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

  const alertFormIncomplete = () => {
    Alert.alert("Application Incomplete", "Please fill out all fields.", [
      { text: "OK", onPress: null },
    ]);
  };

  const handleForm = async () => {
    if (!leaveReason || !selectedSession) {
      alertFormIncomplete();
      return;
    }
    try {
      await addDoc(collection(db, "leave_application"), {
        uid: user.uid,
        name: user.name,
        matric: user.matric,
        timestamp: moment().utcOffset("+8:00").format("DD-MM-YYYY hh:mm A"),
        reason: leaveReason,
        session: selectedSession,
        details: leaveDetails,
        status: "Applied",
        classroom: classroom.id,
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
            <DropDownPicker
              placeholder="Select applied session"
              items={tasmikSessions}
              open={open}
              setOpen={setOpen}
              setValue={setSelectedSession}
              value={selectedSession}
              style={{
                borderWidth: 0,
                borderColor: "transparent",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 1 },
              }}
              textStyle={{
                fontSize: 17,
                color: "#212529",
              }}
              dropDownContainerStyle={{
                borderWidth: 0,
                borderColor: "transparent",
              }}
            />
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
