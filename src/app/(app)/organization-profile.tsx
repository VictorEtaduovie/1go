import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { themes, type ThemeColors } from "@/theme/colors";

type ProfileTab = "Posts" | "Rooms" | "About";

type OrganizationPost = {
  id: string;
  text: string;
  time: string;
  likes: string;
  comments: string;
  hasImage: boolean;
};

type OrganizationRoom = {
  id: string;
  name: string;
  status: "Live now" | "Upcoming" | "Active";
  people: string;
};

const organization = {
  name: "SmartTech",
  handle: "@smarttech",
  description: "Technology • Innovation • Education",
  followers: "12.4k",
  verified: true,
};

const currentRoom = {
  id: "smarttech-live",
  name: "Ask SmartTech Anything",
  people: "542 people talking",
};

const posts: OrganizationPost[] = [
  {
    id: "smarttech-post-1",
    text: "We're thrilled to announce our new AI education program. Learn, grow, and build the future with us! 🚀",
    time: "2h",
    likes: "328",
    comments: "46",
    hasImage: true,
  },
  {
    id: "smarttech-post-2",
    text: "Technology should make learning more accessible, more engaging, and more connected.",
    time: "6h",
    likes: "184",
    comments: "21",
    hasImage: false,
  },
];

const rooms: OrganizationRoom[] = [
  {
    id: "smarttech-room-1",
    name: "Ask SmartTech Anything",
    status: "Live now",
    people: "542 people",
  },
  {
    id: "smarttech-room-2",
    name: "Technology & Innovation",
    status: "Upcoming",
    people: "128 people",
  },
  {
    id: "smarttech-room-3",
    name: "Education for the Future",
    status: "Active",
    people: "76 people",
  },
];

