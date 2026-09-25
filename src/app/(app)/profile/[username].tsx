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
import { router, useLocalSearchParams } from "expo-router";
import { themes, type ThemeColors } from "@/theme/colors";

type ProfileTab = "Posts" | "Rooms" | "About";

type UserPost = {
  id: string;
  text: string;
  time: string;
  likes: string;
  comments: string;
  hasImage: boolean;
};

type CurrentRoom = {
  id: string;
  name: string;
  people: string;
};

type UserRoom = {
  id: string;
  name: string;
  status: "Live now" | "Upcoming" | "Active";
  people: string;
};

const userProfile = {
  name: "User",
  username: "username",
  bio: "Designer • Creator • Dreamer",
  bioSecondLine: "Good vibes only ✨",
  followers: "2.4k",
  following: "312",
  posts: "18",
  verified: true,
};

const currentRoom: CurrentRoom = {
  id: "current-room",
  name: "Music Vibes",
  people: "12 people talking",
};

const userPosts: UserPost[] = [
  {
    id: "user-post-1",
    text: "Music makes life better 🎵\nWhat's everyone listening to right now?",
    time: "1h",
    likes: "18",
    comments: "6",
    hasImage: true,
  },
  {
    id: "user-post-2",
    text: "Some days are for creating. Some are for simply enjoying the moment.",
    time: "4h",
    likes: "12",
    comments: "3",
    hasImage: false,
  },
];

const userRooms: UserRoom[] = [
  {
    id: "user-room-1",
    name: "Music Vibes",
    status: "Live now",
    people: "12 people",
  },
  {
    id: "user-room-2",
    name: "Creative Conversations",
    status: "Upcoming",
    people: "46 people",
  },
  {
    id: "user-room-3",
    name: "Everyday Ideas",
    status: "Active",
    people: "81 people",
  },
];

