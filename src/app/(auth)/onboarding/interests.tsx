// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   useColorScheme,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useMemo, useState } from "react";

// import { darkColors, lightColors } from "@/theme/colors";
// import { useAuth } from "@/features/auth/AuthProvider";

// type AppColors = {
//   background: string;
//   surface: string;
//   card: string;
//   inputBackground: string;

//   primary: string;
//   primaryPressed: string;

//   online: string;
//   warning: string;

//   textPrimary: string;
//   textSecondary: string;

//   border: string;
//   divider: string;
//   inputBorder: string;

//   disabledBackground: string;
//   disabledText: string;
// };

// type InterestCategory = {
//   id: string;
//   title: string;
//   description: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   items: string[];
// };

// type ConversationGoal = {
//   id: string;
//   label: string;
//   icon: keyof typeof Ionicons.glyphMap;
// };

// const MIN_INTERESTS = 3;
// const MAX_CONVERSATION_GOALS = 3;

// const conversationGoals: ConversationGoal[] = [
//   {
//     id: "meet-people",
//     label: "Meet people",
//     icon: "people-outline",
//   },
//   {
//     id: "make-friends",
//     label: "Make friends",
//     icon: "heart-outline",
//   },
//   {
//     id: "casual-chat",
//     label: "Casual chat",
//     icon: "chatbubble-ellipses-outline",
//   },
//   {
//     id: "deep-talks",
//     label: "Deep conversations",
//     icon: "sparkles-outline",
//   },
//   {
//     id: "networking",
//     label: "Networking",
//     icon: "briefcase-outline",
//   },
//   {
//     id: "share-learn",
//     label: "Share & learn",
//     icon: "bulb-outline",
//   },
// ];

