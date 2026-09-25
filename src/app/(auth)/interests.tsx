import React, { useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { themes } from "@/theme/colors";
import { useAuth } from "@/features/auth/AuthProvider";

const electricAzure = themes.electricAzure;

type AppColors = typeof electricAzure.light;

type InterestCategory = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: string[];
};

type ConversationGoal = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const MIN_INTERESTS = 3;
const MAX_CONVERSATION_GOALS = 3;

const conversationGoals: ConversationGoal[] = [
  {
    id: "meet-people",
    label: "Meet people",
    icon: "people-outline",
  },
  {
    id: "make-friends",
    label: "Make friends",
    icon: "heart-outline",
  },
  {
    id: "casual-chat",
    label: "Casual chat",
    icon: "chatbubble-ellipses-outline",
  },
  {
    id: "deep-talks",
    label: "Deep conversations",
    icon: "sparkles-outline",
  },
  {
    id: "networking",
    label: "Networking",
    icon: "briefcase-outline",
  },
  {
    id: "share-learn",
    label: "Share & learn",
    icon: "bulb-outline",
  },
];

const interestCategories: InterestCategory[] = [
  {
    id: "conversation",
    title: "Conversation & People",
    description: "The things you naturally enjoy talking about.",
    icon: "chatbubbles-outline",
    items: [
      "Friendship",
      "Relationships",
      "Dating",
      "Family",
      "Personal stories",
      "Life experiences",
      "Humor",
      "Memes",
      "Debates",
      "Opinions",
      "Social issues",
      "People & culture",
    ],
  },

  {
    id: "music",
    title: "Music & Audio",
    description: "Artists, sounds, genres and everything you listen to.",
    icon: "musical-notes-outline",
    items: [
      "Afrobeats",
      "Hip-hop",
      "R&B",
      "Pop",
      "Reggae",
      "Gospel",
      "Amapiano",
      "Dancehall",
      "Rock",
      "Jazz",
      "Classical",
      "Concerts",
      "DJing",
      "Podcasts",
    ],
  },

  {
    id: "movies",
    title: "Movies, TV & Culture",
    description: "What keeps you watching, laughing and talking.",
    icon: "film-outline",
    items: [
      "Movies",
      "TV shows",
      "Netflix",
      "Documentaries",
      "Comedy",
      "Anime",
      "Manga",
      "K-dramas",
      "Reality TV",
      "Celebrities",
      "Pop culture",
      "Entertainment news",
    ],
  },

  {
    id: "sports",
    title: "Sports & Fitness",
    description: "Teams, competition, training and staying active.",
    icon: "football-outline",
    items: [
      "Football",
      "Basketball",
      "Tennis",
      "Boxing",
      "MMA",
      "Athletics",
      "Formula 1",
      "Gym",
      "Running",
      "Swimming",
      "Cycling",
      "Fitness",
      "Sports news",
      "Esports",
    ],
  },

  {
    id: "gaming-tech",
    title: "Gaming & Technology",
    description: "Games, gadgets, software and the digital world.",
    icon: "game-controller-outline",
    items: [
      "Gaming",
      "Mobile gaming",
      "PlayStation",
      "Xbox",
      "PC gaming",
      "Nintendo",
      "Esports",
      "AI",
      "Coding",
      "Software",
      "Gadgets",
      "Phones",
      "Cybersecurity",
      "Startups",
      "Social media",
    ],
  },

  {
    id: "creative",
    title: "Creative & Expression",
    description: "Ways you create, design, perform or express yourself.",
    icon: "color-palette-outline",
    items: [
      "Photography",
      "Drawing",
      "Painting",
      "Graphic design",
      "Fashion",
      "Writing",
      "Poetry",
      "Content creation",
      "Video editing",
      "Filmmaking",
      "Dance",
      "Singing",
      "Music production",
      "DIY & crafts",
    ],
  },

  {
    id: "business",
    title: "Career, Business & Money",
    description: "Work, ambition, business and building your future.",
    icon: "briefcase-outline",
    items: [
      "Business",
      "Entrepreneurship",
      "Startups",
      "Career growth",
      "Leadership",
      "Freelancing",
      "Remote work",
      "Programming",
      "Marketing",
      "Personal finance",
      "Investing",
      "Real estate",
      "Side hustles",
      "Networking",
    ],
  },

  {
    id: "learning",
    title: "Learning & Ideas",
    description: "Subjects that keep you curious.",
    icon: "school-outline",
    items: [
      "Science",
      "Technology",
      "History",
      "Psychology",
      "Philosophy",
      "Space",
      "Education",
      "Languages",
      "Books",
      "Current events",
      "Politics",
      "Public affairs",
      "Productivity",
      "Personal development",
    ],
  },

  {
    id: "food-travel",
    title: "Food & Travel",
    description: "Places to go, things to taste and experiences to have.",
    icon: "airplane-outline",
    items: [
      "Travel",
      "Adventure",
      "Road trips",
      "Beaches",
      "Nature",
      "City life",
      "Food",
      "Cooking",
      "Baking",
      "Restaurants",
      "Street food",
      "Coffee",
      "Local experiences",
      "Travel photography",
    ],
  },

  {
    id: "lifestyle",
    title: "Lifestyle",
    description: "The everyday things that shape your life.",
    icon: "sparkles-outline",
    items: [
      "Fashion",
      "Beauty",
      "Self-care",
      "Wellness",
      "Cars",
      "Pets",
      "Home",
      "Books",
      "Fitness",
      "Minimalism",
      "Luxury",
      "Outdoors",
      "Personal growth",
    ],
  },

  {
    id: "culture",
    title: "Culture, Faith & Life",
    description: "Values, identity, beliefs and different ways of seeing life.",
    icon: "globe-outline",
    items: [
      "Culture",
      "Traditions",
      "Languages",
      "Faith & spirituality",
      "Religion",
      "Philosophy",
      "Community",
      "Identity",
      "Global cultures",
      "African culture",
      "Local community",
      "Volunteering",
    ],
  },
];

