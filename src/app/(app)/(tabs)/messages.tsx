import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const iconImage = require("@/assets/images/icon.png");

/* ============================================================
   DATA
============================================================ */

const directMessages = [
  {
    name: "Sarah Johnson",
    preview: "Hey! How are you doing today? 😊",
    time: "10:24 AM",
    unread: 3,
    online: true,
    avatarStyle: "pink",
  },
  {
    name: "James Carter",
    preview: "That was a great conversation in the room!",
    time: "9:48 AM",
    unread: 1,
    online: true,
    avatarStyle: "blue",
  },
  {
    name: "Emma Davis",
    preview: "You joined the Gaming Zone room, right?",
    time: "8:32 AM",
    unread: 2,
    online: true,
    avatarStyle: "orange",
  },
  {
    name: "David Wilson",
    preview: "Let’s catch up later. I’m in a meeting now.",
    time: "Yesterday",
    unread: 0,
    online: false,
    avatarStyle: "purple",
  },
  {
    name: "Lisa Thompson",
    preview: "Cool! See you in the next room. 👋",
    time: "Yesterday",
    unread: 1,
    online: true,
    avatarStyle: "gold",
  },
];

const groupChats = [
  {
    name: "Gaming Zone",
    members: "138 members",
    preview: "Mike: Anyone up for another round? 🎮",
    time: "Yesterday",
    unread: 5,
    background: "purple",
  },
  {
    name: "Island Vibes",
    members: "42 members",
    preview: "Tasha: This view is amazing! 🌴",
    time: "2 days ago",
    unread: 3,
    background: "sunset",
  },
];

const moreMessages = [
  {
    name: "Rachel Green",
    preview: "I’ll be there in a few!",
    time: "2 days ago",
    unread: 0,
    online: true,
    avatarStyle: "pink",
  },
  {
    name: "Daniel Scott",
    preview: "Sounds good! 👍",
    time: "2 days ago",
    unread: 0,
    online: true,
    avatarStyle: "blue",
  },
  {
    name: "Jessica Adams",
    preview: "Let me know when you're free.",
    time: "3 days ago",
    unread: 0,
    online: false,
    avatarStyle: "purple",
  },
  {
    name: "Michael Brown",
    preview: "That room was really interesting.",
    time: "3 days ago",
    unread: 0,
    online: true,
    avatarStyle: "orange",
  },
];

/* ============================================================
   USER AVATAR
============================================================ */

function UserAvatar({
  online,
  avatarStyle,
  size,
  scale,
}: {
  online: boolean;
  avatarStyle: string;
  size: number;
  scale: number;
}) {
  const borderColors: Record<string, string> = {
    pink: "#D84CFF",
    blue: "#1DA9FF",
    orange: "#FF9B3D",
    purple: "#7E45FF",
    gold: "#F4B45F",
  };

  const borderColor = borderColors[avatarStyle] ?? "#714BFF";

  return (
    <View
      style={[
        styles.avatarWrapper,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginRight: 13 * scale,
        },
      ]}
    >
      <Image
        source={iconImage}
        style={[
          styles.avatarImage,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor,
          },
        ]}
      />

      {online && (
        <View
          style={[
            styles.avatarOnline,
            {
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: 5 * scale,
              right: -1 * scale,
              bottom: 2 * scale,
            },
          ]}
        />
      )}
    </View>
  );
}

/* ============================================================
   DIRECT MESSAGE ROW
============================================================ */

