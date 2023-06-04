import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import LogInScreen from "./screens/LogInScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import AnnounceDetailScreen from "./screens/AnnounceDetailScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import TasmikScreen from "./screens/TasmikScreen";
import TasmikDetailScreen from "./screens/TasmikDetailScreen";
import ReportScreen from "./screens/ReportScreen";
import ReportDetailScreen from "./screens/ReportDetailScreen";
import { auth } from "./firebase";
import TasmikPastScreen from "./screens/TasmikPastScreen";
import ApplyLeaveScreen from "./screens/ApplyLeaveScreen";
import ApplyLeaveStatusScreen from "./screens/ApplyLeaveStatusScreen";
import ApplyLeaveDetailsScreen from "./screens/ApplyLeaveDetailsScreen";
import LeaveApplicationScreen from "./screens/LeaveApplicationScreen";
import TasmikGradingScreen from "./screens/TasmikGradingScreen";
import AnnounceWriteScreen from "./screens/AnnounceWriteScreen";
import TasmikLecturerScreen from "./screens/TasmikLecturerScreen";
import ReportLecturerScreen from "./screens/ReportLecturerScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="Announcement"
        component={AnnouncementScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="AnnounceWrite"
        component={AnnounceWriteScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="AnnounceDetail"
        component={AnnounceDetailScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="Tasmik"
        component={TasmikScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="TasmikPast"
        component={TasmikPastScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="TasmikLecturer"
        component={TasmikLecturerScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="TasmikDetail"
        component={TasmikDetailScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="TasmikGrading"
        component={TasmikGradingScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="ReportLecturer"
        component={ReportLecturerScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="ApplyLeave"
        component={ApplyLeaveScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="LeaveApplication"
        component={LeaveApplicationScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="ApplyLeaveStatus"
        component={ApplyLeaveStatusScreen}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="ApplyLeaveDetails"
        component={ApplyLeaveDetailsScreen}
        options={{ headerShown: false, animation: "none" }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  );
};