export default function OtherUserProfileScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const { username } = useLocalSearchParams<{
    username?: string;
  }>();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");

  const [isFollowing, setIsFollowing] = useState(false);

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  const displayUsername = username || userProfile.username;

  /* =========================
      ACTIONS
  ========================= */

  const handleBack = () => {
    router.back();
  };

  const handleFollow = () => {
    setIsFollowing((current) => !current);
  };

  const handleMessage = () => {
    console.log("Message user:", displayUsername);
  };

  const handleCurrentRoomPress = () => {
    console.log("Open current room:", currentRoom.id);
  };

  const handleJoinRoom = () => {
    console.log("Join room:", currentRoom.id);
  };

  const handlePostPress = (postId: string) => {
    console.log("Open post:", postId);
  };

  const handleRoomPress = (roomId: string) => {
    console.log("Open room:", roomId);
  };

  const handleMorePress = () => {
    console.log("More options for:", displayUsername);
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
          contentContainerStyle={styles.scrollContent}
        >
          {/* =========================
              COVER
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

            {/* Back */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleBack}
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
                  {userProfile.name}
                </Text>

                {userProfile.verified && (
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
                @{displayUsername}
              </Text>

              <Text
                style={[
                  styles.bio,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {userProfile.bio}
              </Text>

              <Text
                style={[
                  styles.bioSecondLine,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {userProfile.bioSecondLine}
              </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <ProfileStat
                value={userProfile.followers}
                label="Followers"
                colors={colors}
              />

              <ProfileStat
                value={userProfile.following}
                label="Following"
                colors={colors}
              />

              <ProfileStat
                value={userProfile.posts}
                label="Posts"
                colors={colors}
              />
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
                CURRENTLY IN
            ========================= */}
            <View style={styles.currentRoomSection}>
              <Text
                style={[
                  styles.currentRoomTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Currently in
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
                      styles.currentRoomIcon,
                      {
                        backgroundColor: colors.disabledBackground,
                      },
                    ]}
                  >
                    <Ionicons
                      name="radio-outline"
                      size={22}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.currentRoomContent}>
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
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
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
              {userPosts.map((post) => (
                <UserPostCard
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
              {userRooms.map((room) => (
                <UserRoomCard
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
                value={`@${displayUsername}`}
                colors={colors}
              />

              <AboutRow
                icon="chatbubble-ellipses-outline"
                title="Interests"
                value="Music, Creativity, Life"
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

          <View style={styles.bottomSpace} />
        </ScrollView>
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
    USER POST
========================= */

function UserPostCard({
  post,
  colors,
  isDark,
  onPress,
}: {
  post: UserPost;
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
            {userProfile.name}
          </Text>

          <Text
            style={[
              styles.postMeta,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            @{userProfile.username} • {post.time}
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

      {/* =========================
          POST ACTIONS
      ========================= */}
      <View style={styles.postActions}>
        <PostAction icon="heart-outline" value={post.likes} colors={colors} />

        <PostAction
          icon="chatbubble-outline"
          value={post.comments}
          colors={colors}
        />

        <View style={styles.postActionSpacer} />

        <PostActionIcon icon="bookmark-outline" colors={colors} />
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
    POST ACTION ICON
========================= */

function PostActionIcon({
  icon,
  colors,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  colors: ThemeColors;
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.postActionButton}>
      <Ionicons name={icon} size={21} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

/* =========================
    USER ROOM
========================= */

function UserRoomCard({
  room,
  colors,
  onPress,
}: {
  room: UserRoom;
  colors: ThemeColors;
  onPress: () => void;
}) {
  const isLive = room.status === "Live now";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.userRoomCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.userRoomIcon,
          {
            backgroundColor: colors.disabledBackground,
          },
        ]}
      >
        <Ionicons name="radio-outline" size={24} color={colors.primary} />

        {isLive && (
          <View
            style={[
              styles.roomLiveDot,
              {
                backgroundColor: colors.online,
                borderColor: colors.surface,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.userRoomContent}>
        <Text
          style={[
            styles.userRoomName,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {room.name}
        </Text>

        <View style={styles.userRoomMeta}>
          <View
            style={[
              styles.roomStatusDot,
              {
                backgroundColor: isLive ? colors.online : colors.textSecondary,
              },
            ]}
          />

          <Text
            style={[
              styles.userRoomStatus,
              {
                color: isLive ? colors.online : colors.textSecondary,
              },
            ]}
          >
            {room.status}
          </Text>

          <Text
            style={[
              styles.userRoomPeople,
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

  bottomSpace: {
    height: 30,
  },

  /* =========================
      COVER
  ========================= */

  coverContainer: {
    height: 190,
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
    paddingTop: 26,
  },

  avatarOuter: {
    width: 106,
    height: 106,
    borderRadius: 53,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -73,
  },

  avatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
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
    fontWeight: "600",
  },

  bioSecondLine: {
    marginTop: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  /* =========================
      STATS
  ========================= */

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 19,
    paddingBottom: 17,
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
      PROFILE ACTIONS
  ========================= */

  profileActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 1,
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
      CURRENTLY IN
  ========================= */

  currentRoomSection: {
    marginTop: 19,
  },

  currentRoomTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 9,
  },

  currentRoomCard: {
    minHeight: 70,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  currentRoomMain: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  currentRoomIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  currentRoomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
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
    minWidth: 70,
    height: 38,
    borderRadius: 19,
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

  /* =========================
      PROFILE TABS
  ========================= */

  profileTabs: {
    height: 57,
    flexDirection: "row",
    borderBottomWidth: 1,
    marginTop: 20,
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
    bottom: -1,
    width: 52,
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
    paddingBottom: 10,
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
    height: 175,
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

  userRoomCard: {
    minHeight: 78,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  userRoomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  roomLiveDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -1,
    bottom: -1,
    borderWidth: 2,
  },

  userRoomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  userRoomName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  userRoomMeta: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  roomStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  userRoomStatus: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "700",
  },

  userRoomPeople: {
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
});
