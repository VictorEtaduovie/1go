import React, { useMemo, useState } from "react";
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

type NotificationTab = "All" | "Mentions" | "Follows" | "Rooms";

type NotificationType =
  | "reply"
  | "follow"
  | "room"
  | "mention"
  | "room-update"
  | "like"
  | "organization";

type NotificationItem = {
  id: string;
  type: NotificationType;
  name: string;
  message: string;
  secondary?: string;
  time: string;
  action?: "Follow back" | "Join";
  avatarType: "person" | "organization" | "heart";
  initials?: string;
};

const notificationItems: NotificationItem[] = [
  {
    id: "notification-1",
    type: "reply",
    name: "Sarah Johnson",
    message: "replied to your post",
    secondary: '"Exactly! I agree with you."',
    time: "5m",
    avatarType: "person",
  },
  {
    id: "notification-2",
    type: "follow",
    name: "David Kim",
    message: "started following you",
    time: "12m",
    action: "Follow back",
    avatarType: "person",
  },
  {
    id: "notification-3",
    type: "room",
    name: "TechWorld",
    message: "is live now",
    secondary: '"Ask us anything about our new program"',
    time: "20m",
    action: "Join",
    avatarType: "organization",
    initials: "T",
  },
  {
    id: "notification-4",
    type: "mention",
    name: "Maya Carter",
    message: "mentioned you",
    secondary: "in a comment",
    time: "32m",
    avatarType: "person",
  },
  {
    id: "notification-5",
    type: "room-update",
    name: 'Your room "Tech Talk"',
    message: "has reached 50 participants",
    time: "1h",
    avatarType: "organization",
    initials: "1G",
  },
  {
    id: "notification-6",
    type: "follow",
    name: "James Wilson",
    message: "followed you",
    time: "2h",
    avatarType: "person",
  },
  {
    id: "notification-7",
    type: "like",
    name: "Emma Brown",
    message: "liked your post",
    secondary: '"Great post"',
    time: "3h",
    avatarType: "heart",
  },
  {
    id: "notification-8",
    type: "organization",
    name: "Marketing Team",
    message: "posted a new update",
    time: "5h",
    avatarType: "organization",
    initials: "MT",
  },
];

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<NotificationTab>("All");

  const [followedNotificationIds, setFollowedNotificationIds] = useState<
    string[]
  >([]);

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  const tabAvailableWidth = width - horizontalPadding * 2;

  const tabPillWidth = Math.min(78, Math.max(58, tabAvailableWidth / 4 - 2));

  const filteredNotifications = useMemo(() => {
    if (activeTab === "All") {
      return notificationItems;
    }

    return notificationItems.filter((item) => {
      if (activeTab === "Mentions") {
        return item.type === "mention";
      }

      if (activeTab === "Follows") {
        return item.type === "follow";
      }

      if (activeTab === "Rooms") {
        return item.type === "room" || item.type === "room-update";
      }

      return true;
    });
  }, [activeTab]);

  /* =========================
      NAVIGATION
  ========================= */

  const handleForYouPress = () => {
    router.push("../for-you");
  };

  const handleDiscoverPress = () => {
    router.push("../explore");
  };

  const handleMessagesPress = () => {
    router.push("../messages");
  };

  const handleProfilePress = () => {
    router.push("../profile");
  };

  const handlePlusPress = () => {
    // Connect this to the existing + creation sheet.
  };

  /* =========================
      NOTIFICATIONS
  ========================= */

  const handleNotificationPress = (item: NotificationItem) => {
    console.log("Open notification:", item.id);
  };

  const handleNotificationAction = (item: NotificationItem) => {
    if (item.action === "Follow back") {
      setFollowedNotificationIds((current) => {
        if (current.includes(item.id)) {
          return current.filter((id) => id !== item.id);
        }

        return [...current, item.id];
      });

      return;
    }

    if (item.action === "Join") {
      console.log("Join room:", item.id);
    }
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
            <Text
              style={[
                styles.headerTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Notifications
            </Text>
          </View>

          {/* =========================
              FILTER TABS
          ========================= */}
          <View
            style={[
              styles.tabsContainer,
              {
                borderBottomColor: colors.divider,
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {(["All", "Mentions", "Follows", "Rooms"] as NotificationTab[]).map(
              (tab) => {
                const active = activeTab === tab;

                return (
                  <TouchableOpacity
                    key={tab}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab)}
                    style={styles.tab}
                  >
                    <View
                      style={[
                        styles.tabInner,
                        {
                          width: tabPillWidth,
                        },
                        active && {
                          backgroundColor: colors.primary,
                        },
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.tabText,
                          {
                            color: active ? "#FFFFFF" : colors.textPrimary,
                          },
                        ]}
                      >
                        {tab}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              },
            )}
          </View>

          {/* =========================
              NOTIFICATION LIST
          ========================= */}
          <View style={styles.notificationList}>
            {filteredNotifications.map((item) => (
              <NotificationRow
                key={item.id}
                item={item}
                colors={colors}
                isDark={isDark}
                isFollowedBack={followedNotificationIds.includes(item.id)}
                onPress={() => handleNotificationPress(item)}
                onActionPress={() => handleNotificationAction(item)}
              />
            ))}

            {filteredNotifications.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="notifications-outline"
                  size={38}
                  color={colors.textSecondary}
                />

                <Text
                  style={[
                    styles.emptyTitle,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  No notifications yet
                </Text>

                <Text
                  style={[
                    styles.emptyText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  New activity will appear here.
                </Text>
              </View>
            )}
          </View>
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
            active={false}
            colors={colors}
            onPress={handleProfilePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
    NOTIFICATION ROW
========================= */

function NotificationRow({
  item,
  colors,
  isDark,
  isFollowedBack,
  onPress,
  onActionPress,
}: {
  item: NotificationItem;
  colors: ThemeColors;
  isDark: boolean;
  isFollowedBack: boolean;
  onPress: () => void;
  onActionPress: () => void;
}) {
  return (
    <View
      style={[
        styles.notificationRow,
        {
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.notificationMain}
      >
        <NotificationAvatar item={item} colors={colors} isDark={isDark} />

        <View style={styles.notificationContent}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.notificationText,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            <Text style={styles.notificationName}>{item.name}</Text>{" "}
            {item.message}
          </Text>

          {item.secondary ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.notificationSecondary,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {item.secondary} • {item.time}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.notificationTimeOnly,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {item.time}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {item.action && (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onActionPress}
          style={[
            styles.notificationAction,
            {
              backgroundColor:
                item.action === "Follow back" && isFollowedBack
                  ? colors.disabledBackground
                  : colors.primary,

              borderColor:
                item.action === "Follow back" && isFollowedBack
                  ? colors.border
                  : colors.primary,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.notificationActionText,
              {
                color:
                  item.action === "Follow back" && isFollowedBack
                    ? colors.textPrimary
                    : "#FFFFFF",
              },
            ]}
          >
            {item.action === "Follow back" && isFollowedBack
              ? "Following"
              : item.action}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* =========================
    NOTIFICATION AVATAR
========================= */

function NotificationAvatar({
  item,
  colors,
  isDark,
}: {
  item: NotificationItem;
  colors: ThemeColors;
  isDark: boolean;
}) {
  if (item.avatarType === "heart") {
    return (
      <View
        style={[
          styles.notificationAvatar,
          {
            backgroundColor: isDark ? colors.disabledBackground : "#FFF1F4",
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons name="heart" size={25} color="#E11D48" />
      </View>
    );
  }

  if (item.avatarType === "organization") {
    return (
      <View
        style={[
          styles.notificationAvatar,
          styles.organizationAvatar,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text numberOfLines={1} style={styles.organizationInitials}>
          {item.initials}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.notificationAvatar,
        {
          backgroundColor: colors.disabledBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Ionicons name="person" size={25} color={colors.textSecondary} />
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
        numberOfLines={1}
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

/* =========================
    STYLES
========================= */

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
      HEADER
  ========================= */

  header: {
    paddingTop: 13,
    paddingBottom: 15,
  },

  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  /* =========================
      TABS
  ========================= */

  tabsContainer: {
    height: 59,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },

  tab: {
    flex: 1,
    height: 59,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  tabInner: {
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  tabText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
    includeFontPadding: false,
  },

  /* =========================
      NOTIFICATION LIST
  ========================= */

  notificationList: {
    width: "100%",
  },

  notificationRow: {
    minHeight: 88,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  notificationMain: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  notificationAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  organizationAvatar: {
    borderWidth: 0,
    borderRadius: 15,
  },

  organizationInitials: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900",
  },

  notificationContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  notificationText: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "500",
    includeFontPadding: false,
  },

  notificationName: {
    fontWeight: "900",
  },

  notificationSecondary: {
    marginTop: 2,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "500",
    includeFontPadding: false,
  },

  notificationTimeOnly: {
    marginTop: 2,
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "500",
    includeFontPadding: false,
  },

  notificationAction: {
    minWidth: 94,
    maxWidth: 105,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    flexShrink: 0,
  },

  notificationActionText: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "800",
    includeFontPadding: false,
  },

  /* =========================
      EMPTY STATE
  ========================= */

  emptyState: {
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
  },

  emptyText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    textAlign: "center",
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
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "700",
    includeFontPadding: false,
  },

  plusNavSlot: {
    flex: 1,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
  },

  plusButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
});
