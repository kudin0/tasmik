import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Announcement"
            component={AnnouncementScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AnnounceDetail"
            component={AnnounceDetailScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="Tasmik"
            component={TasmikScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TasmikDetail"
            component={TasmikDetailScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReportDetail"
            component={ReportDetailScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
