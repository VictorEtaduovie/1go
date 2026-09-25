// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   useColorScheme,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { darkColors, lightColors } from "@/theme/colors";

// export default function OTPScreen() {
//   const colorScheme = useColorScheme();

//   const colors = colorScheme === "dark" ? darkColors : lightColors;

//   const isDark = colorScheme === "dark";

//   const [code, setCode] = useState("");
//   const [seconds, setSeconds] = useState(45);

//   const inputRef = useRef<TextInput>(null);

//   useEffect(() => {
//     if (seconds <= 0) {
//       return;
//     }

//     const timer = setInterval(() => {
//       setSeconds((current) => current - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [seconds]);

//   const isComplete = code.length === 6;

//   const handleVerify = () => {
//     if (!isComplete) {
//       if (__DEV__) {
//         console.log("[1Go OTP] Verification blocked - code is incomplete.");
//       }

//       return;
//     }

//     if (__DEV__) {
//       console.log("[1Go OTP] Verification code entered.");
//       console.log("[1Go OTP] Navigating to /onboarding/name.");
//     }

//     router.push("/onboarding/name");
//   };

//   const handleResend = () => {
//     if (seconds > 0) {
//       return;
//     }

//     if (__DEV__) {
//       console.log("[1Go OTP] Resending verification code.");
//     }

//     setSeconds(45);
//     setCode("");

//     requestAnimationFrame(() => {
//       inputRef.current?.focus();
//     });
//   };

//   const focusCodeInput = () => {
//     inputRef.current?.focus();
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.safeArea,
//         {
//           backgroundColor: colors.background,
//         },
//       ]}
//     >
//       <KeyboardAvoidingView
//         style={styles.keyboard}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 12}
//       >
//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           keyboardDismissMode={
//             Platform.OS === "ios" ? "interactive" : "on-drag"
//           }
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.container}>
//             {/* Top navigation */}
//             <View style={styles.topBar}>
//               <Pressable
//                 onPress={() => {
//                   if (__DEV__) {
//                     console.log("[1Go OTP] Back pressed.");
//                   }

//                   router.back();
//                 }}
//                 hitSlop={10}
//                 style={({ pressed }) => [
//                   styles.backButton,
//                   {
//                     borderColor: colors.border,
//                     backgroundColor: isDark
//                       ? "rgba(255,255,255,0.035)"
//                       : "rgba(255,255,255,0.72)",
//                     opacity: pressed ? 0.65 : 1,
//                   },
//                 ]}
//               >
//                 <Ionicons
//                   name="arrow-back"
//                   size={18}
//                   color={colors.textPrimary}
//                 />
//               </Pressable>

//               <View style={styles.brandRow}>
//                 <View
//                   style={[
//                     styles.brandMark,
//                     {
//                       backgroundColor: colors.primary,
//                     },
//                   ]}
//                 >
//                   <Text style={styles.brandNumber}>1</Text>
//                 </View>

//                 <Text
//                   style={[
//                     styles.brandName,
//                     {
//                       color: colors.textPrimary,
//                     },
//                   ]}
//                 >
//                   1Go
//                 </Text>
//               </View>

//               <View style={styles.topBarSpacer} />
//             </View>

//             {/* Content */}
//             <View style={styles.content}>
//               <Text
//                 style={[
//                   styles.eyebrow,
//                   {
//                     color: colors.primary,
//                   },
//                 ]}
//               >
//                 VERIFY YOUR NUMBER
//               </Text>

//               <Text
//                 style={[
//                   styles.title,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 Enter your code
//               </Text>

//               <Text
//                 style={[
//                   styles.description,
//                   {
//                     color: colors.textSecondary,
//                   },
//                 ]}
//               >
//                 Enter the 6-digit code we sent to your phone number.
//               </Text>

//               {/* Verification code */}
//               <Pressable onPress={focusCodeInput} style={styles.codeArea}>
//                 <View style={styles.codeRow}>
//                   {Array.from({ length: 6 }).map((_, index) => {
//                     const digit = code[index];
//                     const isActive = index === code.length;

//                     return (
//                       <View
//                         key={index}
//                         style={[
//                           styles.codeBox,
//                           {
//                             borderColor: isActive
//                               ? colors.primary
//                               : colors.inputBorder,
//                             backgroundColor: colors.inputBackground,
//                           },
//                         ]}
//                       >
//                         <Text
//                           style={[
//                             styles.codeDigit,
//                             {
//                               color: colors.textPrimary,
//                             },
//                           ]}
//                         >
//                           {digit || ""}
//                         </Text>
//                       </View>
//                     );
//                   })}
//                 </View>

//                 <TextInput
//                   ref={inputRef}
//                   value={code}
//                   onChangeText={(value) => {
//                     const cleaned = value.replace(/\D/g, "").slice(0, 6);

//                     setCode(cleaned);

