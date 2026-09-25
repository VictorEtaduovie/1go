import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { themes } from "@/theme/colors";

const electricAzure = themes.electricAzure;

type FeedTab = "forYou" | "following";

type Room = {
  id: string;
  name: string;
  people: number;
};

type Post = {
  id: string;
  name: string;
  username: string;
  time: string;
  verified?: boolean;
  text: string;
  likes: number;
  comments: number;
  hasRoomAction?: boolean;
};

const liveRooms: Room[] = [
  {
    id: "tech-talk",
    name: "Tech Talk",
    people: 120,
  },
  {
    id: "music-vibes",
    name: "Music Vibes",
    people: 84,
  },
  {
    id: "career-growth",
    name: "Career Growth",
    people: 54,
  },
];

const posts: Post[] = [
  {
    id: "sarah-update",
    name: "Sarah Johnson",
    username: "@sarah",
    time: "12m",
    verified: true,
    text: "The new update is amazing! 🚀\nReally excited about what's coming next.",
    likes: 24,
    comments: 8,
    hasRoomAction: true,
  },
  {
    id: "techworld-update",
    name: "TechWorld",
    username: "@techworld",
    time: "28m",
    verified: true,
    text: "Innovation isn't just about technology.\nIt's about people. Great things happen when communities build together. 💡",
    likes: 38,
    comments: 12,
  },
];

const followingPosts: Post[] = [
  {
    id: "sarah-following",
    name: "Sarah Johnson",
    username: "@sarah",
    time: "12m",
    verified: true,
    text: "The new update is amazing! 🚀\nReally excited about what's coming next.",
    likes: 24,
    comments: 8,
    hasRoomAction: true,
  },
  {
    id: "techworld-following",
    name: "TechWorld",
    username: "@techworld",
    time: "28m",
    verified: true,
    text: "Innovation isn't just about technology.\nIt's about people. Great things happen when communities build together. 💡",
    likes: 38,
    comments: 12,
  },
];

