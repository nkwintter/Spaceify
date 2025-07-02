// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import BlobButton from "../components/BlobButton";
// import BottomNav from "../components/BottomNav";
// import { useNavigation } from "@react-navigation/native";
// import { useTheme } from "../context/ThemeContext";
// import Blob01 from "../assets/blob01.svg";
// import Blob02 from "../assets/blob02.svg";
// import Blob03 from "../assets/blob03.svg";
// import Blob04 from "../assets/blob04.svg";
// import Blob05 from "../assets/blob05.svg";
// import Blob06 from "../assets/blob06.svg";
// import Blob07 from "../assets/blob07.svg";

//   const moodLabels = [
//     "nebulosas",
//     "galáxias",
//     "terra",
//     "marte",
//     "lua",
//     "estrelas",
//     "hubble",
//     "eclipse",
//     "saturno",
//     "andromeda",
//   ];

//   const blobComponents = [
//     Blob01,
//     Blob02,
//     Blob03,
//     Blob04,
//     Blob05,
//     Blob06,
//     Blob07,
//     Blob01,
//     Blob02,
//     Blob03,
//   ];

// const gradientKeys = ["primary", "secondary", "tertiary", "quaternary"] as const;

// export default function MoodsScreen() {
//   const navigation = useNavigation<any>();
//   const { theme } = useTheme();

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
//       <View style={styles.header}>
//         <Text style={[
//           styles.title,
//           { color: theme.colors.primary, fontFamily: theme.fonts.bold }
//         ]}>
//           SPACEFY
//         </Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.blobContainer}>
//         {moodLabels.map((label, index) => {
//           const gradientKey = gradientKeys[index % gradientKeys.length];
//           const colors = theme.gradients[gradientKey];
//           const BlobComponent = blobComponents[index % blobComponents.length];
//           return (
//             <View style={styles.blobWrapper} key={label}>
//               <BlobButton
//                 label={label}
//                 colors={colors}
//                 BlobComponent={BlobComponent}
//                 onPress={() => navigation.navigate("Playlist")}
//               />
//             </View>
//           );
//         })}
//       </ScrollView>
//       <BottomNav items={/* ... */} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     alignItems: "center",
//     paddingTop: 24,
//     paddingBottom: 8,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     letterSpacing: 2,
//     // fontFamily e color vêm do Context!
//   },
//   blobContainer: {
//     alignItems: "center",
//     paddingBottom: 80,
//   },
//   blobWrapper: {
//     marginVertical: 12,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import BlobButton from "../components/BlobButton";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

import Blob01 from "../assets/blob01.svg";
import Blob02 from "../assets/blob02.svg";
import Blob03 from "../assets/blob03.svg";
import Blob04 from "../assets/blob04.svg";
import Blob05 from "../assets/blob05.svg";
import Blob06 from "../assets/blob06.svg";
import Blob07 from "../assets/blob07.svg";

const moodLabels = [
  "nebulosas",
  "galáxias",
  "terra",
  "marte",
  "lua",
  "estrelas",
  "hubble",
  "eclipse",
  "saturno",
  "andromeda",
];

const blobComponents = [
  Blob01,
  Blob02,
  Blob03,
  Blob04,
  Blob05,
  Blob06,
  Blob07,
  Blob01,
  Blob02,
  Blob03,
];

const gradientKeys = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
] as const;

export default function MoodsScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.primary },
      ]}
    >
      <View style={styles.header}>
        {/* <Text style={[
          styles.title,
          { color: theme.colors.primary, fontFamily: theme.fonts.bold }
        ]}>
          moods
        </Text> */}
        <Text
          style={[
            styles.title,
            { color: theme.colors.primary, fontFamily: theme.fonts.bold },
          ]}
        >
          moods
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.blobContainer}>
        {moodLabels.map((label, index) => {
          const gradientKey = gradientKeys[index % gradientKeys.length];
          const colors = theme.gradients[gradientKey];
          const BlobComponent = blobComponents[index % blobComponents.length];
          return (
            <View style={styles.blobWrapper} key={label}>
              <BlobButton
                label={label}
                colors={colors}
                BlobComponent={BlobComponent}
                onPress={() => navigation.navigate("Playlist")}
              />
            </View>
          );
        })}
      </ScrollView>
      {/* BottomNav sempre fora do ScrollView! */}
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
    // fontFamily e color vêm do Context!
  },
  blobContainer: {
    alignItems: "center",
    paddingBottom: 80, // espaço para a NavBar
  },
  blobWrapper: {
    marginVertical: 12,
  },
});
