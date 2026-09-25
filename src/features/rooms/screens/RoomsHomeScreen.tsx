// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   useColorScheme,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// import { darkColors, lightColors } from "@/theme/colors";
// import { mockRooms, Room } from "@/features/rooms/mockRooms";

// const brand = "#C85A4B";

// const categories = [
//   { id: "all", label: "All" },
//   { id: "nearby", label: "Nearby" },
//   { id: "life", label: "Life" },
//   { id: "music", label: "Music" },
//   { id: "career", label: "Career" },
//   { id: "fun", label: "Fun" },
//   { id: "random", label: "Random" },
// ];

// export default function RoomsHomeScreen() {
//   const colorScheme = useColorScheme();
//   const colors = colorScheme === "dark" ? darkColors : lightColors;
//   const isDark = colorScheme === "dark";

//   const liveRooms = mockRooms.slice(0, 3);

//   const recommendedRooms = mockRooms.filter((room) =>
//     ["Life", "Music", "Career"].includes(room.category),
//   );

//   const renderParticipantStack = (room: Room) => (
//     <View style={styles.participantStack}>
//       {room.participantInitials.slice(0, 3).map((initials, index) => (
//         <View
//           key={`${room.id}-${initials}`}
//           style={[
//             styles.participant,
//             {
//               marginLeft: index === 0 ? 0 : -8,
//               backgroundColor:
//                 index === 0
//                   ? brand
//                   : index === 1
//                     ? isDark
//                       ? "#596472"
//                       : "#CBD2D9"
//                     : isDark
//                       ? "#737D88"
//                       : "#DDE2E7",
//               borderColor: colors.surface,
//             },
//           ]}
//         >
//           <Text
//             style={[
//               styles.participantText,
//               {
//                 color: index === 0 || isDark ? "#FFFFFF" : "#334155",
//               },
//             ]}
//           >
//             {initials}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );

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
//         <View pointerEvents="none" style={StyleSheet.absoluteFill}>
//           <View
//             style={[
//               styles.backgroundGlow,
//               {
//                 backgroundColor: isDark
//                   ? "rgba(200,90,75,0.055)"
//                   : "rgba(200,90,75,0.035)",
//               },
//             ]}
//           />
//         </View>

//         {/* Header */}
//         <View style={styles.header}>
//           <View>
//             <Text
//               style={[
//                 styles.greeting,
//                 {
//                   color: colors.textSecondary,
//                 },
//               ]}
//             >
//               YOUR 1GO
//             </Text>

//             <Text
//               style={[
//                 styles.headerTitle,
//                 {
//                   color: colors.textPrimary,
//                 },
//               ]}
//             >
//               Find your room.
//             </Text>
//           </View>

//           <View style={styles.headerActions}>
//             <Pressable
//               hitSlop={8}
//               style={[
//                 styles.headerButton,
//                 {
//                   borderColor: colors.border,
//                   backgroundColor: isDark
//                     ? "rgba(255,255,255,0.03)"
//                     : "rgba(255,255,255,0.72)",
//                 },
//               ]}
//               onPress={() => {}}
//             >
//               <Ionicons
//                 name="notifications-outline"
//                 size={19}
//                 color={colors.textPrimary}
//               />
//               <View
//                 style={[
//                   styles.notificationDot,
//                   {
//                     backgroundColor: brand,
//                   },
//                 ]}
//               />
//             </Pressable>

//             <Pressable
//               hitSlop={8}
//               style={[
//                 styles.profileButton,
//                 {
//                   backgroundColor: brand,
//                 },
//               ]}
//               onPress={() => {}}
//             >
//               <Text style={styles.profileInitial}>V</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Search */}
//         <Pressable
//           style={[
//             styles.searchBar,
//             {
//               backgroundColor: isDark
//                 ? "rgba(255,255,255,0.035)"
//                 : "rgba(255,255,255,0.78)",
//               borderColor: colors.border,
//             },
//           ]}
//           onPress={() => {}}
//         >
//           <Ionicons name="search-outline" size={19} color={colors.muted} />

//           <Text
//             style={[
//               styles.searchPlaceholder,
//               {
//                 color: colors.muted,
//               },
//             ]}
//           >
//             Search rooms, people or topics
//           </Text>

//           <Ionicons
//             name="options-outline"
//             size={18}
//             color={colors.textSecondary}
//           />
//         </Pressable>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Live now */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text
//                 style={[
//                   styles.sectionEyebrow,
//                   {
//                     color: brand,
//                   },
//                 ]}
//               >
//                 HAPPENING NOW
//               </Text>

