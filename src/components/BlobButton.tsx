// src/components/BlobButton.tsx
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  label: string;
  onPress: () => void;
  colors: [string, string];
  BlobComponent: React.FC<SvgProps>;
};

export default function BlobButton({ label, onPress, colors, BlobComponent }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
    style={styles.wrapper}
    onPress={onPress}
    activeOpacity={0.85}
    >
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <BlobComponent width={120} height={120} />
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
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  gradient: {
    borderRadius: 80,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 140,
    minHeight: 140,
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
  },
});

// <TouchableOpacity style={styles.wrapper} onPress={onPress}>
//   <BlobComponent width={600} height={400} />
//   <Text
//     style={[
//       styles.label,
//       {
//         color: theme.colors.text.primary,
//         fontFamily: theme.fonts.regular,
//       },
//     ]}
//   >
//     {label}
//   </Text>
// </TouchableOpacity>
//     --------------
//     <TouchableOpacity onPress={onPress}>
//       <LinearGradient colors={colors} style={{ borderRadius: 60, padding: 10 }}>
//         <BlobComponent width={120} height={120} />
//         <Text style={{ fontFamily: theme.fonts.regular }}>{label}</Text>
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// }
/* <Text
  style={{
    ...styles.label,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.regular,
  }}
>
  {label}
</Text> */

// const styles = StyleSheet.create({
  //   wrapper: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginVertical: 8,
    //   },
    //   gradient: {
      //     borderRadius: 60,
      //     padding: 10,
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      //   label: {
        //     position: "absolute",
        //     fontFamily: "Tomorrow_400Regular",
        //     fontWeight: "600",
//     fontStyle: "italic",
//     textAlign: "center",
//     fontSize: 16,
//   },
// });