// const interestCategories: InterestCategory[] = [
//   {
//     id: "conversation",
//     title: "Conversation & People",
//     description: "The things you naturally enjoy talking about.",
//     icon: "chatbubbles-outline",
//     items: [
//       "Friendship",
//       "Relationships",
//       "Dating",
//       "Family",
//       "Personal stories",
//       "Life experiences",
//       "Humor",
//       "Memes",
//       "Debates",
//       "Opinions",
//       "Social issues",
//       "People & culture",
//     ],
//   },
//   {
//     id: "music",
//     title: "Music & Audio",
//     description: "Artists, sounds, genres and everything you listen to.",
//     icon: "musical-notes-outline",
//     items: [
//       "Afrobeats",
//       "Hip-hop",
//       "R&B",
//       "Pop",
//       "Reggae",
//       "Gospel",
//       "Amapiano",
//       "Dancehall",
//       "Rock",
//       "Jazz",
//       "Classical",
//       "Concerts",
//       "DJing",
//       "Podcasts",
//     ],
//   },
//   {
//     id: "movies",
//     title: "Movies, TV & Culture",
//     description: "What keeps you watching, laughing and talking.",
//     icon: "film-outline",
//     items: [
//       "Movies",
//       "TV shows",
//       "Netflix",
//       "Documentaries",
//       "Comedy",
//       "Anime",
//       "Manga",
//       "K-dramas",
//       "Reality TV",
//       "Celebrities",
//       "Pop culture",
//       "Entertainment news",
//     ],
//   },
//   {
//     id: "sports",
//     title: "Sports & Fitness",
//     description: "Teams, competition, training and staying active.",
//     icon: "football-outline",
//     items: [
//       "Football",
//       "Basketball",
//       "Tennis",
//       "Boxing",
//       "MMA",
//       "Athletics",
//       "Formula 1",
//       "Gym",
//       "Running",
//       "Swimming",
//       "Cycling",
//       "Fitness",
//       "Sports news",
//       "Esports",
//     ],
//   },
//   {
//     id: "gaming-tech",
//     title: "Gaming & Technology",
//     description: "Games, gadgets, software and the digital world.",
//     icon: "game-controller-outline",
//     items: [
//       "Gaming",
//       "Mobile gaming",
//       "PlayStation",
//       "Xbox",
//       "PC gaming",
//       "Nintendo",
//       "Esports",
//       "AI",
//       "Coding",
//       "Software",
//       "Gadgets",
//       "Phones",
//       "Cybersecurity",
//       "Startups",
//       "Social media",
//     ],
//   },
//   {
//     id: "creative",
//     title: "Creative & Expression",
//     description: "Ways you create, design, perform or express yourself.",
//     icon: "color-palette-outline",
//     items: [
//       "Photography",
//       "Drawing",
//       "Painting",
//       "Graphic design",
//       "Fashion",
//       "Writing",
//       "Poetry",
//       "Content creation",
//       "Video editing",
//       "Filmmaking",
//       "Dance",
//       "Singing",
//       "Music production",
//       "DIY & crafts",
//     ],
//   },
//   {
//     id: "business",
//     title: "Career, Business & Money",
//     description: "Work, ambition, business and building your future.",
//     icon: "briefcase-outline",
//     items: [
//       "Business",
//       "Entrepreneurship",
//       "Startups",
//       "Career growth",
//       "Leadership",
//       "Freelancing",
//       "Remote work",
//       "Programming",
//       "Marketing",
//       "Personal finance",
//       "Investing",
//       "Real estate",
//       "Side hustles",
//       "Networking",
//     ],
//   },
//   {
//     id: "learning",
//     title: "Learning & Ideas",
//     description: "Subjects that keep you curious.",
//     icon: "school-outline",
//     items: [
//       "Science",
//       "Technology",
//       "History",
//       "Psychology",
//       "Philosophy",
//       "Space",
//       "Education",
//       "Languages",
//       "Books",
//       "Current events",
//       "Politics",
//       "Public affairs",
//       "Productivity",
//       "Personal development",
//     ],
//   },
//   {
//     id: "food-travel",
//     title: "Food & Travel",
//     description: "Places to go, things to taste and experiences to have.",
//     icon: "airplane-outline",
//     items: [
//       "Travel",
//       "Adventure",
//       "Road trips",
//       "Beaches",
//       "Nature",
//       "City life",
//       "Food",
//       "Cooking",
//       "Baking",
//       "Restaurants",
//       "Street food",
//       "Coffee",
//       "Local experiences",
//       "Travel photography",
//     ],
//   },
//   {
//     id: "lifestyle",
//     title: "Lifestyle",
//     description: "The everyday things that shape your life.",
//     icon: "sparkles-outline",
//     items: [
//       "Fashion",
//       "Beauty",
//       "Self-care",
//       "Wellness",
//       "Cars",
//       "Pets",
//       "Home",
//       "Books",
//       "Fitness",
//       "Minimalism",
//       "Luxury",
//       "Outdoors",
//       "Personal growth",
//     ],
//   },
//   {
//     id: "culture",
//     title: "Culture, Faith & Life",
//     description: "Values, identity, beliefs and different ways of seeing life.",
//     icon: "globe-outline",
//     items: [
//       "Culture",
//       "Traditions",
//       "Languages",
//       "Faith & spirituality",
//       "Religion",
//       "Philosophy",
//       "Community",
//       "Identity",
//       "Global cultures",
//       "African culture",
//       "Local community",
//       "Volunteering",
//     ],
//   },
// ];

// type InterestCategorySectionProps = {
//   category: InterestCategory;
//   selected: Set<string>;
//   onToggle: (value: string) => void;
//   colors: AppColors;
//   isDark: boolean;
// };

// function InterestCategorySection({
//   category,
//   selected,
//   onToggle,
//   colors,
//   isDark,
// }: InterestCategorySectionProps) {
//   return (
//     <View style={styles.categorySection}>
//       <View style={styles.categoryHeader}>
//         <View
//           style={[
//             styles.categoryIcon,
//             {
//               backgroundColor: isDark
//                 ? "rgba(37,99,235,0.12)"
//                 : "rgba(37,99,235,0.08)",
//             },
//           ]}
//         >
//           <Ionicons name={category.icon} size={18} color={colors.primary} />
//         </View>