//               <Text
//                 style={[
//                   styles.sectionTitle,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 Live now
//               </Text>
//             </View>

//             <Pressable hitSlop={8}>
//               <Text
//                 style={[
//                   styles.seeAll,
//                   {
//                     color: colors.textSecondary,
//                   },
//                 ]}
//               >
//                 See all
//               </Text>
//             </Pressable>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.liveRow}
//           >
//             {liveRooms.map((room) => (
//               <Pressable
//                 key={room.id}
//                 style={({ pressed }) => [
//                   styles.liveCard,
//                   {
//                     backgroundColor: isDark ? "rgba(17,21,34,0.88)" : "#FFFFFF",
//                     borderColor: colors.border,
//                     opacity: pressed ? 0.9 : 1,
//                     transform: [
//                       {
//                         scale: pressed ? 0.985 : 1,
//                       },
//                     ],
//                   },
//                 ]}
//                 onPress={() => {}}
//               >
//                 <View style={styles.liveCardTop}>
//                   <View style={styles.liveStatus}>
//                     <View
//                       style={[
//                         styles.liveDot,
//                         {
//                           backgroundColor: brand,
//                         },
//                       ]}
//                     />

//                     <Text
//                       style={[
//                         styles.liveStatusText,
//                         {
//                           color: colors.textSecondary,
//                         },
//                       ]}
//                     >
//                       LIVE
//                     </Text>
//                   </View>

//                   <Text
//                     style={[
//                       styles.liveCount,
//                       {
//                         color: colors.textSecondary,
//                       },
//                     ]}
//                   >
//                     {room.participants}
//                   </Text>
//                 </View>

//                 <View
//                   style={[
//                     styles.liveVisual,
//                     {
//                       backgroundColor: isDark
//                         ? "rgba(200,90,75,0.08)"
//                         : "rgba(200,90,75,0.055)",
//                     },
//                   ]}
//                 >
//                   <View
//                     style={[
//                       styles.liveVisualLine,
//                       styles.liveVisualLineOne,
//                       {
//                         backgroundColor: isDark
//                           ? "rgba(255,255,255,0.09)"
//                           : "rgba(15,23,42,0.08)",
//                       },
//                     ]}
//                   />

//                   <View
//                     style={[
//                       styles.liveVisualLine,
//                       styles.liveVisualLineTwo,
//                       {
//                         backgroundColor: isDark
//                           ? "rgba(255,255,255,0.07)"
//                           : "rgba(15,23,42,0.07)",
//                       },
//                     ]}
//                   />

//                   <View
//                     style={[
//                       styles.liveVisualPoint,
//                       {
//                         backgroundColor: brand,
//                       },
//                     ]}
//                   />
//                 </View>

//                 <Text
//                   numberOfLines={1}
//                   style={[
//                     styles.liveCardTitle,
//                     {
//                       color: colors.textPrimary,
//                     },
//                   ]}
//                 >
//                   {room.title}
//                 </Text>

//                 <Text
//                   numberOfLines={1}
//                   style={[
//                     styles.liveCardMeta,
//                     {
//                       color: colors.textSecondary,
//                     },
//                   ]}
//                 >
//                   {room.category} · {room.location}
//                 </Text>
//               </Pressable>
//             ))}
//           </ScrollView>

//           {/* For you */}
//           <View style={[styles.sectionHeader, styles.forYouHeader]}>
//             <View>
//               <Text
//                 style={[
//                   styles.sectionEyebrow,
//                   {
//                     color: brand,
//                   },
//                 ]}
//               >
//                 BASED ON YOUR INTERESTS
//               </Text>

//               <Text
//                 style={[
//                   styles.sectionTitle,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 For you
//               </Text>
//             </View>
//           </View>

//           <View style={styles.recommendations}>
//             {recommendedRooms.map((room) => (
//               <Pressable
//                 key={room.id}
//                 onPress={() => {}}
//                 style={({ pressed }) => [
//                   styles.roomRow,
//                   {
//                     borderBottomColor: colors.border,
//                     opacity: pressed ? 0.75 : 1,
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.roomMark,
//                     {
//                       backgroundColor: `${room.accent}18`,
//                     },
//                   ]}
//                 >
//                   <View
//                     style={[
//                       styles.roomMarkInner,
//                       {
//                         backgroundColor: room.accent,
//                       },
//                     ]}
//                   />
//                 </View>

//                 <View style={styles.roomBody}>
//                   <View style={styles.roomNameRow}>
//                     <Text
//                       numberOfLines={1}
//                       style={[
//                         styles.roomName,
//                         {
//                           color: colors.textPrimary,
//                         },
//                       ]}
//                     >
//                       {room.title}
//                     </Text>

