import React, { useMemo, useState } from "react";
import {
  Image,
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
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { themes } from "@/theme/colors";

const electricAzure = themes.electricAzure;

type DiscoveryCategory =
  | "live"
  | "rooms"
  | "people"
  | "organizations"
  | "topics";

type Room = {
  id: string;
  name: string;
  description: string;
  people: number;
};

type Person = {
  id: string;
  name: string;
  username: string;
  followers: string;
};

type Organization = {
  id: string;
  name: string;
  category: string;
  followers: string;
};

const liveRooms: Room[] = [
  {
    id: "dating",
    name: "Dating & Relationships",
    description: "Real conversations about love",
    people: 91,
  },
  {
    id: "music-talk",
    name: "Music Talk",
    description: "Talk about music and artists",
    people: 37,
  },
];

const roomsForYou: Room[] = [
  {
    id: "movies",
    name: "Movie & Series Talk",
    description: "Movie lovers community",
    people: 42,
  },
  {
    id: "fitness",
    name: "Fitness & Wellness",
    description: "Health, fitness and lifestyle",
    people: 36,
  },
  {
    id: "business",
    name: "Business & Startups",
    description: "Ideas, learning, growth",
    people: 28,
  },
];

const peopleToMeet: Person[] = [
  {
    id: "alex",
    name: "Alex Rivers",
    username: "@alexrivers",
    followers: "3.5K followers",
  },
  {
    id: "maya",
    name: "Maya Carter",
    username: "@mayacarter",
    followers: "1.8K followers",
  },
];

const organizations: Organization[] = [
  {
    id: "smarttech",
    name: "SmartTech",
    category: "Technology & Innovation",
    followers: "12.4K followers",
  },
  {
    id: "nike",
    name: "Nike",
    category: "Sports & Lifestyle",
    followers: "8.7K followers",
  },
];

const topics = ["Music", "Sports", "Gaming", "Career", "Fun", "Life"];

const categoryItems: {
  id: DiscoveryCategory;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: "live",
    label: "Live",
    icon: "radio-outline",
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: "chatbubbles-outline",
  },
  {
    id: "people",
    label: "People",
    icon: "people-outline",
  },
  {
    id: "organizations",
    label: "Organizations",
    icon: "business-outline",
  },
  {
    id: "topics",
    label: "Topics",
    icon: "pricetags-outline",
  },
];

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const [search, setSearch] = useState("");
  const [followedPeople, setFollowedPeople] = useState<string[]>([]);
  const [followedOrganizations, setFollowedOrganizations] = useState<string[]>(
    [],
  );

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(18, Math.min(24, width * 0.055));

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return roomsForYou;
    }

    return roomsForYou.filter(
      (room) =>
        room.name.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query),
    );
  }, [search]);

  const filteredPeople = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return peopleToMeet;
    }

    return peopleToMeet.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.username.toLowerCase().includes(query),
    );
  }, [search]);

  const filteredOrganizations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return organizations;
    }

    return organizations.filter(
      (organization) =>
        organization.name.toLowerCase().includes(query) ||
        organization.category.toLowerCase().includes(query),
    );
  }, [search]);

  const togglePersonFollow = (id: string) => {
    setFollowedPeople((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const toggleOrganizationFollow = (id: string) => {
    setFollowedOrganizations((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleForYouPress = () => {
    router.push("/(app)/for-you");
  };

  const handleRoomPress = () => {
    router.push("/rooms");
  };

  const handleCategoryPress = (category: DiscoveryCategory) => {
    if (category === "live" || category === "rooms") {
      router.push("/rooms");
      return;
    }

    /*
      People, Organizations and Topics will get their own
      discovery destinations when those route files are created.
    */
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
      edges={["top", "bottom"]}
    >
      <View style={styles.container}>
        {/* =========================
            MAIN CONTENT
        ========================= */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: isVerySmallScreen ? 15 : 22,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* =========================
              HEADER
          ========================= */}
          <Text
            style={[
              styles.title,
              {
                color: colors.textPrimary,
                fontSize: isVerySmallScreen ? 29 : isSmallScreen ? 31 : 33,
              },
            ]}
          >
            Discover
          </Text>

          {/* =========================
              SEARCH
          ========================= */}
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={21}
              color={colors.textSecondary}
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search people, rooms, organizations..."
              placeholderTextColor={colors.disabledText}
              autoCapitalize="none"
              autoCorrect={false}
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
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                hitSlop={8}
                onPress={() => setSearch("")}
                style={styles.clearButton}
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
              DISCOVERY CATEGORIES
          ========================= */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categoryItems.map((item, index) => {
              const isBlue = index < 3;

              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  onPress={() => handleCategoryPress(item.id)}
                  style={({ pressed }) => [
                    styles.categoryItem,
                    {
                      opacity: pressed ? 0.78 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor: isBlue
                          ? colors.primary
                          : colors.accent,
                      },
                    ]}
                  >
                    <Ionicons name={item.icon} size={23} color="#FFFFFF" />
                  </View>

                  <Text
                    style={[
                      styles.categoryLabel,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* =========================
              LIVE NOW
          ========================= */}
          <View
            style={[
              styles.section,
              {
                marginTop: isVerySmallScreen ? 18 : 22,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleGroup}>
                <View
                  style={[
                    styles.liveDot,
                    {
                      backgroundColor:
                        colorScheme === "dark" ? "#EF4444" : "#DC2626",
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  LIVE NOW
                </Text>
              </View>

              <Text
                style={[
                  styles.viewAll,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                View all
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalSection}
            >
              {liveRooms.map((room) => (
                <Pressable
                  key={room.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Join ${room.name}`}
                  onPress={handleRoomPress}
                  style={({ pressed }) => [
                    styles.liveRoomCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      opacity: pressed ? 0.88 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.liveRoomImage,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Image
                      source={require("@/assets/images/icon.png")}
                      style={styles.liveRoomImageAsset}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.liveRoomInfo}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.liveRoomName,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      {room.name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={[
                        styles.liveRoomDescription,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {room.description}
                    </Text>

                    <View style={styles.roomMeta}>
                      <View
                        style={[
                          styles.liveBadge,
                          {
                            backgroundColor:
                              colorScheme === "dark" ? "#EF4444" : "#DC2626",
                          },
                        ]}
                      >
                        <View style={styles.liveBadgeDot} />

                        <Text style={styles.liveBadgeText}>LIVE</Text>
                      </View>

                      <Ionicons
                        name="people-outline"
                        size={14}
                        color={colors.textSecondary}
                        style={styles.peopleIcon}
                      />

                      <Text
                        style={[
                          styles.roomPeople,
                          {
                            color: colors.textSecondary,
                          },
                        ]}
                      >
                        {room.people}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* =========================
              ROOMS FOR YOU
          ========================= */}
          <View
            style={[
              styles.section,
              {
                marginTop: isVerySmallScreen ? 18 : 22,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                ROOMS FOR YOU
              </Text>

              <Text
                style={[
                  styles.viewAll,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                View all
              </Text>
            </View>

            <View style={styles.roomsList}>
              {filteredRooms.map((room) => (
                <Pressable
                  key={room.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${room.name}`}
                  onPress={handleRoomPress}
                  style={({ pressed }) => [
                    styles.roomRow,
                    {
                      opacity: pressed ? 0.82 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.roomThumbnail,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Image
                      source={require("@/assets/images/icon.png")}
                      style={styles.roomThumbnailImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.roomRowInfo}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.roomRowName,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      {room.name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={[
                        styles.roomRowDescription,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {room.description}
                    </Text>

                    <Text
                      style={[
                        styles.roomRowPeople,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {room.people} people
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* =========================
              TRENDING TOPICS
          ========================= */}
          <View
            style={[
              styles.section,
              {
                marginTop: isVerySmallScreen ? 20 : 25,
              },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              TRENDING TOPICS
            </Text>

            <View style={styles.topicContainer}>
              {topics.map((topic) => (
                <Pressable
                  key={topic}
                  accessibilityRole="button"
                  accessibilityLabel={`Explore ${topic}`}
                  style={({ pressed }) => [
                    styles.topicChip,
                    {
                      backgroundColor:
                        colorScheme === "dark"
                          ? colors.surface
                          : colors.disabledBackground,
                      borderColor: colors.border,
                      opacity: pressed ? 0.78 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.topicText,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    {topic}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* =========================
              PEOPLE TO MEET
          ========================= */}
          <View
            style={[
              styles.section,
              {
                marginTop: isVerySmallScreen ? 21 : 27,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                PEOPLE TO MEET
              </Text>

              <Text
                style={[
                  styles.viewAll,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                View all
              </Text>
            </View>

            <View style={styles.peopleList}>
              {filteredPeople.map((person) => {
                const isFollowed = followedPeople.includes(person.id);

                return (
                  <View key={person.id} style={styles.personRow}>
                    <View
                      style={[
                        styles.personAvatar,
                        {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Image
                        source={require("@/assets/images/icon.png")}
                        style={styles.personAvatarImage}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.personInfo}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.personName,
                          {
                            color: colors.textPrimary,
                          },
                        ]}
                      >
                        {person.name}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={[
                          styles.personMeta,
                          {
                            color: colors.textSecondary,
                          },
                        ]}
                      >
                        {person.username} · {person.followers}
                      </Text>
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        isFollowed
                          ? `Unfollow ${person.name}`
                          : `Follow ${person.name}`
                      }
                      onPress={() => togglePersonFollow(person.id)}
                      style={({ pressed }) => [
                        styles.followButton,
                        {
                          backgroundColor: isFollowed
                            ? colors.surface
                            : colors.primary,
                          borderColor: colors.primary,
                          opacity: pressed ? 0.8 : 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.followButtonText,
                          {
                            color: isFollowed ? colors.primary : "#FFFFFF",
                          },
                        ]}
                      >
                        {isFollowed ? "Following" : "Follow"}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>

          {/* =========================
              ORGANIZATIONS
          ========================= */}
          <View
            style={[
              styles.section,
              {
                marginTop: isVerySmallScreen ? 21 : 27,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                ORGANIZATIONS
              </Text>

              <Text
                style={[
                  styles.viewAll,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                View all
              </Text>
            </View>

            <View style={styles.peopleList}>
              {filteredOrganizations.map((organization) => {
                const isFollowed = followedOrganizations.includes(
                  organization.id,
                );

                return (
                  <View key={organization.id} style={styles.personRow}>
                    <View
                      style={[
                        styles.organizationAvatar,
                        {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Image
                        source={require("@/assets/images/icon.png")}
                        style={styles.organizationImage}
                        resizeMode="contain"
                      />
                    </View>

                    <View style={styles.personInfo}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.personName,
                          {
                            color: colors.textPrimary,
                          },
                        ]}
                      >
                        {organization.name}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={[
                          styles.personMeta,
                          {
                            color: colors.textSecondary,
                          },
                        ]}
                      >
                        {organization.category} · {organization.followers}
                      </Text>
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        isFollowed
                          ? `Unfollow ${organization.name}`
                          : `Follow ${organization.name}`
                      }
                      onPress={() => toggleOrganizationFollow(organization.id)}
                      style={({ pressed }) => [
                        styles.followButton,
                        {
                          backgroundColor: isFollowed
                            ? colors.surface
                            : colors.primary,
                          borderColor: colors.primary,
                          opacity: pressed ? 0.8 : 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.followButtonText,
                          {
                            color: isFollowed ? colors.primary : "#FFFFFF",
                          },
                        ]}
                      >
                        {isFollowed ? "Following" : "Follow"}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* =========================
            BOTTOM NAVIGATION
        ========================= */}
        <View
          style={[
            styles.bottomNavigation,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.divider,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="For You"
            onPress={handleForYouPress}
            style={styles.navigationItem}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={colors.textSecondary}
            />

            <Text
              style={[
                styles.navigationLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              For You
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Discover"
            style={styles.navigationItem}
          >
            <Ionicons name="search" size={25} color={colors.primary} />

            <Text
              style={[
                styles.navigationLabel,
                {
                  color: colors.primary,
                },
              ]}
            >
              Discover
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Create"
            style={styles.createNavigationItem}
          >
            <View
              style={[
                styles.createButton,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="add" size={31} color="#FFFFFF" />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Messages"
            style={styles.navigationItem}
          >
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={colors.textSecondary}
            />

            <Text
              style={[
                styles.navigationLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Messages
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            style={styles.navigationItem}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={colors.textSecondary}
            />

            <Text
              style={[
                styles.navigationLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  /* =========================
      MAIN CONTENT
  ========================= */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 8,
  },

  /* =========================
      HEADER
  ========================= */

  title: {
    fontWeight: "900",
    lineHeight: 40,
    letterSpacing: -0.8,
  },

  /* =========================
      SEARCH
  ========================= */

  searchContainer: {
    height: 49,
    marginTop: 11,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    paddingVertical: 0,
    marginLeft: 9,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  clearButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      CATEGORY ROW
  ========================= */

  categoriesContent: {
    paddingTop: 16,
    paddingBottom: 2,
    paddingRight: 5,
    gap: 18,
  },

  categoryItem: {
    width: 61,
    alignItems: "center",
  },

  categoryIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryLabel: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "700",
  },

  /* =========================
      SECTIONS
  ========================= */

  section: {
    width: "100%",
  },

  sectionHeader: {
    minHeight: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  sectionTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    letterSpacing: 0.1,
  },

  viewAll: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "800",
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  /* =========================
      LIVE NOW
  ========================= */

  horizontalSection: {
    gap: 20,
  },

  liveRoomCard: {
    width: 270,
    minHeight: 91,
    padding: 7,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  liveRoomImage: {
    width: 84,
    height: 84,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  liveRoomImageAsset: {
    width: "100%",
    height: "100%",
  },

  liveRoomInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
  },

  liveRoomName: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: "800",
  },

  liveRoomDescription: {
    marginTop: 2,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
  },

  roomMeta: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  liveBadge: {
    height: 22,
    paddingHorizontal: 7,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  liveBadgeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    marginRight: 4,
  },

  liveBadgeText: {
    color: "#FFFFFF",
    fontSize: 9.5,
    lineHeight: 13,
    fontWeight: "900",
  },

  peopleIcon: {
    marginLeft: 7,
  },

  roomPeople: {
    marginLeft: 3,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "600",
  },

  /* =========================
      ROOMS FOR YOU
  ========================= */

  roomsList: {
    width: "100%",
  },

  roomRow: {
    width: "100%",
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  roomThumbnail: {
    width: 59,
    height: 59,
    borderRadius: 11,
    borderWidth: 1,
    overflow: "hidden",
  },

  roomThumbnailImage: {
    width: "100%",
    height: "100%",
  },

  roomRowInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  roomRowName: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: "800",
  },

  roomRowDescription: {
    marginTop: 2,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
  },

  roomRowPeople: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
  },

  /* =========================
      TOPICS
  ========================= */

  topicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 9,
  },

  topicChip: {
    minHeight: 37,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  topicText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  /* =========================
      PEOPLE / ORGANIZATIONS
  ========================= */

  peopleList: {
    width: "100%",
  },

  personRow: {
    width: "100%",
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  personAvatar: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  personAvatarImage: {
    width: "100%",
    height: "100%",
  },

  organizationAvatar: {
    width: 49,
    height: 49,
    borderRadius: 13,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  organizationImage: {
    width: 31,
    height: 31,
  },

  personInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
    marginRight: 10,
  },

  personName: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: "800",
  },

  personMeta: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "500",
  },

  followButton: {
    minWidth: 77,
    height: 35,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  followButtonText: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "800",
  },

  /* =========================
      BOTTOM NAVIGATION
  ========================= */

  bottomNavigation: {
    height: 73,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },

  navigationItem: {
    flex: 1,
    height: 67,
    alignItems: "center",
    justifyContent: "center",
  },

  navigationLabel: {
    marginTop: 3,
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "700",
  },

  createNavigationItem: {
    width: 70,
    height: 67,
    alignItems: "center",
    justifyContent: "center",
  },

  createButton: {
    width: 51,
    height: 51,
    borderRadius: 25.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