//         <View style={styles.categoryHeaderText}>
//           <Text style={[styles.categoryTitle, { color: colors.textPrimary }]}>
//             {category.title}
//           </Text>

//           <Text
//             style={[
//               styles.categoryDescription,
//               { color: colors.textSecondary },
//             ]}
//           >
//             {category.description}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.chips}>
//         {category.items.map((item) => {
//           const isSelected = selected.has(item);

//           return (
//             <Pressable
//               key={item}
//               onPress={() => onToggle(item)}
//               style={({ pressed }) => [
//                 styles.chip,
//                 {
//                   backgroundColor: isSelected ? colors.primary : colors.surface,
//                   borderColor: isSelected ? colors.primary : colors.border,
//                   opacity: pressed ? 0.78 : 1,
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.chipText,
//                   {
//                     color: isSelected ? "#FFFFFF" : colors.textPrimary,
//                   },
//                 ]}
//               >
//                 {item}
//               </Text>

//               {isSelected && (
//                 <Ionicons
//                   name="checkmark"
//                   size={14}
//                   color="#FFFFFF"
//                   style={styles.chipCheck}
//                 />
//               )}
//             </Pressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// export default function InterestsScreen() {
//   const colorScheme = useColorScheme();

//   const colors: AppColors = colorScheme === "dark" ? darkColors : lightColors;

//   const isDark = colorScheme === "dark";

//   const { completeOnboarding } = useAuth();

//   const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
//     new Set(),
//   );

//   const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set());

//   const [search, setSearch] = useState("");

//   const filteredCategories = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     if (!query) {
//       return interestCategories;
//     }

//     return interestCategories
//       .map((category) => {
//         const categoryMatches =
//           category.title.toLowerCase().includes(query) ||
//           category.description.toLowerCase().includes(query);

//         if (categoryMatches) {
//           return category;
//         }

//         const filteredItems = category.items.filter((item) =>
//           item.toLowerCase().includes(query),
//         );

//         if (filteredItems.length === 0) {
//           return null;
//         }

//         return {
//           ...category,
//           items: filteredItems,
//         };
//       })
//       .filter((category): category is InterestCategory => category !== null);
//   }, [search]);

//   const toggleInterest = (interest: string) => {
//     setSelectedInterests((current) => {
//       const next = new Set(current);

//       if (next.has(interest)) {
//         next.delete(interest);
//       } else {
//         next.add(interest);
//       }

//       return next;
//     });
//   };

//   const toggleGoal = (goal: string) => {
//     setSelectedGoals((current) => {
//       const next = new Set(current);

//       if (next.has(goal)) {
//         next.delete(goal);
//         return next;
//       }

//       if (next.size >= MAX_CONVERSATION_GOALS) {
//         return next;
//       }

//       next.add(goal);

//       return next;
//     });
//   };

//   const canContinue = selectedInterests.size >= MIN_INTERESTS;

//   const remainingInterests = Math.max(
//     0,
//     MIN_INTERESTS - selectedInterests.size,
//   );

//   const handleContinue = async () => {
//     if (!canContinue) {
//       console.warn("[1Go Interests] Continue blocked.", {
//         selectedInterests: selectedInterests.size,
//         required: MIN_INTERESTS,
//       });

//       return;
//     }

//     Keyboard.dismiss();

//     console.log("[1Go Interests] Continue pressed.");

//     console.log("[1Go Interests] Selected interests:", [...selectedInterests]);

//     console.log("[1Go Interests] Conversation goals:", [...selectedGoals]);

//     try {
//       console.log("[1Go Interests] Calling completeOnboarding...");

//       await completeOnboarding();

//       console.log("[1Go Interests] completeOnboarding finished.");

