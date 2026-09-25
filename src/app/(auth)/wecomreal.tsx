// import React, { useEffect, useRef } from "react";
// import {
//   Animated,
//   Easing,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   useWindowDimensions,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// import { darkColors, lightColors } from "@/theme/colors";

// const iconImage = require("@/assets/images/icon.png");

// export default function WelcomeScreen() {
//   const colorScheme = useColorScheme();

//   const colors = colorScheme === "dark" ? darkColors : lightColors;

//   const { height } = useWindowDimensions();

//   const topLeftFloat = useRef(new Animated.Value(0)).current;
//   const topRightFloat = useRef(new Animated.Value(0)).current;
//   const centerFloat = useRef(new Animated.Value(0)).current;
//   const bottomLeftFloat = useRef(new Animated.Value(0)).current;
//   const bottomRightFloat = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const createFloatingAnimation = (
//       animatedValue: Animated.Value,
//       duration: number,
//       distance: number,
//       delay: number,
//     ) => {
//       const animation = Animated.loop(
//         Animated.sequence([
//           Animated.delay(delay),

//           Animated.timing(animatedValue, {
//             toValue: -distance,
//             duration,
//             easing: Easing.inOut(Easing.sin),
//             useNativeDriver: true,
//           }),

//           Animated.timing(animatedValue, {
//             toValue: distance,
//             duration,
//             easing: Easing.inOut(Easing.sin),
//             useNativeDriver: true,
//           }),

//           Animated.timing(animatedValue, {
//             toValue: 0,
//             duration,
//             easing: Easing.inOut(Easing.sin),
//             useNativeDriver: true,
//           }),
//         ]),
//       );

//       animation.start();

//       return animation;
//     };

//     const animation1 = createFloatingAnimation(topLeftFloat, 3000, 5, 0);

//     const animation2 = createFloatingAnimation(topRightFloat, 3400, 6, 250);

//     const animation3 = createFloatingAnimation(centerFloat, 3200, 4, 450);

//     const animation4 = createFloatingAnimation(bottomLeftFloat, 3100, 5, 650);

//     const animation5 = createFloatingAnimation(bottomRightFloat, 3300, 6, 350);

//     return () => {
//       animation1.stop();
//       animation2.stop();
//       animation3.stop();
//       animation4.stop();
//       animation5.stop();
//     };
//   }, [
//     topLeftFloat,
//     topRightFloat,
//     centerFloat,
//     bottomLeftFloat,
//     bottomRightFloat,
//   ]);

//   const isSmallScreen = height < 700;

//   const visualHeight = isSmallScreen ? 310 : 350;

//   const sideSize = isSmallScreen ? 78 : 86;
//   const sideHeight = isSmallScreen ? 88 : 96;

//   const centerSize = isSmallScreen ? 105 : 116;
//   const centerHeight = isSmallScreen ? 113 : 125;

//   return (
//     <SafeAreaView
//       style={[
//         styles.safeArea,
//         {
//           backgroundColor: colors.background,
//         },
//       ]}
//     >
//       <View style={styles.container}>
//         {/* BRAND */}
//         <View style={styles.brand}>
//           <Text
//             style={[
//               styles.brandOne,
//               {
//                 color: colors.primary,
//               },
//             ]}
//           >
//             1
//           </Text>

//           <Text
//             style={[
//               styles.brandGo,
//               {
//                 color: colors.textPrimary,
//               },
//             ]}
//           >
//             Go
//           </Text>
//         </View>

//         {/* SUBTITLE */}
//         <Text
//           style={[
//             styles.subtitle,
//             {
//               color: colors.textSecondary,
//             },
//           ]}
//         >
//           Real People. Live Conversations.
//           {"\n"}
//           New Connections.
//         </Text>

//         {/* VISUAL SECTION */}
//         <View
//           style={[
//             styles.visualArea,
//             {
//               height: visualHeight,
//             },
//           ]}
//         >
//           {/* =========================
//               TOP LEFT
//           ========================= */}
//           <Animated.View
//             style={[
//               styles.personWrapper,
//               {
//                 width: sideSize,
//                 height: sideHeight,
//                 left: 8,
//                 top: 18,
//                 transform: [
//                   {
//                     translateY: topLeftFloat,
//                   },
//                   {
//                     rotate: "-4deg",
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.personFrame,
//                 {
//                   width: sideSize,
//                   height: sideHeight,
//                   backgroundColor: colors.surface,
//                   borderColor: colors.primary,
//                 },
//               ]}
//             >
//               <Image
//                 source={iconImage}
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//             </View>