//                     {room.isTrending && (
//                       <Text
//                         style={[
//                           styles.trendingText,
//                           {
//                             color: brand,
//                           },
//                         ]}
//                       >
//                         TRENDING
//                       </Text>
//                     )}
//                   </View>

//                   <Text
//                     numberOfLines={1}
//                     style={[
//                       styles.roomDescription,
//                       {
//                         color: colors.textSecondary,
//                       },
//                     ]}
//                   >
//                     {room.description}
//                   </Text>

//                   <View style={styles.roomMetaRow}>
//                     {renderParticipantStack(room)}

//                     <Text
//                       style={[
//                         styles.roomParticipants,
//                         {
//                           color: colors.muted,
//                         },
//                       ]}
//                     >
//                       {room.participants} people
//                     </Text>

//                     <View
//                       style={[
//                         styles.metaSeparator,
//                         {
//                           backgroundColor: colors.border,
//                         },
//                       ]}
//                     />

//                     <Text
//                       style={[
//                         styles.roomLocation,
//                         {
//                           color: colors.muted,
//                         },
//                       ]}
//                     >
//                       {room.location}
//                     </Text>
//                   </View>
//                 </View>

//                 <Ionicons
//                   name="chevron-forward"
//                   size={17}
//                   color={colors.muted}
//                 />
//               </Pressable>
//             ))}
//           </View>

//           {/* Categories */}
//           <View style={[styles.sectionHeader, styles.categoryHeader]}>
//             <View>
//               <Text
//                 style={[
//                   styles.sectionEyebrow,
//                   {
//                     color: brand,
//                   },
//                 ]}
//               >
//                 EXPLORE
//               </Text>

//               <Text
//                 style={[
//                   styles.sectionTitle,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 Find your kind of conversation
//               </Text>
//             </View>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.categoryRow}
//           >
//             {categories.map((category, index) => (
//               <Pressable
//                 key={category.id}
//                 style={[
//                   styles.categoryItem,
//                   {
//                     borderBottomColor: index === 0 ? brand : colors.border,
//                   },
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.categoryText,
//                     {
//                       color:
//                         index === 0 ? colors.textPrimary : colors.textSecondary,
//                     },
//                   ]}
//                 >
//                   {category.label}
//                 </Text>
//               </Pressable>
//             ))}
//           </ScrollView>

//           {/* Create room */}
//           <Pressable
//             onPress={() => {}}
//             style={({ pressed }) => [
//               styles.createRoom,
//               {
//                 borderColor: colors.border,
//                 backgroundColor: isDark
//                   ? "rgba(255,255,255,0.025)"
//                   : "rgba(255,255,255,0.72)",
//                 opacity: pressed ? 0.8 : 1,
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.createIcon,
//                 {
//                   backgroundColor: brand,
//                 },
//               ]}
//             >
//               <Ionicons name="add" size={19} color="#FFFFFF" />
//             </View>

//             <View style={styles.createBody}>
//               <Text
//                 style={[
//                   styles.createTitle,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 Start a room
//               </Text>

//               <Text
//                 style={[
//                   styles.createDescription,
//                   {
//                     color: colors.textSecondary,
//                   },
//                 ]}
//               >
//                 Start a conversation of your own.
//               </Text>
//             </View>

//             <Ionicons name="arrow-forward" size={18} color={colors.muted} />
//           </Pressable>
//         </ScrollView>
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
//   },

//   backgroundGlow: {
//     position: "absolute",
//     width: 260,
//     height: 260,
//     borderRadius: 260,
//     top: -170,
//     right: -120,
//   },

//   /* Header */

//   header: {
//     paddingHorizontal: 24,
//     paddingTop: 8,
//     paddingBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   greeting: {
//     fontSize: 9,
//     fontWeight: "800",
//     letterSpacing: 1.6,
//   },

//   headerTitle: {
//     marginTop: 6,
//     fontSize: 28,
//     lineHeight: 33,
//     fontWeight: "800",
//     letterSpacing: -1.1,
//   },

//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 9,
//   },

//   headerButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   notificationDot: {
//     position: "absolute",
//     width: 5,
//     height: 5,
//     borderRadius: 5,
//     top: 8,
//     right: 8,
//   },

//   profileButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   profileInitial: {
//     color: "#FFFFFF",
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   /* Search */

//   searchBar: {
//     height: 52,
//     marginHorizontal: 24,
//     borderRadius: 14,
//     borderWidth: 1,
//     paddingHorizontal: 15,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   searchPlaceholder: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 13,
//   },

//   /* Scroll */