//       console.log("[1Go Interests] Navigating to /rooms...");

//       router.replace("/rooms");

//       console.log("[1Go Interests] Navigation request sent.");
//     } catch (error) {
//       console.error("[1Go Interests] FAILED:", error);
//     }
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
//       >
//         {/* HEADER */}
//         <View
//           style={[
//             styles.header,
//             {
//               backgroundColor: colors.background,
//               borderBottomColor: colors.divider,
//             },
//           ]}
//         >
//           <Pressable
//             onPress={() => router.back()}
//             hitSlop={10}
//             style={({ pressed }) => [
//               styles.backButton,
//               {
//                 borderColor: colors.border,
//                 backgroundColor: isDark
//                   ? "rgba(255,255,255,0.035)"
//                   : "rgba(255,255,255,0.72)",
//                 opacity: pressed ? 0.65 : 1,
//               },
//             ]}
//           >
//             <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
//           </Pressable>

//           <View style={styles.brandRow}>
//             <View
//               style={[
//                 styles.brandMark,
//                 {
//                   backgroundColor: colors.primary,
//                 },
//               ]}
//             >
//               <Text style={styles.brandNumber}>1</Text>
//             </View>

//             <Text
//               style={[
//                 styles.brandName,
//                 {
//                   color: colors.textPrimary,
//                 },
//               ]}
//             >
//               1Go
//             </Text>
//           </View>

//           <View style={styles.stepPill}>
//             <Text
//               style={[
//                 styles.stepText,
//                 {
//                   color: colors.textSecondary,
//                 },
//               ]}
//             >
//               2 of 2
//             </Text>
//           </View>
//         </View>

//         <ScrollView
//           keyboardShouldPersistTaps="handled"
//           keyboardDismissMode={
//             Platform.OS === "ios" ? "interactive" : "on-drag"
//           }
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* INTRO */}
//           <View style={styles.intro}>
//             <Text
//               style={[
//                 styles.eyebrow,
//                 {
//                   color: colors.primary,
//                 },
//               ]}
//             >
//               PERSONALIZE 1GO
//             </Text>

//             <Text
//               style={[
//                 styles.title,
//                 {
//                   color: colors.textPrimary,
//                 },
//               ]}
//             >
//               What are you into?
//             </Text>

//             <Text
//               style={[
//                 styles.description,
//                 {
//                   color: colors.textSecondary,
//                 },
//               ]}
//             >
//               Pick the things you enjoy. We’ll use them to help surface
//               conversations, rooms and people that feel relevant to you.
//             </Text>
//           </View>

//           {/* SEARCH */}
//           <View
//             style={[
//               styles.searchBox,
//               {
//                 backgroundColor: colors.surface,
//                 borderColor: colors.border,
//               },
//             ]}
//           >
//             <Ionicons
//               name="search-outline"
//               size={18}
//               color={colors.textSecondary}
//             />

//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search interests"
//               placeholderTextColor={colors.disabledText}
//               autoCorrect={false}
//               autoCapitalize="none"
//               returnKeyType="search"
//               style={[
//                 styles.searchInput,
//                 {
//                   color: colors.textPrimary,
//                 },
//               ]}
//             />

//             {search.length > 0 && (
//               <Pressable
//                 onPress={() => setSearch("")}
//                 hitSlop={8}
//                 style={styles.searchClear}
//               >
//                 <Ionicons
//                   name="close-circle"
//                   size={18}
//                   color={colors.textSecondary}
//                 />
//               </Pressable>
//             )}
//           </View>

//           {/* WHAT BRINGS YOU HERE */}
//           {!search && (
//             <View
//               style={[
//                 styles.goalsCard,
//                 {
//                   backgroundColor: colors.surface,
//                   borderColor: colors.border,
//                 },
//               ]}
//             >
//               <View style={styles.goalsHeader}>
//                 <View style={styles.goalsTitleRow}>
//                   <Text
//                     style={[
//                       styles.goalsTitle,
//                       {
//                         color: colors.textPrimary,
//                       },
//                     ]}
//                   >
//                     What brings you here?
//                   </Text>