//             {/* TOP LEFT BUBBLE */}
//             <View
//               style={[
//                 styles.bubble,
//                 styles.topLeftBubble,
//                 {
//                   backgroundColor: colors.surface,
//                   borderColor: colors.border,
//                 },
//               ]}
//             >
//               {/* Speech bubble tail */}
//               <View
//                 style={{
//                   position: "absolute",
//                   left: -7,
//                   top: 20,
//                   width: 14,
//                   height: 14,
//                   backgroundColor: colors.surface,
//                   borderLeftWidth: 1,
//                   borderBottomWidth: 1,
//                   borderLeftColor: colors.border,
//                   borderBottomColor: colors.border,
//                   transform: [{ rotate: "45deg" }],
//                 }}
//               />

//               <View
//                 style={[
//                   styles.onlineRing,
//                   {
//                     borderColor: colors.online,
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.onlineDot,
//                     {
//                       backgroundColor: colors.online,
//                     },
//                   ]}
//                 />
//               </View>

//               <View style={styles.bubbleTextContainer}>
//                 <Text
//                   style={[
//                     styles.bubbleTitle,
//                     {
//                       color: colors.textPrimary,
//                     },
//                   ]}
//                 >
//                   New people
//                 </Text>

//                 <Text
//                   style={[
//                     styles.bubbleText,
//                     {
//                       color: colors.textSecondary,
//                     },
//                   ]}
//                 >
//                   Real conversations
//                 </Text>
//               </View>
//             </View>
//           </Animated.View>

//           {/* =========================
//               TOP RIGHT
//           ========================= */}
//           <Animated.View
//             style={[
//               styles.personWrapper,
//               {
//                 width: sideSize,
//                 height: sideHeight,
//                 right: 8,
//                 top: 42,
//                 transform: [
//                   {
//                     translateY: topRightFloat,
//                   },
//                   {
//                     rotate: "4deg",
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.personFrame,
//                 {
//                   width: sideSize,
//                   height: sideHeight,
//                   backgroundColor: colors.surface,
//                   borderColor: colors.primary,
//                 },
//               ]}
//             >
//               <Image
//                 source={iconImage}
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//             </View>

//             {/* TOP RIGHT BUBBLE */}
//             <View
//               style={[
//                 styles.bubble,
//                 styles.topRightBubble,
//                 {
//                   backgroundColor: colors.primary,
//                   borderColor: colors.primaryPressed,
//                 },
//               ]}
//             >
//               {/* Speech bubble tail */}
//               <View
//                 style={{
//                   position: "absolute",
//                   left: 25,
//                   top: -7,
//                   width: 14,
//                   height: 14,
//                   backgroundColor: colors.primary,
//                   transform: [{ rotate: "45deg" }],
//                 }}
//               />

//               <View style={styles.peopleIcon}>
//                 <Ionicons name="people" size={15} color="#FFFFFF" />
//               </View>

//               <View style={styles.bubbleTextContainer}>
//                 <Text style={styles.whiteTitle}>Different topics</Text>

//                 <Text style={styles.whiteText}>Every day</Text>
//               </View>
//             </View>
//           </Animated.View>

//           {/* =========================
//               CENTER
//           ========================= */}
//           <Animated.View
//             style={[
//               styles.centerWrapper,
//               {
//                 width: centerSize,
//                 height: centerHeight,
//                 marginLeft: -(centerSize / 2),
//                 transform: [
//                   {
//                     translateY: centerFloat,
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.centerFrame,
//                 {
//                   width: centerSize,
//                   height: centerHeight,
//                   backgroundColor: colors.surface,
//                   borderColor: colors.primary,
//                 },
//               ]}
//             >
//               <Image
//                 source={iconImage}
//                 style={styles.centerImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </Animated.View>

