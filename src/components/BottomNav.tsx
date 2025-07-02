// // src/components/BottomNav.tsx
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useTheme } from "../context/ThemeContext";
// import {
//   RocketIcon,
//   AlienIcon,
//   SpiralIcon,
//   FlyingSaucerIcon,
// } from "phosphor-react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// const icons = {
//   rocket: RocketIcon,
//   alien: AlienIcon,
//   spiral: SpiralIcon,
//   flying: FlyingSaucerIcon,
// };

// export default function BottomNav() {
//   const { theme } = useTheme();
//   const navigation = useNavigation<any>();
//   const route = useRoute();

//   const navItems = [
//     {
//       iconName: "rocket",
//       label: "Explore",
//       route: "Home",
//     },
//     {
//       iconName: "alien",
//       label: "Imagens",
//       route: "Details",
//     },
//     {
//       iconName: "spiral",
//       label: "Moods",
//       route: "Moods",
//     },
//     {
//       iconName: "flying",
//       label: "Perfil",
//       route: "Profile",
//     },
//   ];

//   return (
//     <View style={{...styles.container,  backgroundColor: theme.colors.background.primary }}>
//       {navItems.map((item) => {
//         const IconComponent = icons[item.iconName as keyof typeof icons];
//         const isActive = route.name === item.route;
//         return (
//           <TouchableOpacity
//             key={item.label}
//             style={styles.button}
//             // onPress={() => navigation.navigate(item.route)}
//           >
//             {IconComponent && (
//               <IconComponent
//                 size={24}
//                 color={isActive ? theme.colors.primary : "#888"}
//                 weight={isActive ? "fill" : "regular"}
//               />
//             )}
//             <Text
//               style={[
//                 styles.label,
//                 {
//                   color: isActive ? theme.colors.primary : "#888",
//                   fontFamily: theme.fonts.regular,
//                 },
//               ]}
//             >
//               {item.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     height: 64,
//     borderTopWidth: 1,
//     borderTopColor: "#222",
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 10,
//     // backgroundColor vem do theme!
//   },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   label: {
//     fontSize: 12,
//     marginTop: 4,
//   },
// });