//                   <Text
//                     style={[
//                       styles.goalsCount,
//                       {
//                         color: colors.textSecondary,
//                       },
//                     ]}
//                   >
//                     Optional
//                   </Text>
//                 </View>

//                 <Text
//                   style={[
//                     styles.goalsDescription,
//                     {
//                       color: colors.textSecondary,
//                     },
//                   ]}
//                 >
//                   Choose up to 3.
//                 </Text>
//               </View>

//               <View style={styles.goalGrid}>
//                 {conversationGoals.map((goal) => {
//                   const isSelected = selectedGoals.has(goal.id);

//                   return (
//                     <Pressable
//                       key={goal.id}
//                       onPress={() => toggleGoal(goal.id)}
//                       style={({ pressed }) => [
//                         styles.goalCard,
//                         {
//                           backgroundColor: isSelected
//                             ? isDark
//                               ? "rgba(37,99,235,0.14)"
//                               : "rgba(37,99,235,0.07)"
//                             : colors.inputBackground,
//                           borderColor: isSelected
//                             ? colors.primary
//                             : colors.border,
//                           opacity: pressed ? 0.75 : 1,
//                         },
//                       ]}
//                     >
//                       <View
//                         style={[
//                           styles.goalIcon,
//                           {
//                             backgroundColor: isSelected
//                               ? colors.primary
//                               : colors.disabledBackground,
//                           },
//                         ]}
//                       >
//                         <Ionicons
//                           name={goal.icon}
//                           size={16}
//                           color={isSelected ? "#FFFFFF" : colors.textSecondary}
//                         />
//                       </View>

//                       <Text
//                         numberOfLines={2}
//                         style={[
//                           styles.goalText,
//                           {
//                             color: colors.textPrimary,
//                           },
//                         ]}
//                       >
//                         {goal.label}
//                       </Text>

//                       {isSelected && (
//                         <View
//                           style={[
//                             styles.goalCheck,
//                             {
//                               backgroundColor: colors.primary,
//                             },
//                           ]}
//                         >
//                           <Ionicons
//                             name="checkmark"
//                             size={11}
//                             color="#FFFFFF"
//                           />
//                         </View>
//                       )}
//                     </Pressable>
//                   );
//                 })}
//               </View>
//             </View>
//           )}

//           {/* INTEREST STATUS */}
//           <View style={styles.selectionStatus}>
//             <View>
//               <Text
//                 style={[
//                   styles.selectionTitle,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 Your interests
//               </Text>

//               <Text
//                 style={[
//                   styles.selectionSubtitle,
//                   {
//                     color: colors.textSecondary,
//                   },
//                 ]}
//               >
//                 Pick at least {MIN_INTERESTS} to continue.
//               </Text>
//             </View>

//             <View
//               style={[
//                 styles.selectionBadge,
//                 {
//                   backgroundColor: canContinue
//                     ? isDark
//                       ? "rgba(37,99,235,0.14)"
//                       : "rgba(37,99,235,0.09)"
//                     : colors.disabledBackground,
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.selectionCount,
//                   {
//                     color: canContinue ? colors.primary : colors.textSecondary,
//                   },
//                 ]}
//               >
//                 {selectedInterests.size}
//               </Text>
//             </View>
//           </View>

//           {/* CATEGORIES */}
//           {filteredCategories.length > 0 ? (
//             filteredCategories.map((category) => (
//               <InterestCategorySection
//                 key={category.id}
//                 category={category}
//                 selected={selectedInterests}
//                 onToggle={toggleInterest}
//                 colors={colors}
//                 isDark={isDark}
//               />
//             ))
//           ) : (
//             <View style={styles.emptyState}>
//               <View
//                 style={[
//                   styles.emptyIcon,
//                   {
//                     backgroundColor: colors.disabledBackground,
//                   },
//                 ]}
//               >
//                 <Ionicons
//                   name="search-outline"
//                   size={22}
//                   color={colors.textSecondary}
//                 />
//               </View>