function MessageRow({
  name,
  preview,
  time,
  unread,
  online,
  avatarStyle,
  scale,
}: {
  name: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  avatarStyle: string;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.messageRow,
        {
          minHeight: 78 * scale,
          paddingVertical: 10 * scale,
        },
      ]}
    >
      <UserAvatar
        online={online}
        avatarStyle={avatarStyle}
        size={52 * scale}
        scale={scale}
      />

      <View style={styles.messageContent}>
        <Text
          numberOfLines={1}
          style={[
            styles.messageName,
            {
              fontSize: 16 * scale,
              lineHeight: 19 * scale,
            },
          ]}
        >
          {name}
        </Text>

        <Text
          numberOfLines={1}
          style={[
            styles.messagePreview,
            {
              fontSize: 14 * scale,
              lineHeight: 18 * scale,
              marginTop: 2 * scale,
            },
          ]}
        >
          {preview}
        </Text>
      </View>

      <View
        style={[
          styles.messageRight,
          {
            paddingLeft: 8 * scale,
          },
        ]}
      >
        <Text
          style={[
            styles.messageTime,
            {
              fontSize: 11 * scale,
            },
          ]}
        >
          {time}
        </Text>

        {unread > 0 && (
          <View
            style={[
              styles.unreadBadge,
              {
                minWidth: 21 * scale,
                height: 21 * scale,
                borderRadius: 10.5 * scale,
                marginTop: 7 * scale,
              },
            ]}
          >
            <Text
              style={[
                styles.unreadText,
                {
                  fontSize: 10 * scale,
                },
              ]}
            >
              {unread}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

/* ============================================================
   GROUP ROW
============================================================ */

function GroupRow({
  name,
  members,
  preview,
  time,
  unread,
  background,
  scale,
}: {
  name: string;
  members: string;
  preview: string;
  time: string;
  unread: number;
  background: string;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.messageRow,
        {
          minHeight: 78 * scale,
          paddingVertical: 10 * scale,
        },
      ]}
    >
      <View
        style={[
          styles.groupAvatarWrapper,
          {
            width: 52 * scale,
            height: 52 * scale,
            borderRadius: 26 * scale,
            marginRight: 13 * scale,
          },
        ]}
      >
        <Image
          source={iconImage}
          style={[
            styles.groupAvatar,
            {
              width: 52 * scale,
              height: 52 * scale,
              borderRadius: 26 * scale,
            },
          ]}
        />

        <View
          style={[
            styles.groupAvatarTint,
            background === "sunset"
              ? styles.groupAvatarTintSunset
              : styles.groupAvatarTintPurple,
            {
              width: 52 * scale,
              height: 52 * scale,
              borderRadius: 26 * scale,
            },
          ]}
        />

        <Ionicons
          name={
            background === "sunset"
              ? "sunny-outline"
              : "game-controller-outline"
          }
          size={23 * scale}
          color="#FFFFFF"
          style={styles.groupCenterIcon}
        />
      </View>

      <View style={styles.messageContent}>
        <View style={styles.groupTitleRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.messageName,
              {
                fontSize: 16 * scale,
                lineHeight: 19 * scale,
              },
            ]}
          >
            {name}
          </Text>

          <View style={styles.memberInfo}>
            <Ionicons name="people" size={12 * scale} color="#A2B0D2" />

            <Text
              style={[
                styles.memberText,
                {
                  fontSize: 10.5 * scale,
                  marginLeft: 3 * scale,
                },
              ]}
            >
              {members}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={[
            styles.messagePreview,
            {
              fontSize: 14 * scale,
              lineHeight: 18 * scale,
              marginTop: 2 * scale,
            },
          ]}
        >
          {preview}
        </Text>
      </View>

      <View
        style={[
          styles.messageRight,
          {
            paddingLeft: 8 * scale,
          },
        ]}
      >
        <Text
          style={[
            styles.messageTime,
            {
              fontSize: 11 * scale,
            },
          ]}
        >
          {time}
        </Text>

        {unread > 0 && (
          <View
            style={[
              styles.unreadBadge,
              {
                minWidth: 21 * scale,
                height: 21 * scale,
                borderRadius: 10.5 * scale,
                marginTop: 7 * scale,
              },
            ]}
          >
            <Text
              style={[
                styles.unreadText,
                {
                  fontSize: 10 * scale,
                },
              ]}
            >
              {unread}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

/* ============================================================
   MESSAGES SCREEN
============================================================ */

export default function MessagesScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  /*
   * Standard chat-app scale.
   *
   * The earlier version was deliberately compact.
   * This version uses a more conventional readable hierarchy.
   */
  const scale = Math.min(width / 390, 1.08);

  const sidePadding = 17 * scale;

  const bottomNavigationHeight = 58 * scale;

  const verticalBottomPadding =
    bottomNavigationHeight + insets.bottom + 18 * scale;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#020D1B" />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* ====================================================
            MAIN VERTICAL SCROLL
        ===================================================== */}

        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={[
            styles.mainScrollContent,
            {
              paddingHorizontal: sidePadding,
              paddingBottom: verticalBottomPadding,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          alwaysBounceVertical
        >
          {/* ==================================================
              HEADER
          =================================================== */}

          <View
            style={[
              styles.header,
              {
                paddingTop: 2 * scale,
              },
            ]}
          >
            <View style={styles.headerTop}>
              <View>
                {/* LOGO */}

                <View
                  style={[
                    styles.logoRow,
                    {
                      height: 34 * scale,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.logoOne,
                      {
                        fontSize: 31 * scale,
                        lineHeight: 34 * scale,
                      },
                    ]}
                  >
                    1
                  </Text>

                  <Text
                    style={[
                      styles.logoGo,
                      {
                        fontSize: 29 * scale,
                        lineHeight: 33 * scale,
                      },
                    ]}
                  >
                    Go
                  </Text>
                </View>

                {/* TITLE */}

                <Text
                  style={[
                    styles.pageTitle,
                    {
                      fontSize: 27 * scale,
                      lineHeight: 31 * scale,
                      marginTop: 8 * scale,
                    },
                  ]}
                >
                  Messages
                </Text>

                <Text
                  style={[
                    styles.pageSubtitle,
                    {
                      fontSize: 15 * scale,
                      lineHeight: 20 * scale,
                      marginTop: 3 * scale,
                    },
                  ]}
                >
                  Private chats and group conversations
                </Text>
              </View>

              {/* HEADER ACTIONS */}

              <View
                style={[
                  styles.headerActions,
                  {
                    marginTop: 1 * scale,
                  },
                ]}
              >
                <Pressable
                  style={[
                    styles.notificationButton,
                    {
                      width: 30 * scale,
                      height: 35 * scale,
                      marginRight: 12 * scale,
                    },
                  ]}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={24 * scale}
                    color="#FFFFFF"
                  />

                  <View
                    style={[
                      styles.notificationDot,
                      {
                        width: 8 * scale,
                        height: 8 * scale,
                        borderRadius: 4 * scale,
                        right: 1 * scale,
                        top: 0,
                      },
                    ]}
                  />
                </Pressable>

                <View style={styles.profileWrapper}>
                  <Image
                    source={iconImage}
                    style={[
                      styles.profileImage,
                      {
                        width: 38 * scale,
                        height: 38 * scale,
                        borderRadius: 19 * scale,
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.onlineDot,
                      {
                        width: 9 * scale,
                        height: 9 * scale,
                        borderRadius: 5 * scale,
                        right: -1 * scale,
                        bottom: 0,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* SEARCH */}

            <Pressable
              style={[
                styles.searchBar,
                {
                  height: 47 * scale,
                  borderRadius: 15 * scale,
                  marginTop: 18 * scale,
                  paddingHorizontal: 14 * scale,
                },
              ]}
            >
              <Ionicons name="search" size={24 * scale} color="#B2C0E4" />

              <Text
                style={[
                  styles.searchPlaceholder,
                  {
                    fontSize: 14 * scale,
                    marginLeft: 13 * scale,
                  },
                ]}
              >
                Search conversations...
              </Text>
            </Pressable>
          </View>

          {/* ==================================================
              DIRECT / GROUP SWITCHER
          =================================================== */}

          <View
            style={[
              styles.switcher,
              {
                marginTop: 14 * scale,
                height: 42 * scale,
                borderRadius: 21 * scale,
              },
            ]}
          >
            {/* DIRECT MESSAGES */}

            <Pressable
              style={[
                styles.switchTab,
                styles.switchTabActive,
                {
                  borderRadius: 21 * scale,
                },
              ]}
            >
              <Ionicons name="person" size={17 * scale} color="#FFFFFF" />

              <Text
                style={[
                  styles.switchTextActive,
                  {
                    fontSize: 14 * scale,
                    marginLeft: 9 * scale,
                  },
                ]}
              >
                Direct Messages
              </Text>

              <View
                style={[
                  styles.switchCountActive,
                  {
                    minWidth: 27 * scale,
                    height: 26 * scale,
                    borderRadius: 13 * scale,
                    marginLeft: 9 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.switchCountTextActive,
                    {
                      fontSize: 10 * scale,
                    },
                  ]}
                >
                  12
                </Text>
              </View>
            </Pressable>

            {/* GROUP */}

            <Pressable
              style={[
                styles.switchTab,
                styles.switchTabInactive,
                {
                  borderRadius: 21 * scale,
                },
              ]}
            >
              <Ionicons name="people" size={18 * scale} color="#9BAADD" />

              <Text
                style={[
                  styles.switchTextInactive,
                  {
                    fontSize: 14 * scale,
                    marginLeft: 9 * scale,
                  },
                ]}
              >
                Group
              </Text>

              <View
                style={[
                  styles.switchCountInactive,
                  {
                    minWidth: 27 * scale,
                    height: 26 * scale,
                    borderRadius: 13 * scale,
                    marginLeft: 9 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.switchCountTextInactive,
                    {
                      fontSize: 10 * scale,
                    },
                  ]}
                >
                  8
                </Text>
              </View>
            </Pressable>
          </View>

          {/* ==================================================
              DIRECT MESSAGES
          =================================================== */}

          <View
            style={[
              styles.messagesList,
              {
                marginTop: 8 * scale,
              },
            ]}
          >
            {directMessages.map((message, index) => (
              <View key={message.name}>
                <MessageRow
                  name={message.name}
                  preview={message.preview}
                  time={message.time}
                  unread={message.unread}
                  online={message.online}
                  avatarStyle={message.avatarStyle}
                  scale={scale}
                />

                {index !== directMessages.length - 1 && (
                  <View
                    style={[
                      styles.divider,
                      {
                        marginLeft: 65 * scale,
                      },
                    ]}
                  />
                )}
              </View>
            ))}

            {/* ==================================================
                GROUP CHATS
            =================================================== */}

            {groupChats.map((chat) => (
              <View key={chat.name}>
                <GroupRow
                  name={chat.name}
                  members={chat.members}
                  preview={chat.preview}
                  time={chat.time}
                  unread={chat.unread}
                  background={chat.background}
                  scale={scale}
                />

                <View
                  style={[
                    styles.divider,
                    {
                      marginLeft: 65 * scale,
                    },
                  ]}
                />
              </View>
            ))}

            {/* ==================================================
                MORE MESSAGES
            =================================================== */}

            {moreMessages.map((message, index) => (
              <View key={message.name}>
                <MessageRow
                  name={message.name}
                  preview={message.preview}
                  time={message.time}
                  unread={message.unread}
                  online={message.online}
                  avatarStyle={message.avatarStyle}
                  scale={scale}
                />

                {index !== moreMessages.length - 1 && (
                  <View
                    style={[
                      styles.divider,
                      {
                        marginLeft: 65 * scale,
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          <View
            style={{
              height: 10 * scale,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      {/* ========================================================
          FIXED BOTTOM NAVIGATION
      ====================================================== */}

      <SafeAreaView style={styles.bottomSafeArea} edges={["bottom"]}>
        <View
          style={[
            styles.bottomNavigation,
            {
              height: bottomNavigationHeight,
            },
          ]}
        >
          {/* HOME */}

          <Pressable style={styles.navItem}>
            <Ionicons name="home-outline" size={23 * scale} color="#98A4D0" />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Home
            </Text>
          </Pressable>

          {/* DISCOVER */}

          <Pressable style={styles.navItem}>
            <Ionicons
              name="compass-outline"
              size={24 * scale}
              color="#98A4D0"
            />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Discover
            </Text>
          </Pressable>

          {/* CREATE */}

          <Pressable
            style={[
              styles.createButton,
              {
                width: 45 * scale,
                height: 45 * scale,
                borderRadius: 23 * scale,
                marginTop: -24 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.createButtonInner,
                {
                  width: 44 * scale,
                  height: 44 * scale,
                  borderRadius: 22 * scale,
                },
              ]}
            >
              <Ionicons name="add" size={31 * scale} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* MESSAGES ACTIVE */}

          <Pressable style={styles.navItem}>
            <View style={styles.messageIconWrapper}>
              <Ionicons
                name="chatbubble-ellipses"
                size={23 * scale}
                color="#9652FF"
              />

              <View
                style={[
                  styles.messageBadge,
                  {
                    minWidth: 18 * scale,
                    height: 18 * scale,
                    borderRadius: 9 * scale,
                    right: -8 * scale,
                    top: -6 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageBadgeText,
                    {
                      fontSize: 8.5 * scale,
                    },
                  ]}
                >
                  8
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.navLabelActive,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Messages
            </Text>
          </Pressable>

          {/* PROFILE */}

          <Pressable style={styles.navItem}>
            <Ionicons name="person-outline" size={24 * scale} color="#98A4D0" />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Profile
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* ==============================================================
   STYLES
============================================================== */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020D1B",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#020D1B",
  },

  mainScroll: {
    flex: 1,
  },

  mainScrollContent: {
    flexGrow: 1,
  },

  /* ============================================================
     HEADER
  ============================================================ */

  header: {
    width: "100%",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoOne: {
    fontWeight: "900",
    fontStyle: "italic",
    color: "#804CFF",
    letterSpacing: -3,
  },

  logoGo: {
    fontWeight: "900",
    color: "#F5F7FF",
    letterSpacing: -2,
    marginLeft: 1,
  },

  pageTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  pageSubtitle: {
    color: "#9BA9D0",
    fontWeight: "500",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  notificationDot: {
    position: "absolute",
    backgroundColor: "#F12559",
    borderWidth: 1,
    borderColor: "#020D1B",
  },

  profileWrapper: {
    position: "relative",
  },

  profileImage: {
    borderWidth: 1,
    borderColor: "#784FFF",
    backgroundColor: "#18233B",
  },

  onlineDot: {
    position: "absolute",
    backgroundColor: "#00E0A5",
    borderWidth: 1.5,
    borderColor: "#020D1B",
  },

  /* ============================================================
     SEARCH
  ============================================================ */

  searchBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#485DA3",
    backgroundColor: "#07172D",
  },

  searchPlaceholder: {
    flex: 1,
    color: "#AEBBDF",
    fontWeight: "500",
  },

  /* ============================================================
     SWITCHER
  ============================================================ */

  switcher: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  switchTab: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  switchTabActive: {
    backgroundColor: "#7136F5",
  },

  switchTabInactive: {
    backgroundColor: "#0B1D37",
    borderWidth: 1,
    borderColor: "#1A3A61",
  },

  switchTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  switchTextInactive: {
    color: "#A7B6E2",
    fontWeight: "700",
  },

  switchCountActive: {
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
  },

  switchCountInactive: {
    backgroundColor: "#153158",
    alignItems: "center",
    justifyContent: "center",
  },

  switchCountTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  switchCountTextInactive: {
    color: "#B9C4E4",
    fontWeight: "800",
  },

  /* ============================================================
     MESSAGES
  ============================================================ */

  messagesList: {
    width: "100%",
  },

  messageRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    position: "relative",
  },

  avatarImage: {
    borderWidth: 1.5,
    backgroundColor: "#172741",
  },

  avatarOnline: {
    position: "absolute",
    backgroundColor: "#00E0A5",
    borderWidth: 2,
    borderColor: "#020D1B",
  },

  messageContent: {
    flex: 1,
    minWidth: 0,
  },

  messageName: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  messagePreview: {
    color: "#A8B7DE",
    fontWeight: "500",
  },

  messageRight: {
    minWidth: 55,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    paddingTop: 5,
  },

  messageTime: {
    color: "#A6B4D8",
    fontWeight: "500",
  },

  unreadBadge: {
    backgroundColor: "#6830EF",
    alignItems: "center",
    justifyContent: "center",
  },

  unreadText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#102B4A",
  },

  /* ============================================================
     GROUP AVATARS
  ============================================================ */

  groupAvatarWrapper: {
    position: "relative",
    overflow: "hidden",
  },

  groupAvatar: {
    backgroundColor: "#152946",
  },

  groupAvatarTint: {
    position: "absolute",
  },

  groupAvatarTintPurple: {
    backgroundColor: "rgba(90,32,180,0.58)",
  },

  groupAvatarTintSunset: {
    backgroundColor: "rgba(231,97,42,0.35)",
  },

  groupCenterIcon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [
      {
        translateX: -11,
      },
      {
        translateY: -11,
      },
    ],
  },

  groupTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  memberText: {
    color: "#A2B0D1",
    fontWeight: "600",
  },

  /* ============================================================
     BOTTOM NAVIGATION
  ============================================================ */

  bottomSafeArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#020D1B",
  },

  bottomNavigation: {
    borderTopWidth: 1,
    borderTopColor: "#182B45",
    backgroundColor: "#020D1B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  navItem: {
    minWidth: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    color: "#9CAAD0",
    fontWeight: "600",
    marginTop: 2,
  },

  navLabelActive: {
    color: "#9652FF",
    fontWeight: "700",
    marginTop: 2,
  },

  createButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  createButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7D42F6",
    borderWidth: 1,
    borderColor: "#A576FF",
    shadowColor: "#773BFF",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
  },

  messageIconWrapper: {
    position: "relative",
    alignItems: "center",
  },

  messageBadge: {
    position: "absolute",
    backgroundColor: "#F02D64",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#020D1B",
  },

  messageBadgeText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