//                     if (__DEV__) {
//                       console.log("[1Go OTP] Code length:", cleaned.length);
//                     }
//                   }}
//                   keyboardType="number-pad"
//                   maxLength={6}
//                   autoFocus
//                   caretHidden
//                   style={styles.hiddenInput}
//                   textContentType="oneTimeCode"
//                   autoComplete="sms-otp"
//                   selectionColor={colors.primary}
//                   onSubmitEditing={handleVerify}
//                 />
//               </Pressable>

//               {/* Resend */}
//               <View style={styles.resendRow}>
//                 <Text
//                   style={[
//                     styles.resendText,
//                     {
//                       color: colors.textSecondary,
//                     },
//                   ]}
//                 >
//                   Didn’t receive it?
//                 </Text>

//                 <Pressable
//                   onPress={handleResend}
//                   disabled={seconds > 0}
//                   hitSlop={8}
//                 >
//                   <Text
//                     style={[
//                       styles.resendAction,
//                       {
//                         color:
//                           seconds > 0 ? colors.disabledText : colors.primary,
//                       },
//                     ]}
//                   >
//                     {seconds > 0
//                       ? `Resend in 0:${String(seconds).padStart(2, "0")}`
//                       : "Resend code"}
//                   </Text>
//                 </Pressable>
//               </View>
//             </View>

//             {/* Footer */}
//             <View style={styles.footer}>
//               <Pressable
//                 onPress={handleVerify}
//                 disabled={!isComplete}
//                 style={({ pressed }) => [
//                   styles.continueButton,
//                   {
//                     backgroundColor: isComplete
//                       ? colors.primary
//                       : colors.disabledBackground,
//                     opacity: pressed && isComplete ? 0.9 : 1,
//                     transform: [
//                       {
//                         scale: pressed && isComplete ? 0.985 : 1,
//                       },
//                     ],
//                   },
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.continueText,
//                     {
//                       color: isComplete ? "#FFFFFF" : colors.disabledText,
//                     },
//                   ]}
//                 >
//                   Verify number
//                 </Text>

//                 <View
//                   style={[
//                     styles.continueIcon,
//                     {
//                       backgroundColor: isComplete
//                         ? "rgba(255,255,255,0.15)"
//                         : isDark
//                           ? "rgba(255,255,255,0.04)"
//                           : "rgba(15,23,42,0.04)",
//                     },
//                   ]}
//                 >
//                   <Ionicons
//                     name="arrow-forward"
//                     size={17}
//                     color={isComplete ? "#FFFFFF" : colors.disabledText}
//                   />
//                 </View>
//               </Pressable>

//               <Text
//                 style={[
//                   styles.footerText,
//                   {
//                     color: colors.disabledText,
//                   },
//                 ]}
//               >
//                 Your verification code is private and secure.
//               </Text>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },

//   keyboard: {
//     flex: 1,
//   },

//   scrollView: {
//     flex: 1,
//   },

//   scrollContent: {
//     flexGrow: 1,
//   },

//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: 18,
//   },

//   /* Top bar */

//   topBar: {
//     height: 42,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   brandRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   brandMark: {
//     width: 28,
//     height: 28,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   brandNumber: {
//     color: "#FFFFFF",
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   brandName: {
//     fontSize: 17,
//     fontWeight: "800",
//     letterSpacing: -0.4,
//   },

//   topBarSpacer: {
//     width: 40,
//   },

//   /* Content */

//   content: {
//     flex: 1,
//     justifyContent: "center",
//     paddingBottom: 45,
//   },

//   eyebrow: {
//     fontSize: 10,
//     lineHeight: 15,
//     fontWeight: "800",
//     letterSpacing: 1.8,
//   },

//   title: {
//     marginTop: 11,
//     fontSize: 34,
//     lineHeight: 40,
//     fontWeight: "800",
//     letterSpacing: -1.35,
//   },

//   description: {
//     marginTop: 12,
//     maxWidth: 340,
//     fontSize: 15,
//     lineHeight: 23,
//   },

//   /* Code */

//   codeArea: {
//     marginTop: 38,
//   },

//   codeRow: {
//     flexDirection: "row",
//     gap: 8,
//   },

//   codeBox: {
//     flex: 1,
//     height: 58,
//     borderRadius: 16,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   codeDigit: {
//     fontSize: 21,
//     fontWeight: "700",
//   },

//   hiddenInput: {
//     position: "absolute",
//     width: 1,
//     height: 1,
//     opacity: 0,
//   },

//   resendRow: {
//     marginTop: 22,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   resendText: {
//     fontSize: 12,
//   },

//   resendAction: {
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   /* Footer */

//   footer: {
//     paddingTop: 12,
//   },

//   continueButton: {
//     height: 58,
//     borderRadius: 29,
//     paddingLeft: 21,
//     paddingRight: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   continueText: {
//     fontSize: 15.5,
//     fontWeight: "800",
//     letterSpacing: -0.1,
//   },

//   continueIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   footerText: {
//     marginTop: 11,
//     textAlign: "center",
//     fontSize: 10.5,
//     lineHeight: 16,
//   },
// });