//               <Text
//                 style={[
//                   styles.emptyTitle,
//                   {
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               >
//                 No interests found
//               </Text>

//               <Text
//                 style={[
//                   styles.emptyDescription,
//                   {
//                     color: colors.textSecondary,
//                   },
//                 ]}
//               >
//                 Try a different word or browse the categories.
//               </Text>
//             </View>
//           )}

//           <View style={styles.bottomSpace} />
//         </ScrollView>

//         {/* FOOTER */}
//         <View
//           style={[
//             styles.footer,
//             {
//               backgroundColor: colors.background,
//               borderTopColor: colors.divider,
//             },
//           ]}
//         >
//           <View style={styles.footerMeta}>
//             <Text
//               style={[
//                 styles.footerCount,
//                 {
//                   color: colors.textPrimary,
//                 },
//               ]}
//             >
//               {selectedInterests.size} selected
//             </Text>

//             <Text
//               style={[
//                 styles.footerHint,
//                 {
//                   color: canContinue ? colors.online : colors.textSecondary,
//                 },
//               ]}
//             >
//               {canContinue
//                 ? "You're ready"
//                 : `Choose ${remainingInterests} more`}
//             </Text>
//           </View>

//           <Pressable
//             onPress={handleContinue}
//             disabled={!canContinue}
//             style={({ pressed }) => [
//               styles.continueButton,
//               {
//                 backgroundColor: canContinue
//                   ? colors.primary
//                   : colors.disabledBackground,
//                 opacity: pressed && canContinue ? 0.9 : 1,
//                 transform: [
//                   {
//                     scale: pressed && canContinue ? 0.985 : 1,
//                   },
//                 ],
//               },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.continueText,
//                 {
//                   color: canContinue ? "#FFFFFF" : colors.disabledText,
//                 },
//               ]}
//             >
//               Continue
//             </Text>

//             <View
//               style={[
//                 styles.continueIcon,
//                 {
//                   backgroundColor: canContinue
//                     ? "rgba(255,255,255,0.15)"
//                     : isDark
//                       ? "rgba(255,255,255,0.04)"
//                       : "rgba(15,23,42,0.04)",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name="arrow-forward"
//                 size={17}
//                 color={canContinue ? "#FFFFFF" : colors.disabledText}
//               />
//             </View>
//           </Pressable>
//         </View>
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

//   /* HEADER */

//   header: {
//     minHeight: 66,
//     paddingHorizontal: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderBottomWidth: StyleSheet.hairlineWidth,
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
//     marginLeft: 8,
//     fontSize: 17,
//     fontWeight: "800",
//     letterSpacing: -0.4,
//   },

//   stepPill: {
//     minWidth: 48,
//     height: 28,
//     paddingHorizontal: 9,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   stepText: {
//     fontSize: 11,
//     fontWeight: "600",
//   },

//   /* SCROLL */

//   scrollContent: {
//     paddingHorizontal: 24,
//     paddingTop: 25,
//     paddingBottom: 20,
//   },

//   /* INTRO */

//   intro: {
//     paddingBottom: 19,
//   },

//   eyebrow: {
//     fontSize: 10,
//     lineHeight: 15,
//     fontWeight: "800",
//     letterSpacing: 1.7,
//   },

//   title: {
//     marginTop: 9,
//     fontSize: 31,
//     lineHeight: 37,
//     fontWeight: "800",
//     letterSpacing: -1.15,
//   },

//   description: {
//     marginTop: 8,
//     maxWidth: 355,
//     fontSize: 14.5,
//     lineHeight: 21,
//   },

//   /* SEARCH */

