import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import TasmikBalanceCard from "../components/TasmikBalanceCard";

const TasmikBalanceScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [tasmikSessions, setTasmikSessions] = useState([]);
  const [attendedCount, setAttendedCount] = useState("");

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
      let count = 0;

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

        let status = "none";
        if (attendanceDoc.exists()) {
          status = attendanceDoc.data().status;
        }

        if (status === "Attended") {
          count++;
        }

        sessionData.push({
          id: sessionId,
          ...docSnap.data(),
          status: status !== "none" ? status : "none",
        });
      }

      setTasmikSessions(sessionData);
      setAttendedCount(count);
    } catch (error) {
      console.log(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    if (user && isFocused) {
      getTasmikSessions();
    }
  }, [user, isFocused]);

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
            Tasmik Balance
          </Text>
        </View>

        {/* Content */}
        <View className="bg-[#F1F5F8] pt-2">
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            className="px-5 space-y-2 bg-[#F1F5F8] h-full"
          >
            <View className="flex-row justify-between items-center mx-2">
              <Text className="text-[#212529] font-bold text-lg py-2">
                Total Tasmik Attended:{" "}
              </Text>
              <Text className="text-[#826aed] font-bold text-xl py-2">
                {attendedCount}
                <Text className="text-[#6c757d] font-bold text-xl py-2">
                  /{tasmikSessions.length}
                </Text>
              </Text>
            </View>

            {tasmikSessions.map((session) => (
              <TasmikBalanceCard
                key={session.id}
                title={session.title}
                date={session.date}
                status={session.status}
              />
            ))}
            <View className="my-20"></View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TasmikBalanceScreen;