//           {/* =========================
//               BOTTOM LEFT
//           ========================= */}
//           <Animated.View
//             style={[
//               styles.personWrapper,
//               {
//                 width: sideSize,
//                 height: sideHeight,
//                 left: 12,
//                 bottom: 10,
//                 transform: [
//                   {
//                     translateY: bottomLeftFloat,
//                   },
//                   {
//                     rotate: "-3deg",
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.personFrame,
//                 {
//                   width: sideSize,
//                   height: sideHeight,
//                   backgroundColor: colors.surface,
//                   borderColor: colors.primary,
//                 },
//               ]}
//             >
//               <Image
//                 source={iconImage}
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//             </View>
//           </Animated.View>

//           {/* =========================
//               BOTTOM RIGHT
//           ========================= */}
//           <Animated.View
//             style={[
//               styles.personWrapper,
//               {
//                 width: sideSize,
//                 height: sideHeight,
//                 right: 10,
//                 bottom: 8,
//                 transform: [
//                   {
//                     translateY: bottomRightFloat,
//                   },
//                   {
//                     rotate: "3deg",
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.personFrame,
//                 {
//                   width: sideSize,
//                   height: sideHeight,
//                   backgroundColor: colors.surface,
//                   borderColor: colors.primary,
//                 },
//               ]}
//             >
//               <Image
//                 source={iconImage}
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//             </View>

//             {/* BOTTOM RIGHT BUBBLE */}
//             <View
//               style={[
//                 styles.bubble,
//                 styles.bottomRightBubble,
//                 {
//                   backgroundColor: colors.surface,
//                   borderColor: colors.border,
//                 },
//               ]}
//             >
//               {/* Speech bubble tail */}
//               <View
//                 style={{
//                   position: "absolute",
//                   right: 25,
//                   top: -7,
//                   width: 14,
//                   height: 14,
//                   backgroundColor: colors.surface,
//                   borderLeftWidth: 1,
//                   borderBottomWidth: 1,
//                   borderLeftColor: colors.border,
//                   borderBottomColor: colors.border,
//                   transform: [{ rotate: "45deg" }],
//                 }}
//               />

//               <View
//                 style={[
//                   styles.locationCircle,
//                   {
//                     backgroundColor: colors.online,
//                   },
//                 ]}
//               >
//                 <Ionicons name="location" size={13} color="#FFFFFF" />
//               </View>

//               <View style={styles.bubbleTextContainer}>
//                 <Text
//                   style={[
//                     styles.bubbleTitle,
//                     {
//                       color: colors.textPrimary,
//                     },
//                   ]}
//                 >
//                   Real people
//                 </Text>

//                 <Text
//                   style={[
//                     styles.bubbleText,
//                     {
//                       color: colors.textSecondary,
//                     },
//                   ]}
//                 >
//                   Nearby
//                 </Text>
//               </View>
//             </View>
//           </Animated.View>
//         </View>

//         {/* MAIN HEADING */}
//         <View style={styles.copy}>
//           <Text
//             style={[
//               styles.heading,
//               {
//                 color: colors.textPrimary,
//               },
//             ]}
//           >
//             Discover{" "}
//             <Text
//               style={{
//                 color: colors.primary,
//               }}
//             >
//               Conversations
//             </Text>
//             {"\n"}
//             Happening Right Now
//           </Text>

//           <Text
//             style={[
//               styles.description,
//               {
//                 color: colors.textSecondary,
//               },
//             ]}
//           >
//             Join live rooms, meet new people, share your
//             {"\n"}
//             thoughts and be part of something real.
//           </Text>
//         </View>

//         {/* FIVE ONBOARDING DOTS */}
//         <View style={styles.pagination}>
//           <View
//             style={[
//               styles.activeDot,
//               {
//                 backgroundColor: colors.primary,
//               },
//             ]}
//           />

//           <View
//             style={[
//               styles.dot,
//               {
//                 backgroundColor: colors.border,
//               },
//             ]}
//           />

//           <View
//             style={[
//               styles.dot,
//               {
//                 backgroundColor: colors.border,
//               },
//             ]}
//           />

//           <View
//             style={[
//               styles.dot,
//               {
//                 backgroundColor: colors.border,
//               },
//             ]}
//           />

//           <View
//             style={[
//               styles.dot,
//               {
//                 backgroundColor: colors.border,
//               },
//             ]}
//           />
//         </View>