//   searchBox: {
//     height: 50,
//     borderRadius: 14,
//     borderWidth: 1,
//     paddingHorizontal: 14,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   searchInput: {
//     flex: 1,
//     height: 48,
//     marginLeft: 9,
//     paddingVertical: 0,
//     fontSize: 14.5,
//     fontWeight: "500",
//   },

//   searchClear: {
//     width: 28,
//     height: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   /* WHAT BRINGS YOU HERE */

//   goalsCard: {
//     marginTop: 17,
//     borderWidth: 1,
//     borderRadius: 16,
//     padding: 13,
//   },

//   goalsHeader: {
//     marginBottom: 11,
//   },

//   goalsTitleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   goalsTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     letterSpacing: -0.1,
//   },

//   goalsCount: {
//     fontSize: 10,
//     fontWeight: "600",
//   },

//   goalsDescription: {
//     marginTop: 2,
//     fontSize: 10.5,
//     lineHeight: 15,
//   },

//   goalGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   goalCard: {
//     width: "48.3%",
//     minHeight: 43,
//     borderRadius: 11,
//     borderWidth: 1,
//     paddingHorizontal: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 7,
//   },

//   goalIcon: {
//     width: 27,
//     height: 27,
//     borderRadius: 9,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 7,
//   },

//   goalText: {
//     flex: 1,
//     fontSize: 11,
//     lineHeight: 14,
//     fontWeight: "600",
//   },

//   goalCheck: {
//     width: 17,
//     height: 17,
//     borderRadius: 8.5,
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 4,
//   },

//   /* INTEREST STATUS */

//   selectionStatus: {
//     marginTop: 23,
//     marginBottom: 7,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   selectionTitle: {
//     fontSize: 17,
//     fontWeight: "700",
//     letterSpacing: -0.25,
//   },

//   selectionSubtitle: {
//     marginTop: 2,
//     fontSize: 11,
//     lineHeight: 16,
//   },

//   selectionBadge: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   selectionCount: {
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   /* CATEGORIES */

//   categorySection: {
//     marginTop: 23,
//   },

//   categoryHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },

//   categoryIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },

//   categoryHeaderText: {
//     flex: 1,
//   },

//   categoryTitle: {
//     fontSize: 15,
//     lineHeight: 19,
//     fontWeight: "700",
//     letterSpacing: -0.15,
//   },

//   categoryDescription: {
//     marginTop: 2,
//     fontSize: 10.5,
//     lineHeight: 15,
//   },

//   chips: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },

//   chip: {
//     minHeight: 38,
//     borderRadius: 11,
//     borderWidth: 1,
//     paddingHorizontal: 13,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 8,
//     marginBottom: 8,
//   },

//   chipText: {
//     fontSize: 12,
//     lineHeight: 16,
//     fontWeight: "600",
//   },

//   chipCheck: {
//     marginLeft: 5,
//   },

//   /* EMPTY */

//   emptyState: {
//     alignItems: "center",
//     paddingVertical: 65,
//     paddingHorizontal: 30,
//   },

//   emptyIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   emptyTitle: {
//     marginTop: 14,
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   emptyDescription: {
//     marginTop: 5,
//     textAlign: "center",
//     fontSize: 12,
//     lineHeight: 18,
//   },

//   bottomSpace: {
//     height: 20,
//   },

//   /* FOOTER */

//   footer: {
//     borderTopWidth: StyleSheet.hairlineWidth,
//     paddingHorizontal: 24,
//     paddingTop: 11,
//     paddingBottom: Platform.OS === "ios" ? 8 : 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   footerMeta: {
//     flex: 1,
//   },

//   footerCount: {
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   footerHint: {
//     marginTop: 2,
//     fontSize: 10,
//     fontWeight: "600",
//   },

//   continueButton: {
//     width: 142,
//     height: 52,
//     borderRadius: 26,
//     paddingLeft: 18,
//     paddingRight: 7,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   continueText: {
//     fontSize: 14.5,
//     fontWeight: "800",
//   },

//   continueIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
