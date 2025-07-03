// src/components/BlobButton.tsx

// src/components/BlobButton.tsx
import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

type Props = {
  label: string;
  onPress: () => void;
  BlobComponent: React.FC<SvgProps>;
};

export default function BlobButton({ label, onPress, BlobComponent }: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.blobContainer}>
        <BlobComponent width={300} height={120} />
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.regular,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  blobContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
  },
  label: {
    position: "absolute",
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 16,
    width: 120,
    top: "45%",
    left: 0,
    right: 0,
    // fontFamily e color vêm do theme!
  },
});

// import React from "react";
// import { Text, TouchableOpacity, StyleSheet } from "react-native";
// import { SvgProps } from "react-native-svg";
// import { useTheme } from "../../context/ThemeContext/ThemeContext";
// import { LinearGradient } from "expo-linear-gradient";

// type Props = {
//   label: string;
//   onPress: () => void;
//   colors: [string, string];
//   BlobComponent: React.FC<SvgProps>;
// };

// export default function BlobButton({ label, onPress, colors, BlobComponent }) {
//   const { theme } = useTheme();

//   return (
//     <TouchableOpacity
//     style={styles.wrapper}
//     onPress={onPress}
//     activeOpacity={0.85}
//     >
//       <LinearGradient
//         colors={colors}
//         style={styles.gradient}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         >
//         <BlobComponent width={120} height={120} />
//         <Text
//           style={[
//             styles.label,
//             {
//               color: theme.colors.text.primary,
//               fontFamily: theme.fonts.regular,
//             },
//           ]}
//           >
//           {label}
//         </Text>
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 8,
//   },
//   gradient: {
//     borderRadius: 80,
//     padding: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: 140,
//     minHeight: 140,
//   },
//   label: {
//     position: "absolute",
//     fontWeight: "600",
//     fontStyle: "italic",
//     textAlign: "center",
//     fontSize: 16,
//     width: 120,
//     top: "45%",
//     left: 0,
//     right: 0,
//   },
// });
