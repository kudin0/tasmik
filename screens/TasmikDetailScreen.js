import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import StudentsListCard from "../components/StudentListCard";

const TasmikDetailScreen = () => {
  const navigation = useNavigation();

  const {
    params: { id, title, date, time, place, details, classroom },
  } = useRoute();

  const [user, setUser] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        setUser(snapshot.data());
      } else {
        console.log("User does not exists");
      }
    });
  }, []);

  const getStudents = async () => {
    const q = query(
      collection(db, "users"),
      where("type", "==", "student"),
      where("classroom", "==", user.classroom)
    );
    try {
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudents(filteredData);
      if (initializing) {
        setInitializing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getStudents();
    }
  }, [user]);

  const StudentsList = () => {
    return (
      <View className="px-5 pt-3 space-y-3 h-full">
        <Text className="text-[#6c757d] text-lg">List of Students</Text>
        <ScrollView>
          {students.map((student) => (
            <StudentsListCard
              key={student.id}
              id={student.id}
              name={student.name}
              matric={student.matric}
              sessionTitle={title}
              sessionId={id}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  if (initializing)
    return (
      <View className="items-center justify-center w-screen h-screen bg-white">
        <ActivityIndicator size="large" color="826aed" />
      </View>
    );

  return (
    <>
      <SafeAreaView
        className="bg-white h-full"
        style={SafeViewAndroid.AndroidSafeArea}
      >
        {/* Header */}
        <View className="flex-row relative bg-white items-center justify-center border-b border-gray-300 py-4">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute left-5 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#212529" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold text-[#212529]">
            Tasmik Details
          </Text>
        </View>

        <View className="mx-5 pt-3 space-y-3">
          <Text className=" text-xl font-bold text-[#826aed]">{title}</Text>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Date & Time</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {date} at {time}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Place</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {place}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-[#6c757d] text-lg">Surah/ Juzu'</Text>
            <Text className="text-[#212529] text-lg font-semibold">
              {details}
            </Text>
          </View>
        </View>

        {user.type === "lecturer" ? <StudentsList /> : null}
      </SafeAreaView>
    </>
  );
};

export default TasmikDetailScreen;
