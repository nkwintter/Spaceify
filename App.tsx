import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/context/ThemeContext";
import HomeScreenPlaceholder from "./src/screens/HomeScreenPlaceholder";
import MoodsScreen from "./src/screens/MoodsScreen";
import PlaylistScreenPlaceholder from "./src/screens/PlaylistScreenPlaceholder";
import DetailsScreenPlaceholder from "./src/screens/DetailsScreenPlaceholder";
import ProfilePlaceholder from "./src/screens/ProfileScreenPlaceholder";
import type { RootStackParamList } from "./src/navigation/types";
import { useFonts, Tomorrow_400Regular, Tomorrow_700Bold } from "@expo-google-fonts/tomorrow";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Tomorrow_400Regular,
    Tomorrow_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00A8FF" size="large" />
      </View>
    );
  }
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreenPlaceholder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreenPlaceholder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Moods"
            component={MoodsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistScreenPlaceholder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfilePlaceholder}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}