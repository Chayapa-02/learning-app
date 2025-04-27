import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../components/HomeScreen";
import LessonListScreen from "../components/LessonListScreen";
import LessonDetailScreen from "../components/LessonDetailScreen";
import QuizScreen from "../components/QuizScreen";
import QuizResultScreen from "../components/QuizResultScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#5e72e4",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "หน้าหลัก" }}
        />
        <Stack.Screen
          name="LessonList"
          component={LessonListScreen}
          options={{ title: "บทเรียนทั้งหมด" }}
        />
        <Stack.Screen
          name="LessonDetail"
          component={LessonDetailScreen}
          options={({ route }) => ({ title: route.params?.title || "บทเรียน" })}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={({ route }) => ({
            title: `แบบทดสอบ: ${route.params?.lessonTitle}`,
          })}
        />
        <Stack.Screen
          name="QuizResult"
          component={QuizResultScreen}
          options={{ title: "ผลการทดสอบ", headerLeft: null }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