export default function ForYouScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const [activeFeed, setActiveFeed] = useState<FeedTab>("forYou");

  const horizontalPadding = Math.max(16, Math.min(22, width * 0.055));

  const feedPosts = useMemo(() => {
    return activeFeed === "forYou" ? posts : followingPosts;
  }, [activeFeed]);

  const liveColor = colorScheme === "dark" ? "#EF4444" : "#DC2626";

  const handleRoomPress = () => {
    router.push("/rooms");
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
            HEADER
        ========================= */}
        <View
          style={[
            styles.header,
            {
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          <View style={styles.logo}>
            <Text
              style={[
                styles.logoOne,
                {
                  color: colors.primary,
                },
              ]}
            >
              1
            </Text>

            <View style={styles.logoGoWrapper}>
              <Text
                style={[
                  styles.logoGo,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Go
              </Text>

              <View
                style={[
                  styles.logoAccentLine,
                  {
                    backgroundColor: colors.accent,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              hitSlop={10}
              style={styles.headerIconButton}
            >
              <Ionicons
                name="notifications-outline"
                size={25}
                color={colors.textPrimary}
              />
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Profile"
              hitSlop={8}
              style={[
                styles.headerAvatar,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.headerAvatarImage}
                resizeMode="cover"
              />
            </Pressable>
          </View>
        </View>

        {/* =========================
            FEED TABS
        ========================= */}
        <View
          style={[
            styles.feedTabs,
            {
              borderBottomColor: colors.divider,
            },
          ]}
        >
          <Pressable
            accessibilityRole="tab"
            accessibilityLabel="For You"
            accessibilityState={{
              selected: activeFeed === "forYou",
            }}
            onPress={() => setActiveFeed("forYou")}
            style={styles.feedTab}
          >
            <Text
              style={[
                styles.feedTabText,
                {
                  color:
                    activeFeed === "forYou"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              For You
            </Text>

            {activeFeed === "forYou" && (
              <View
                style={[
                  styles.feedTabActive,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityLabel="Following"
            accessibilityState={{
              selected: activeFeed === "following",
            }}
            onPress={() => setActiveFeed("following")}
            style={styles.feedTab}
          >
            <Text
              style={[
                styles.feedTabText,
                {
                  color:
                    activeFeed === "following"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              Following
            </Text>

            {activeFeed === "following" && (
              <View
                style={[
                  styles.feedTabActive,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </Pressable>
        </View>

        {/* =========================
            MAIN FEED
        ========================= */}
        <ScrollView
          style={styles.feedScroll}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* =========================
              LIVE NOW
          ========================= */}
          <View style={styles.liveSection}>
            <View
              style={[
                styles.liveHeading,
                {
                  paddingHorizontal: horizontalPadding,
                },
              ]}
            >
              <View
                style={[
                  styles.liveIndicator,
                  {
                    backgroundColor: liveColor,
                  },
                ]}
              />

              <Text
                style={[
                  styles.liveHeadingText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                LIVE NOW
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.liveRoomsContent,
                {
                  paddingLeft: horizontalPadding,
                  paddingRight: horizontalPadding,
                },
              ]}
            >
              {liveRooms.map((room, index) => (
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
                  <Image
                    source={require("@/assets/images/icon.png")}
                    style={styles.liveRoomImage}
                    resizeMode="cover"
                  />

                  <View
                    style={[
                      styles.liveRoomOverlay,
                      {
                        backgroundColor:
                          index === 0
                            ? "rgba(37, 99, 235, 0.72)"
                            : index === 1
                              ? "rgba(6, 182, 212, 0.72)"
                              : "rgba(15, 23, 42, 0.72)",
                      },
                    ]}
                  />

                  <View style={styles.liveRoomText}>
                    <Text numberOfLines={1} style={styles.liveRoomName}>
                      {room.name}
                    </Text>

                    <Text style={styles.liveRoomPeople}>
                      {room.people} people
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* =========================
              POSTS
          ========================= */}
          {feedPosts.map((post) => (
            <View
              key={post.id}
              style={[
                styles.post,
                {
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.divider,
                },
              ]}
            >
              {/* POST HEADER */}
              <View
                style={[
                  styles.postHeader,
                  {
                    paddingHorizontal: horizontalPadding,
                  },
                ]}
              >
                <View
                  style={[
                    styles.postAvatar,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Image
                    source={require("@/assets/images/icon.png")}
                    style={styles.postAvatarImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.postIdentity}>
                  <View style={styles.postNameRow}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.postName,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      {post.name}
                    </Text>

                    {post.verified && (
                      <View
                        style={[
                          styles.verifiedCircle,
                          {
                            backgroundColor: colors.primary,
                          },
                        ]}
                      >
                        <Text style={styles.verifiedCheck}>✓</Text>
                      </View>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.postMeta,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {post.username} · {post.time}
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Post options"
                  hitSlop={10}
                  style={styles.postMenu}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>

              {/* POST TEXT */}
              <View
                style={{
                  paddingHorizontal: horizontalPadding,
                }}
              >
                <Text
                  style={[
                    styles.postText,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  {post.text}
                </Text>
              </View>

              {/* POST MEDIA */}
              <View
                style={[
                  styles.postMedia,
                  {
                    marginHorizontal: horizontalPadding,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={styles.postMediaImage}
                  resizeMode="cover"
                />

                <View
                  style={[
                    styles.postMediaOverlay,
                    {
                      backgroundColor:
                        colorScheme === "dark"
                          ? "rgba(11, 16, 32, 0.18)"
                          : "rgba(255, 255, 255, 0.08)",
                    },
                  ]}
                />
              </View>

              {/* ENGAGEMENT */}
              <View
                style={[
                  styles.engagementRow,
                  {
                    paddingHorizontal: horizontalPadding,
                  },
                ]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Like"
                  style={styles.engagementButton}
                >
                  <Ionicons name="heart" size={21} color={liveColor} />

                  <Text
                    style={[
                      styles.engagementCount,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {post.likes}
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Comments"
                  style={styles.engagementButton}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color={colors.textSecondary}
                  />

                  <Text
                    style={[
                      styles.engagementCount,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {post.comments}
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Share"
                  style={[
                    styles.shareButton,
                    {
                      marginLeft: "auto",
                    },
                  ]}
                >
                  <Ionicons
                    name="share-outline"
                    size={21}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>

              {/* ROOM ACTION */}
              {post.hasRoomAction && (
                <View
                  style={{
                    paddingHorizontal: horizontalPadding,
                    paddingBottom: 17,
                  }}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Join conversation"
                    onPress={handleRoomPress}
                    style={({ pressed }) => [
                      styles.roomAction,
                      {
                        backgroundColor: pressed
                          ? colors.primaryPressed
                          : colors.primary,
                        opacity: pressed ? 0.94 : 1,
                      },
                    ]}
                  >
                    <Ionicons
                      name="chatbubbles-outline"
                      size={18}
                      color="#FFFFFF"
                    />

                    <Text style={styles.roomActionText}>
                      Join conversation (7)
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
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
            style={styles.navigationItem}
          >
            <Ionicons name="home" size={24} color={colors.primary} />

            <Text
              style={[
                styles.navigationLabel,
                {
                  color: colors.primary,
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
            <Ionicons
              name="search-outline"
              size={25}
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
              <Ionicons name="add" size={30} color="#FFFFFF" />
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
      HEADER
  ========================= */

  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  logoOne: {
    fontSize: 40,
    lineHeight: 43,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -4,
  },

  logoGoWrapper: {
    position: "relative",
    marginLeft: 1,
    paddingBottom: 3,
  },

  logoGo: {
    fontSize: 40,
    lineHeight: 43,
    fontWeight: "900",
    letterSpacing: -3,
  },

  logoAccentLine: {
    position: "absolute",
    left: 2,
    right: 2,
    bottom: 0,
    height: 2.5,
    borderRadius: 2,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  headerAvatar: {
    width: 39,
    height: 39,
    marginLeft: 7,
    borderRadius: 19.5,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  headerAvatarImage: {
    width: "100%",
    height: "100%",
  },

  /* =========================
      FEED TABS
  ========================= */

  feedTabs: {
    height: 53,
    flexDirection: "row",
    borderBottomWidth: 1,
  },

  feedTab: {
    width: 118,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  feedTabText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },

  feedTabActive: {
    position: "absolute",
    left: 17,
    right: 17,
    bottom: 0,
    height: 3,
    borderRadius: 3,
  },

  /* =========================
      FEED
  ========================= */

  feedScroll: {
    flex: 1,
  },

  feedContent: {
    paddingBottom: 8,
  },

  /* =========================
      LIVE NOW
  ========================= */

  liveSection: {
    paddingTop: 14,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },

  liveHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  liveIndicator: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginRight: 7,
  },

  liveHeadingText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    letterSpacing: -0.1,
  },

  liveRoomsContent: {
    gap: 10,
  },

  liveRoomCard: {
    width: 174,
    height: 112,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },

  liveRoomImage: {
    width: "100%",
    height: "100%",
  },

  liveRoomOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  liveRoomText: {
    position: "absolute",
    left: 12,
    right: 10,
    bottom: 10,
  },

  liveRoomName: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
  },

  liveRoomPeople: {
    marginTop: 2,
    color: "#FFFFFF",
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "600",
  },

  /* =========================
      POST
  ========================= */

  post: {
    borderBottomWidth: 1,
    paddingTop: 14,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  postAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  postAvatarImage: {
    width: "100%",
    height: "100%",
  },

  postIdentity: {
    flex: 1,
    minWidth: 0,
    marginLeft: 10,
  },

  postNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  postName: {
    flexShrink: 1,
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "800",
  },

  verifiedCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedCheck: {
    color: "#FFFFFF",
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "900",
  },

  postMeta: {
    marginTop: 1,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },

  postMenu: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  postText: {
    marginTop: 11,
    marginBottom: 11,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
  },

  postMedia: {
    height: 174,
    borderRadius: 13,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },

  postMediaImage: {
    width: "100%",
    height: "100%",
  },

  postMediaOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  /* =========================
      ENGAGEMENT
  ========================= */

  engagementRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
  },

  engagementButton: {
    minWidth: 55,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },

  engagementCount: {
    marginLeft: 5,
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  shareButton: {
    width: 42,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      ROOM ACTION
  ========================= */

  roomAction: {
    height: 45,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    borderRadius: 23,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  roomActionText: {
    marginLeft: 7,
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
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