//   scrollContent: {
//     paddingTop: 29,
//     paddingBottom: 35,
//   },

//   sectionHeader: {
//     paddingHorizontal: 24,
//     flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "space-between",
//   },

//   sectionEyebrow: {
//     fontSize: 9,
//     fontWeight: "800",
//     letterSpacing: 1.5,
//   },

//   sectionTitle: {
//     marginTop: 5,
//     fontSize: 22,
//     lineHeight: 27,
//     fontWeight: "800",
//     letterSpacing: -0.7,
//   },

//   seeAll: {
//     fontSize: 11,
//     fontWeight: "700",
//     paddingBottom: 2,
//   },

//   /* Live */

//   liveRow: {
//     paddingLeft: 24,
//     paddingRight: 24,
//     gap: 12,
//     paddingTop: 16,
//   },

//   liveCard: {
//     width: 190,
//     minHeight: 184,
//     borderRadius: 20,
//     borderWidth: 1,
//     padding: 14,
//   },

//   liveCardTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   liveStatus: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   liveDot: {
//     width: 5,
//     height: 5,
//     borderRadius: 5,
//   },

//   liveStatusText: {
//     fontSize: 8,
//     fontWeight: "800",
//     letterSpacing: 1.2,
//   },

//   liveCount: {
//     fontSize: 10,
//     fontWeight: "700",
//   },

//   liveVisual: {
//     height: 68,
//     marginTop: 13,
//     borderRadius: 14,
//     overflow: "hidden",
//     position: "relative",
//   },

//   liveVisualLine: {
//     position: "absolute",
//     height: 1,
//   },

//   liveVisualLineOne: {
//     width: 140,
//     left: -10,
//     top: 26,
//     transform: [{ rotate: "17deg" }],
//   },

//   liveVisualLineTwo: {
//     width: 120,
//     right: -8,
//     top: 44,
//     transform: [{ rotate: "-21deg" }],
//   },

//   liveVisualPoint: {
//     position: "absolute",
//     width: 8,
//     height: 8,
//     borderRadius: 8,
//     left: 91,
//     top: 31,
//   },

//   liveCardTitle: {
//     marginTop: 13,
//     fontSize: 13,
//     lineHeight: 17,
//     fontWeight: "800",
//   },

//   liveCardMeta: {
//     marginTop: 4,
//     fontSize: 10.5,
//   },

//   /* For you */

//   forYouHeader: {
//     marginTop: 35,
//   },

//   recommendations: {
//     marginTop: 7,
//     paddingHorizontal: 24,
//   },

//   roomRow: {
//     minHeight: 82,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   roomMark: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   roomMarkInner: {
//     width: 12,
//     height: 12,
//     borderRadius: 12,
//   },

//   roomBody: {
//     flex: 1,
//     marginLeft: 13,
//     marginRight: 10,
//   },

//   roomNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   roomName: {
//     flexShrink: 1,
//     fontSize: 13.5,
//     fontWeight: "700",
//   },

//   trendingText: {
//     marginLeft: 7,
//     fontSize: 7.5,
//     fontWeight: "800",
//     letterSpacing: 1,
//   },

//   roomDescription: {
//     marginTop: 4,
//     fontSize: 11,
//   },

//   roomMetaRow: {
//     marginTop: 7,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   participantStack: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   participant: {
//     width: 19,
//     height: 19,
//     borderRadius: 7,
//     borderWidth: 2,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   participantText: {
//     fontSize: 6.5,
//     fontWeight: "800",
//   },

//   roomParticipants: {
//     marginLeft: 7,
//     fontSize: 9.5,
//   },

//   metaSeparator: {
//     width: 3,
//     height: 3,
//     borderRadius: 3,
//     marginHorizontal: 7,
//   },

//   roomLocation: {
//     fontSize: 9.5,
//   },

//   /* Categories */

//   categoryHeader: {
//     marginTop: 36,
//   },

//   categoryRow: {
//     paddingHorizontal: 24,
//     gap: 24,
//     paddingTop: 16,
//     paddingBottom: 2,
//   },

//   categoryItem: {
//     paddingBottom: 8,
//     borderBottomWidth: 1.5,
//   },

//   categoryText: {
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   /* Create */

//   createRoom: {
//     marginHorizontal: 24,
//     marginTop: 34,
//     minHeight: 72,
//     borderRadius: 18,
//     borderWidth: 1,
//     paddingHorizontal: 13,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   createIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   createBody: {
//     flex: 1,
//     marginHorizontal: 12,
//   },

//   createTitle: {
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   createDescription: {
//     marginTop: 3,
//     fontSize: 10.5,
//   },
// });