export default function OrganizationProfileScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  /* =========================
      ACTIONS
  ========================= */

  const handleBackPress = () => {
    router.back();
  };

  const handleFollow = () => {
    setIsFollowing((current) => !current);
  };

  const handleMessage = () => {
    router.push("../messages");
  };

  const handleCurrentRoomPress = () => {
    console.log("Open organization room:", currentRoom.id);
  };

  const handleJoinRoom = () => {
    console.log("Join organization room:", currentRoom.id);
  };

  const handlePostPress = (postId: string) => {
    console.log("Open organization post:", postId);
  };

  const handleRoomPress = (roomId: string) => {
    console.log("Open organization room:", roomId);
  };

  const handleMorePress = () => {
    console.log("More options for organization:", organization.handle);
  };

  const handleForYouPress = () => {
    router.push("../for-you");
  };

  const handleDiscoverPress = () => {
    router.push("../explore");
  };

  const handleMessagesPress = () => {
    router.push("../messages");
  };

  const handlePlusPress = () => {
    // Connect this to the existing + creation sheet.
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.flex}>
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: 105,
            },
          ]}
        >
          {/* =========================
              COVER + TOP BAR
          ========================= */}
          <View style={styles.coverContainer}>
            <View
              style={[
                styles.coverImage,
                {
                  backgroundColor: isDark
                    ? colors.surface
                    : colors.disabledBackground,
                },
              ]}
            >
              <View
                style={[
                  styles.coverGlowLarge,
                  {
                    backgroundColor: isDark
                      ? "rgba(0,153,255,0.12)"
                      : "rgba(0,153,255,0.08)",
                  },
                ]}
              />

              <View
                style={[
                  styles.coverGlowSmall,
                  {
                    backgroundColor: isDark
                      ? "rgba(0,204,153,0.12)"
                      : "rgba(0,204,153,0.08)",
                  },
                ]}
              />

              <Ionicons
                name="hardware-chip-outline"
                size={34}
                color={colors.textSecondary}
              />
            </View>

            {/* Back */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleBackPress}
              style={[
                styles.coverBackButton,
                {
                  backgroundColor: isDark
                    ? "rgba(20,26,45,0.88)"
                    : "rgba(255,255,255,0.92)",
                },
              ]}
            >
              <Ionicons
                name="chevron-back"
                size={25}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            {/* More */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleMorePress}
              style={[
                styles.moreButton,
                {
                  backgroundColor: isDark
                    ? "rgba(20,26,45,0.88)"
                    : "rgba(255,255,255,0.92)",
                },
              ]}
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={22}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* =========================
              ORGANIZATION SUMMARY
          ========================= */}
          <View
            style={[
              styles.profileSummary,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {/* Organization logo */}
            <View
              style={[
                styles.logoOuter,
                {
                  backgroundColor: colors.background,
                },
              ]}
            >
              <View
                style={[
                  styles.logo,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={42}
                  color="#FFFFFF"
                />
              </View>
            </View>

            {/* Identity */}
            <View style={styles.identityBlock}>
              <View style={styles.nameRow}>
                <Text
                  style={[
                    styles.profileName,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  {organization.name}
                </Text>

                {organization.verified && (
                  <View
                    style={[
                      styles.verifiedBadge,
                      {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.handle,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {organization.handle}
              </Text>

              <Text
                style={[
                  styles.bio,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {organization.description}
              </Text>

              <Text
                style={[
                  styles.followers,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {organization.followers} Followers
              </Text>
            </View>

            {/* =========================
                FOLLOW / MESSAGE
            ========================= */}
            <View style={styles.profileActions}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleFollow}
                style={[
                  styles.followButton,
                  {
                    backgroundColor: isFollowing
                      ? colors.disabledBackground
                      : colors.primary,
                    borderColor: isFollowing ? colors.border : colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.followButtonText,
                    {
                      color: isFollowing ? colors.textPrimary : "#FFFFFF",
                    },
                  ]}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleMessage}
                style={[
                  styles.messageButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={17}
                  color={colors.primary}
                />

                <Text
                  style={[
                    styles.messageButtonText,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>

            {/* =========================
                PROFILE TABS
            ========================= */}
            <View
              style={[
                styles.profileTabs,
                {
                  borderBottomColor: colors.divider,
                },
              ]}
            >
              {(["Posts", "Rooms", "About"] as ProfileTab[]).map((tab) => {
                const active = activeTab === tab;

                return (
                  <TouchableOpacity
                    key={tab}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab)}
                    style={styles.profileTab}
                  >
                    <Text
                      style={[
                        styles.profileTabText,
                        {
                          color: active ? colors.primary : colors.textSecondary,
                        },
                      ]}
                    >
                      {tab}
                    </Text>

                    {active && (
                      <View
                        style={[
                          styles.profileTabIndicator,
                          {
                            backgroundColor: colors.primary,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* =========================
              POSTS
          ========================= */}
          {activeTab === "Posts" && (
            <View
              style={[
                styles.postsContainer,
                {
                  paddingHorizontal: horizontalPadding,
                },
              ]}
            >
              {/* LIVE NOW */}
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

              <View
                style={[
                  styles.currentRoomCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleCurrentRoomPress}
                  style={styles.currentRoomMain}
                >
                  <View
                    style={[
                      styles.currentRoomImage,
                      {
                        backgroundColor: colors.disabledBackground,
                      },
                    ]}
                  >
                    <Ionicons
                      name="radio-outline"
                      size={25}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.currentRoomContent}>
                    <View style={styles.currentRoomTitleRow}>
                      <View
                        style={[
                          styles.liveDot,
                          {
                            backgroundColor: colors.online,
                          },
                        ]}
                      />

                      <Text
                        style={[
                          styles.liveText,
                          {
                            color: colors.online,
                          },
                        ]}
                      >
                        LIVE
                      </Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      style={[
                        styles.currentRoomName,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      {currentRoom.name}
                    </Text>

                    <Text
                      style={[
                        styles.currentRoomPeople,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {currentRoom.people}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleJoinRoom}
                  style={[
                    styles.joinButton,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  <Text style={styles.joinButtonText}>Join Room</Text>
                </TouchableOpacity>
              </View>

              {/* LATEST POST */}
              <Text
                style={[
                  styles.latestPostTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Latest Post
              </Text>

              {posts.map((post) => (
                <OrganizationPostCard
                  key={post.id}
                  post={post}
                  colors={colors}
                  isDark={isDark}
                  onPress={() => handlePostPress(post.id)}
                />
              ))}
            </View>
          )}

          {/* =========================
              ROOMS
          ========================= */}
          {activeTab === "Rooms" && (
            <View
              style={[
                styles.roomsContainer,
                {
                  paddingHorizontal: horizontalPadding,
                },
              ]}
            >
              {rooms.map((room) => (
                <OrganizationRoomCard
                  key={room.id}
                  room={room}
                  colors={colors}
                  onPress={() => handleRoomPress(room.id)}
                />
              ))}
            </View>
          )}

          {/* =========================
              ABOUT
          ========================= */}
          {activeTab === "About" && (
            <View
              style={[
                styles.aboutContainer,
                {
                  paddingHorizontal: horizontalPadding,
                },
              ]}
            >
              <AboutRow
                icon="business-outline"
                title="Organization"
                value={organization.name}
                colors={colors}
              />

              <AboutRow
                icon="person-outline"
                title="Username"
                value={organization.handle}
                colors={colors}
              />

              <AboutRow
                icon="briefcase-outline"
                title="Category"
                value="Technology, Innovation & Education"
                colors={colors}
              />

              <AboutRow
                icon="globe-outline"
                title="Website"
                value="smarttech.com"
                colors={colors}
              />
            </View>
          )}
        </ScrollView>

        {/* =========================
            BOTTOM NAVIGATION
        ========================= */}
        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.divider,
            },
          ]}
        >
          <BottomNavItem
            icon="home-outline"
            label="For You"
            active={false}
            colors={colors}
            onPress={handleForYouPress}
          />

          <BottomNavItem
            icon="search-outline"
            label="Discover"
            active={false}
            colors={colors}
            onPress={handleDiscoverPress}
          />

          <View style={styles.plusNavSlot}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handlePlusPress}
              style={[
                styles.plusButton,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="add" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <BottomNavItem
            icon="chatbubbles-outline"
            label="Messages"
            active={false}
            colors={colors}
            onPress={handleMessagesPress}
          />

          <BottomNavItem
            icon="person-outline"
            label="Profile"
            active={true}
            colors={colors}
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
    ORGANIZATION POST
========================= */

function OrganizationPostCard({
  post,
  colors,
  isDark,
  onPress,
}: {
  post: OrganizationPost;
  colors: ThemeColors;
  isDark: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.postCard,
        {
          backgroundColor: colors.background,
          borderColor: colors.divider,
        },
      ]}
    >
      <View style={styles.postHeader}>
        <View
          style={[
            styles.postAvatar,
            {
              backgroundColor: colors.disabledBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={21}
            color={colors.primary}
          />
        </View>

        <View style={styles.postIdentity}>
          <View style={styles.postNameRow}>
            <Text
              style={[
                styles.postName,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              {organization.name}
            </Text>

            <View
              style={[
                styles.smallVerifiedBadge,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="checkmark" size={8} color="#FFFFFF" />
            </View>
          </View>

          <Text
            style={[
              styles.postMeta,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {organization.handle} • {post.time}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
          style={styles.postMoreButton}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={21}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

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

      {post.hasImage && (
        <View
          style={[
            styles.postImage,
            {
              backgroundColor: isDark
                ? colors.surface
                : colors.disabledBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="image-outline"
            size={36}
            color={colors.textSecondary}
          />

          <View
            style={[
              styles.videoBadge,
              {
                backgroundColor: "rgba(0,0,0,0.68)",
              },
            ]}
          >
            <Ionicons name="play" size={13} color="#FFFFFF" />
          </View>
        </View>
      )}

      <View style={styles.postActions}>
        <PostAction icon="heart-outline" value={post.likes} colors={colors} />

        <PostAction
          icon="chatbubble-outline"
          value={post.comments}
          colors={colors}
        />

        <PostActionSpacer />

        <TouchableOpacity activeOpacity={0.7} style={styles.postActionButton}>
          <Ionicons
            name="bookmark-outline"
            size={21}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

/* =========================
    POST ACTION
========================= */

function PostAction({
  icon,
  value,
  colors,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
  colors: ThemeColors;
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.postActionButton}>
      <Ionicons name={icon} size={21} color={colors.textSecondary} />

      <Text
        style={[
          styles.postActionValue,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
}

function PostActionSpacer() {
  return <View style={styles.postActionSpacer} />;
}

/* =========================
    ORGANIZATION ROOM
========================= */

function OrganizationRoomCard({
  room,
  colors,
  onPress,
}: {
  room: OrganizationRoom;
  colors: ThemeColors;
  onPress: () => void;
}) {
  const isLive = room.status === "Live now";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.organizationRoomCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.organizationRoomIcon,
          {
            backgroundColor: colors.disabledBackground,
          },
        ]}
      >
        <Ionicons name="radio-outline" size={24} color={colors.primary} />

        {isLive && (
          <View
            style={[
              styles.organizationRoomLiveDot,
              {
                backgroundColor: colors.online,
                borderColor: colors.surface,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.organizationRoomContent}>
        <Text
          style={[
            styles.organizationRoomName,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {room.name}
        </Text>

        <View style={styles.organizationRoomMeta}>
          <View
            style={[
              styles.organizationRoomStatusDot,
              {
                backgroundColor: isLive ? colors.online : colors.textSecondary,
              },
            ]}
          />

          <Text
            style={[
              styles.organizationRoomStatus,
              {
                color: isLive ? colors.online : colors.textSecondary,
              },
            ]}
          >
            {room.status}
          </Text>

          <Text
            style={[
              styles.organizationRoomPeople,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {room.people}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

/* =========================
    ABOUT ROW
========================= */

function AboutRow({
  icon,
  title,
  value,
  colors,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  value: string;
  colors: ThemeColors;
}) {
  return (
    <View
      style={[
        styles.aboutRow,
        {
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <Ionicons name={icon} size={21} color={colors.textSecondary} />

      <View style={styles.aboutContent}>
        <Text
          style={[
            styles.aboutTitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.aboutValue,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

/* =========================
    BOTTOM NAV ITEM
========================= */

function BottomNavItem({
  icon,
  label,
  active,
  colors,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  active: boolean;
  colors: ThemeColors;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.navItem}
    >
      <Ionicons
        name={icon}
        size={27}
        color={active ? colors.primary : colors.textPrimary}
      />

      <Text
        style={[
          styles.navLabel,
          {
            color: active ? colors.primary : colors.textPrimary,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* =========================
      COVER
  ========================= */

  coverContainer: {
    height: 195,
    position: "relative",
  },

  coverImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  coverGlowLarge: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    right: -70,
    top: -80,
  },

  coverGlowSmall: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    left: -60,
    bottom: -90,
  },

  coverBackButton: {
    position: "absolute",
    top: 14,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  moreButton: {
    position: "absolute",
    top: 14,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      SUMMARY
  ========================= */

  profileSummary: {
    paddingTop: 25,
  },

  logoOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -72,
  },

  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  identityBlock: {
    marginTop: 12,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileName: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
  },

  verifiedBadge: {
    width: 19,
    height: 19,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  handle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "500",
  },

  bio: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  followers: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  /* =========================
      ACTIONS
  ========================= */

  profileActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 17,
  },

  followButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  followButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  messageButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  messageButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  /* =========================
      TABS
  ========================= */

  profileTabs: {
    height: 57,
    flexDirection: "row",
    borderBottomWidth: 1,
    marginTop: 18,
  },

  profileTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  profileTabText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  profileTabIndicator: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: -1,
    height: 3,
    borderRadius: 3,
  },

  /* =========================
      POSTS
  ========================= */

  postsContainer: {
    paddingTop: 4,
  },

  sectionTitle: {
    marginTop: 15,
    marginBottom: 9,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },

  currentRoomCard: {
    minHeight: 92,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  currentRoomMain: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  currentRoomImage: {
    width: 62,
    height: 62,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  currentRoomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
  },

  currentRoomTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  liveText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
  },

  currentRoomName: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "800",
  },

  currentRoomPeople: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },

  joinButton: {
    minWidth: 96,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    marginLeft: 10,
  },

  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },

  latestPostTitle: {
    marginTop: 21,
    marginBottom: 9,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  postCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 4,
    marginBottom: 12,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  postAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "800",
  },

  smallVerifiedBadge: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  postMeta: {
    marginTop: 1,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
  },

  postMoreButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  postText: {
    marginTop: 11,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
  },

  postImage: {
    width: "100%",
    height: 190,
    marginTop: 12,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  videoBadge: {
    position: "absolute",
    right: 10,
    bottom: 10,
    minWidth: 39,
    height: 28,
    borderRadius: 14,
    paddingHorizontal: 9,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  postActions: {
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
  },

  postActionButton: {
    minWidth: 58,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 6,
  },

  postActionValue: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  postActionSpacer: {
    flex: 1,
  },

  /* =========================
      ROOMS
  ========================= */

  roomsContainer: {
    paddingTop: 15,
  },

  organizationRoomCard: {
    minHeight: 78,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  organizationRoomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  organizationRoomLiveDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -1,
    bottom: -1,
    borderWidth: 2,
  },

  organizationRoomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  organizationRoomName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  organizationRoomMeta: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  organizationRoomStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  organizationRoomStatus: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "700",
  },

  organizationRoomPeople: {
    marginLeft: 9,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
  },

  /* =========================
      ABOUT
  ========================= */

  aboutContainer: {
    paddingTop: 5,
  },

  aboutRow: {
    minHeight: 74,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  aboutContent: {
    flex: 1,
    marginLeft: 13,
  },

  aboutTitle: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
  },

  aboutValue: {
    marginTop: 3,
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "700",
  },

  /* =========================
      BOTTOM NAV
  ========================= */

  bottomNav: {
    minHeight: 78,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },

  navItem: {
    flex: 1,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "700",
  },

  plusNavSlot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 78,
  },

  plusButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
});
