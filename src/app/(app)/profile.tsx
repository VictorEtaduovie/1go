import React, { useState } from "react";
import {
  Image,
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

type PostItem = {
  id: string;
  text: string;
  time: string;
  likes: string;
  comments: string;
  hasImage: boolean;
};

type ProfileRoom = {
  id: string;
  name: string;
  status: "Live now" | "Upcoming" | "Active";
  people: string;
};

const profile = {
  name: "Your Identity",
  handle: "@username",
  bio: "Building a better tomorrow, one idea at a time.",
  followers: "124",
  following: "87",
  posts: "42",
};

const posts: PostItem[] = [
  {
    id: "post-1",
    text: "Grateful for the amazing people here on 1Go. This community is special. 🙏",
    time: "1h",
    likes: "42",
    comments: "12",
    hasImage: true,
  },
  {
    id: "post-2",
    text: "Just joined a great room on tech and innovation. Who's in?",
    time: "3h",
    likes: "28",
    comments: "7",
    hasImage: true,
  },
];

const rooms: ProfileRoom[] = [
  {
    id: "profile-room-1",
    name: "Technology Room",
    status: "Live now",
    people: "124 people",
  },
  {
    id: "profile-room-2",
    name: "Ideas & Discussion",
    status: "Upcoming",
    people: "58 people",
  },
  {
    id: "profile-room-3",
    name: "Evening Conversations",
    status: "Active",
    people: "91 people",
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

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

  const handleEditPress = () => {
    console.log("Edit profile");
  };

  const handlePostPress = (postId: string) => {
    console.log("Open post:", postId);
  };

  const handleRoomPress = (roomId: string) => {
    console.log("Open room:", roomId);
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
              <Ionicons
                name="image-outline"
                size={30}
                color={colors.textSecondary}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleForYouPress}
              style={[
                styles.coverBackButton,
                {
                  backgroundColor: isDark
                    ? "rgba(20,26,45,0.88)"
                    : "rgba(255,255,255,0.9)",
                },
              ]}
            >
              <Ionicons
                name="chevron-back"
                size={25}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleEditPress}
              style={[
                styles.editButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name="create-outline"
                size={17}
                color={colors.textPrimary}
              />

              <Text
                style={[
                  styles.editButtonText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* =========================
              PROFILE SUMMARY
          ========================= */}
          <View
            style={[
              styles.profileSummary,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {/* Profile photo */}
            <View
              style={[
                styles.avatarOuter,
                {
                  backgroundColor: colors.background,
                },
              ]}
            >
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: colors.disabledBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="person"
                  size={43}
                  color={colors.textSecondary}
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
                  {profile.name}
                </Text>

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
              </View>

              <Text
                style={[
                  styles.handle,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {profile.handle}
              </Text>

              <Text
                style={[
                  styles.bio,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {profile.bio}
              </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <ProfileStat
                value={profile.followers}
                label="Followers"
                colors={colors}
              />

              <ProfileStat
                value={profile.following}
                label="Following"
                colors={colors}
              />

              <ProfileStat
                value={profile.posts}
                label="Posts"
                colors={colors}
              />
            </View>
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

          {/* =========================
              POSTS
          ========================= */}
          {activeTab === "Posts" && (
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <ProfilePost
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
                <ProfileRoomCard
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
                icon="person-outline"
                title="Username"
                value={profile.handle}
                colors={colors}
              />

              <AboutRow
                icon="chatbubble-ellipses-outline"
                title="Conversation interests"
                value="Technology, Life, Ideas"
                colors={colors}
              />

              <AboutRow
                icon="language-outline"
                title="Language"
                value="English"
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
    PROFILE STAT
========================= */

function ProfileStat({
  value,
  label,
  colors,
}: {
  value: string;
  label: string;
  colors: ThemeColors;
}) {
  return (
    <View style={styles.stat}>
      <Text
        style={[
          styles.statValue,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.statLabel,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

/* =========================
    PROFILE POST
========================= */

function ProfilePost({
  post,
  colors,
  isDark,
  onPress,
}: {
  post: PostItem;
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
          borderBottomColor: colors.divider,
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
          <Ionicons name="person" size={20} color={colors.textSecondary} />
        </View>

        <View style={styles.postIdentity}>
          <Text
            style={[
              styles.postName,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {profile.name}
          </Text>

          <Text
            style={[
              styles.postMeta,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {profile.handle} • {post.time}
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
            size={34}
            color={colors.textSecondary}
          />
        </View>
      )}

      <View style={styles.postActions}>
        <PostAction icon="heart-outline" value={post.likes} colors={colors} />

        <PostAction
          icon="chatbubble-outline"
          value={post.comments}
          colors={colors}
        />

        <View style={styles.postActionSpacer} />

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

/* =========================
    PROFILE ROOM
========================= */

function ProfileRoomCard({
  room,
  colors,
  onPress,
}: {
  room: ProfileRoom;
  colors: ThemeColors;
  onPress: () => void;
}) {
  const isLive = room.status === "Live now";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.profileRoomCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.profileRoomIcon,
          {
            backgroundColor: colors.disabledBackground,
          },
        ]}
      >
        <Ionicons name="radio-outline" size={24} color={colors.primary} />

        {isLive && (
          <View
            style={[
              styles.profileRoomLiveDot,
              {
                backgroundColor: colors.online,
                borderColor: colors.surface,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.profileRoomContent}>
        <Text
          style={[
            styles.profileRoomName,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {room.name}
        </Text>

        <View style={styles.profileRoomMeta}>
          <View
            style={[
              styles.profileRoomStatusDot,
              {
                backgroundColor: isLive ? colors.online : colors.textSecondary,
              },
            ]}
          />

          <Text
            style={[
              styles.profileRoomStatus,
              {
                color: isLive ? colors.online : colors.textSecondary,
              },
            ]}
          >
            {room.status}
          </Text>

          <Text
            style={[
              styles.profileRoomPeople,
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

  editButton: {
    position: "absolute",
    right: 18,
    bottom: -18,
    minWidth: 100,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 4,
  },

  editButtonText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
  },

  /* =========================
      PROFILE SUMMARY
  ========================= */

  profileSummary: {
    paddingTop: 25,
  },

  avatarOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -72,
  },

  avatar: {
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
    maxWidth: 360,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingBottom: 19,
  },

  stat: {
    alignItems: "center",
    minWidth: 80,
  },

  statValue: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },

  statLabel: {
    marginTop: 2,
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "500",
  },

  /* =========================
      PROFILE TABS
  ========================= */

  profileTabs: {
    height: 57,
    flexDirection: "row",
    borderBottomWidth: 1,
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

  postCard: {
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 6,
    borderBottomWidth: 1,
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

  postName: {
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "800",
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

  profileRoomCard: {
    minHeight: 78,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  profileRoomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  profileRoomLiveDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -1,
    bottom: -1,
    borderWidth: 2,
  },

  profileRoomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  profileRoomName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  profileRoomMeta: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  profileRoomStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  profileRoomStatus: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "700",
  },

  profileRoomPeople: {
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
