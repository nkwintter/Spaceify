import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import Profile from './src/screens/profile/Profile';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Profile />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}