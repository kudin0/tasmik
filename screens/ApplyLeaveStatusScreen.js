import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
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
    query,
    where,
  } from "firebase/firestore";
  import { auth, db } from "../firebase";
  import { SelectList } from "react-native-dropdown-select-list";
  import DropDownPicker from "react-native-dropdown-picker";
  
  const ApplyLeaveStatusScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState("");
    const [classroom, setClassroom] = useState("");
    const [tasmikSessions, setTasmikSessions] = useState([]);
    const [initializing, setInitializing] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedSession, setSelectedSession] = useState(null);
    const [leaveReason, setLeaveReason] = useState(null);
    const [leaveDetails, setLeaveDetails] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);
  
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
          where("past", "==", "no")
        );
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          value: doc.id,
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
          user: user.uid,
          reason: leaveReason,
          session: selectedSession,
          details: leaveDetails,
          status: "applied",
          classroom: classroom.id,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    function handleRefresh() {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  
    if (initializing)
      return (
        <View className="items-center justify-center w-screen h-screen bg-white">
          <Image source={require("../assets/load.gif")} />
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
        </View>
      </SafeAreaView>
    );
  };
  
  export default ApplyLeaveStatusScreen;
  