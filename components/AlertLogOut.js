import { View, Text, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AlertLogOut = () => {
  const navigation = useNavigation();
  return Alert.alert("Log Out", "Are you sure you want to log out?", [
    {
      text: "Cancel",
      onPress: () => navigation.navigate("LogIn"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

export default AlertLogOut;
