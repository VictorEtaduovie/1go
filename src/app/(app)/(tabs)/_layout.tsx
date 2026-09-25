// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useColorScheme } from "react-native";

// import { darkColors, lightColors } from "@/theme/colors";

// export default function TabsLayout() {
//   const colorScheme = useColorScheme();
//   const colors = colorScheme === "dark" ? darkColors : lightColors;

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.muted,
//         tabBarStyle: {
//           backgroundColor: colors.surface,
//           borderTopColor: colors.border,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="rooms"
//         options={{
//           title: "Rooms",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="chatbubbles-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="chats"
//         options={{
//           title: "Chats",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons
//               name="chatbubble-ellipses-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