//         {/* GET STARTED */}
//         <Pressable
//           onPress={() => router.push("/(auth)/phone")}
//           style={({ pressed }) => [
//             styles.button,
//             {
//               backgroundColor: pressed ? "#1D4ED8" : "#2563EB",
//               opacity: pressed ? 0.92 : 1,
//             },
//           ]}
//         >
//           <Text
//             style={{
//               color: "#FFFFFF",
//               fontSize: 16,
//               fontWeight: "800",
//               marginRight: 8,
//             }}
//           >
//             Get Started
//           </Text>

//           <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 18,
//     paddingTop: 5,
//     paddingBottom: 14,
//   },

//   /* BRAND */

//   brand: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   brandOne: {
//     fontSize: 46,
//     lineHeight: 50,
//     fontWeight: "900",
//     fontStyle: "italic",
//     letterSpacing: -5,
//   },

//   brandGo: {
//     fontSize: 46,
//     lineHeight: 50,
//     fontWeight: "900",
//     letterSpacing: -3,
//     marginLeft: 2,
//   },

//   /* SUBTITLE */

//   subtitle: {
//     marginTop: 8,
//     textAlign: "center",
//     fontSize: 15,
//     lineHeight: 21,
//     fontWeight: "600",
//   },

//   /* VISUAL */

//   visualArea: {
//     width: "100%",
//     marginTop: 8,
//     position: "relative",
//   },

//   personWrapper: {
//     position: "absolute",
//     zIndex: 2,
//   },

//   personFrame: {
//     overflow: "hidden",
//     borderWidth: 1.5,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   image: {
//     width: "82%",
//     height: "82%",
//   },

//   centerWrapper: {
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     marginTop: -50,
//     zIndex: 5,
//   },

//   centerFrame: {
//     overflow: "hidden",
//     borderWidth: 1.7,
//     borderRadius: 23,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   centerImage: {
//     width: "82%",
//     height: "82%",
//   },

//   /* BUBBLES */

//   bubble: {
//     position: "absolute",
//     minHeight: 47,
//     borderRadius: 19,
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     zIndex: 10,
//     elevation: 4,
//   },

//   bubbleTextContainer: {
//     flex: 1,
//   },

//   topLeftBubble: {
//     width: 164,
//     right: -108,
//     top: 43,
//   },

//   topRightBubble: {
//     width: 160,
//     right: -25,
//     bottom: -25,
//   },

//   bottomRightBubble: {
//     width: 158,
//     left: -28,
//     bottom: -27,
//   },

//   /* BUBBLE CONTENT */

//   onlineRing: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     borderWidth: 2.5,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 8,
//   },

//   onlineDot: {
//     width: 9,
//     height: 9,
//     borderRadius: 5,
//   },

//   peopleIcon: {
//     width: 25,
//     height: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 7,
//   },

//   locationCircle: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 8,
//   },

//   bubbleTitle: {
//     fontSize: 11.5,
//     lineHeight: 15,
//     fontWeight: "800",
//   },

//   bubbleText: {
//     fontSize: 10.5,
//     lineHeight: 14,
//     marginTop: 1,
//   },

//   whiteTitle: {
//     color: "#FFFFFF",
//     fontSize: 11.5,
//     lineHeight: 15,
//     fontWeight: "800",
//   },

//   whiteText: {
//     color: "#E5E7EB",
//     fontSize: 10.5,
//     lineHeight: 14,
//     marginTop: 1,
//   },

//   /* COPY */

//   copy: {
//     alignItems: "center",
//     paddingHorizontal: 4,
//   },

//   heading: {
//     textAlign: "center",
//     fontSize: 27,
//     lineHeight: 32,
//     fontWeight: "900",
//     letterSpacing: -1,
//   },

//   description: {
//     textAlign: "center",
//     marginTop: 13,
//     fontSize: 13.5,
//     lineHeight: 20,
//     fontWeight: "500",
//   },

//   /* DOTS */

//   pagination: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 18,
//   },

//   activeDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 4,
//   },

//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },

//   /* BUTTON */

//   button: {
//     height: 48,
//     borderRadius: 24,
//     marginTop: 18,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