type InterestCategorySectionProps = {
  category: InterestCategory;
  selected: Set<string>;
  onToggle: (value: string) => void;
  colors: AppColors;
  isDark: boolean;
};

function InterestCategorySection({
  category,
  selected,
  onToggle,
  colors,
  isDark,
}: InterestCategorySectionProps) {
  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View
          style={[
            styles.categoryIcon,
            {
              backgroundColor: isDark
                ? "rgba(6,182,212,0.12)"
                : "rgba(6,182,212,0.08)",
            },
          ]}
        >
          <Ionicons name={category.icon} size={18} color={colors.accent} />
        </View>

        <View style={styles.categoryHeaderText}>
          <Text
            style={[
              styles.categoryTitle,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {category.title}
          </Text>

          <Text
            style={[
              styles.categoryDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {category.description}
          </Text>
        </View>
      </View>

      <View style={styles.chips}>
        {category.items.map((item) => {
          const isSelected = selected.has(item);

          return (
            <Pressable
              key={item}
              onPress={() => onToggle(item)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                  opacity: pressed ? 0.78 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected ? "#FFFFFF" : colors.textPrimary,
                  },
                ]}
              >
                {item}
              </Text>

              {isSelected && (
                <Ionicons
                  name="checkmark"
                  size={14}
                  color="#FFFFFF"
                  style={styles.chipCheck}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function InterestsScreen() {
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();

  const colors: AppColors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isDark = colorScheme === "dark";

  const { completeOnboarding } = useAuth();

  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set(),
  );

  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set());

  const [search, setSearch] = useState("");

  const isSmallScreen = height < 700;

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return interestCategories;
    }

    return interestCategories
      .map((category) => {
        const categoryMatches =
          category.title.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query);

        if (categoryMatches) {
          return category;
        }

        const filteredItems = category.items.filter((item) =>
          item.toLowerCase().includes(query),
        );

        if (filteredItems.length === 0) {
          return null;
        }

        return {
          ...category,
          items: filteredItems,
        };
      })
      .filter((category): category is InterestCategory => category !== null);
  }, [search]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) => {
      const next = new Set(current);

      if (next.has(interest)) {
        next.delete(interest);
      } else {
        next.add(interest);
      }

      return next;
    });
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((current) => {
      const next = new Set(current);

      if (next.has(goal)) {
        next.delete(goal);
        return next;
      }

      if (next.size >= MAX_CONVERSATION_GOALS) {
        return next;
      }

      next.add(goal);

      return next;
    });
  };

  const canContinue = selectedInterests.size >= MIN_INTERESTS;

  const remainingInterests = Math.max(
    0,
    MIN_INTERESTS - selectedInterests.size,
  );

  const handleContinue = async () => {
    if (!canContinue) {
      return;
    }

    Keyboard.dismiss();

    try {
      await completeOnboarding();

      router.replace("/rooms");
    } catch (error) {
      console.error("[1Go Interests] Failed to complete onboarding:", error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* =========================
            TOP BAR
        ========================= */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.divider,
            },
          ]}
        >
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={25}
              color={colors.textSecondary}
            />
          </Pressable>

          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            Create Your 1Go Identity
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* =========================
            MAIN SCROLL AREA
        ========================= */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: isSmallScreen ? 20 : 28,
            },
          ]}
        >
          {/* =========================
              PROGRESS
          ========================= */}
          <View style={styles.progressSection}>
            <View
              style={[
                styles.progressTrack,
                {
                  backgroundColor: isDark ? "#25304A" : "#DCE3EF",
                },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: "100%",
                  },
                ]}
              />
            </View>

            <View style={styles.progressLabels}>
              <Text
                style={[
                  styles.progressText,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Step 2 of 2
              </Text>

              <Text
                style={[
                  styles.progressText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                100%
              </Text>
            </View>
          </View>

          {/* =========================
              INTRO
          ========================= */}
          <View style={styles.intro}>
            <Text
              style={[
                styles.eyebrow,
                {
                  color: colors.primary,
                },
              ]}
            >
              PERSONALIZE YOUR 1GO
            </Text>

            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              What are you into?
            </Text>

            <Text
              style={[
                styles.description,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Pick the things you enjoy so 1Go can help surface relevant
              conversations, rooms and people.
            </Text>
          </View>

          {/* =========================
              SEARCH
          ========================= */}
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.textSecondary}
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search interests"
              placeholderTextColor={colors.disabledText}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              style={[
                styles.searchInput,
                {
                  color: colors.textPrimary,
                },
              ]}
            />

            {search.length > 0 && (
              <Pressable
                onPress={() => setSearch("")}
                hitSlop={8}
                style={styles.searchClear}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={colors.textSecondary}
                />
              </Pressable>
            )}
          </View>

          {/* =========================
              CONVERSATION GOALS
          ========================= */}
          {!search && (
            <View
              style={[
                styles.goalsCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.goalsHeader}>
                <View style={styles.goalsTitleRow}>
                  <Text
                    style={[
                      styles.goalsTitle,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    What brings you here?
                  </Text>

                  <Text
                    style={[
                      styles.goalsOptional,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    Optional
                  </Text>
                </View>

                <Text
                  style={[
                    styles.goalsDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  Choose up to 3.
                </Text>
              </View>

              <View style={styles.goalGrid}>
                {conversationGoals.map((goal) => {
                  const isSelected = selectedGoals.has(goal.id);

                  return (
                    <Pressable
                      key={goal.id}
                      onPress={() => toggleGoal(goal.id)}
                      style={({ pressed }) => [
                        styles.goalCard,
                        {
                          backgroundColor: isSelected
                            ? isDark
                              ? "rgba(37,99,235,0.14)"
                              : "rgba(37,99,235,0.07)"
                            : colors.inputBackground,
                          borderColor: isSelected
                            ? colors.primary
                            : colors.border,
                          opacity: pressed ? 0.75 : 1,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.goalIcon,
                          {
                            backgroundColor: isSelected
                              ? colors.primary
                              : colors.disabledBackground,
                          },
                        ]}
                      >
                        <Ionicons
                          name={goal.icon}
                          size={16}
                          color={isSelected ? "#FFFFFF" : colors.textSecondary}
                        />
                      </View>

                      <Text
                        numberOfLines={2}
                        style={[
                          styles.goalText,
                          {
                            color: colors.textPrimary,
                          },
                        ]}
                      >
                        {goal.label}
                      </Text>

                      {isSelected && (
                        <View
                          style={[
                            styles.goalCheck,
                            {
                              backgroundColor: colors.primary,
                            },
                          ]}
                        >
                          <Ionicons
                            name="checkmark"
                            size={11}
                            color="#FFFFFF"
                          />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* =========================
              INTEREST STATUS
          ========================= */}
          <View style={styles.selectionStatus}>
            <View style={styles.selectionTextArea}>
              <Text
                style={[
                  styles.selectionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Your interests
              </Text>

              <Text
                style={[
                  styles.selectionSubtitle,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Pick at least {MIN_INTERESTS} to continue.
              </Text>
            </View>

            <View
              style={[
                styles.selectionBadge,
                {
                  backgroundColor: canContinue
                    ? isDark
                      ? "rgba(37,99,235,0.14)"
                      : "rgba(37,99,235,0.09)"
                    : colors.disabledBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.selectionCount,
                  {
                    color: canContinue ? colors.primary : colors.textSecondary,
                  },
                ]}
              >
                {selectedInterests.size}
              </Text>
            </View>
          </View>

          {/* =========================
              INTEREST CATEGORIES
          ========================= */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <InterestCategorySection
                key={category.id}
                category={category}
                selected={selectedInterests}
                onToggle={toggleInterest}
                colors={colors}
                isDark={isDark}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <View
                style={[
                  styles.emptyIcon,
                  {
                    backgroundColor: colors.disabledBackground,
                  },
                ]}
              >
                <Ionicons
                  name="search-outline"
                  size={22}
                  color={colors.textSecondary}
                />
              </View>

              <Text
                style={[
                  styles.emptyTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                No interests found
              </Text>

              <Text
                style={[
                  styles.emptyDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Try a different word or browse the categories.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* =========================
            BOTTOM ACTION BAR
        ========================= */}
        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.divider,
            },
          ]}
        >
          <View style={styles.footerMeta}>
            <Text
              style={[
                styles.footerCount,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              {selectedInterests.size} selected
            </Text>

            <Text
              style={[
                styles.footerHint,
                {
                  color: canContinue ? colors.online : colors.textSecondary,
                },
              ]}
            >
              {canContinue
                ? "You're ready"
                : `Choose ${remainingInterests} more`}
            </Text>
          </View>

          <Pressable
            onPress={handleContinue}
            disabled={!canContinue}
            style={({ pressed }) => [
              styles.continueButton,
              {
                backgroundColor: canContinue
                  ? colors.primary
                  : colors.disabledBackground,
                opacity: pressed && canContinue ? 0.9 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color: canContinue ? "#FFFFFF" : colors.disabledText,
                },
              ]}
            >
              Finish
            </Text>

            <View
              style={[
                styles.continueIcon,
                {
                  backgroundColor: canContinue
                    ? "rgba(255,255,255,0.15)"
                    : isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(15,23,42,0.04)",
                },
              ]}
            >
              <Ionicons
                name="checkmark"
                size={17}
                color={canContinue ? "#FFFFFF" : colors.disabledText}
              />
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    minHeight: 62,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
  },

  headerSpacer: {
    width: 42,
    height: 42,
  },

  /* =========================
      SCROLL
  ========================= */

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },

  /* =========================
      PROGRESS
  ========================= */

  progressSection: {
    width: "100%",
  },

  progressTrack: {
    width: "100%",
    height: 7,
    borderRadius: 4,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  progressLabels: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressText: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "600",
  },

  /* =========================
      INTRO
  ========================= */

  intro: {
    marginTop: 28,
    paddingBottom: 19,
  },

  eyebrow: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 8,
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -1,
  },

  description: {
    marginTop: 7,
    maxWidth: 355,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },

  /* =========================
      SEARCH
  ========================= */

  searchBox: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 9,
    paddingVertical: 0,
    fontSize: 14.5,
    fontWeight: "500",
  },

  searchClear: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      GOALS CARD
  ========================= */

  goalsCard: {
    marginTop: 17,
    borderWidth: 1,
    borderRadius: 17,
    padding: 13,
  },

  goalsHeader: {
    marginBottom: 11,
  },

  goalsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  goalsTitle: {
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "800",
  },

  goalsOptional: {
    fontSize: 10,
    fontWeight: "600",
  },

  goalsDescription: {
    marginTop: 2,
    fontSize: 10.5,
    lineHeight: 15,
  },

  goalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  goalCard: {
    width: "48.3%",
    minHeight: 44,
    borderRadius: 11,
    borderWidth: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  goalIcon: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  goalText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
  },

  goalCheck: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },

  /* =========================
      SELECTION STATUS
  ========================= */

  selectionStatus: {
    marginTop: 23,
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectionTextArea: {
    flex: 1,
  },

  selectionTitle: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "800",
    letterSpacing: -0.2,
  },

  selectionSubtitle: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "500",
  },

  selectionBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  selectionCount: {
    fontSize: 13,
    fontWeight: "800",
  },

  /* =========================
      CATEGORIES
  ========================= */

  categorySection: {
    marginTop: 23,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  categoryHeaderText: {
    flex: 1,
  },

  categoryTitle: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700",
    letterSpacing: -0.15,
  },

  categoryDescription: {
    marginTop: 2,
    fontSize: 10.5,
    lineHeight: 15,
    fontWeight: "500",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    minHeight: 38,
    borderRadius: 11,
    borderWidth: 1,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 8,
  },

  chipText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },

  chipCheck: {
    marginLeft: 5,
  },

  /* =========================
      EMPTY STATE
  ========================= */

  emptyState: {
    alignItems: "center",
    paddingVertical: 65,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "700",
  },

  emptyDescription: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
  },

  /* =========================
      FOOTER
  ========================= */

  footer: {
    minHeight: 72,
    paddingHorizontal: 18,
    paddingTop: 9,
    paddingBottom: 9,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },

  footerMeta: {
    flex: 1,
  },

  footerCount: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  footerHint: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "600",
  },

  continueButton: {
    width: 128,
    height: 50,
    borderRadius: 25,
    paddingLeft: 18,
    paddingRight: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  continueText: {
    fontSize: 14.5,
    fontWeight: "800",
  },

  continueIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
