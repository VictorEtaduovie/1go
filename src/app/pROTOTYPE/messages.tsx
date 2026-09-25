import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { themes, type ThemeColors } from "@/theme/colors";

type MessageTab = "Chats" | "Rooms";

type ConversationType = "person" | "organization" | "room";

type Conversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  type: ConversationType;
};

type RoomConversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  status: "Live now" | "Upcoming" | "Active";
  isPresenting: boolean;
};

type SuggestedRoom = {
  id: string;
  name: string;
  description: string;
  people: string;
  status: "Live now" | "Starting soon" | "Active";
  category: string;
};

const conversations: Conversation[] = [
  {
    id: "conversation-1",
    name: "Person",
    preview: "Your latest message",
    time: "5m",
    unread: 1,
    type: "person",
  },
  {
    id: "conversation-2",
    name: "Person",
    preview: "That was an interesting conversation",
    time: "12m",
    unread: 1,
    type: "person",
  },
  {
    id: "conversation-3",
    name: "Technology Room",
    preview: "Your room starts in 20 minutes",
    time: "20m",
    unread: 0,
    type: "room",
  },
  {
    id: "conversation-4",
    name: "Person",
    preview: "Sounds good. See you there.",
    time: "2h",
    unread: 0,
    type: "person",
  },
  {
    id: "conversation-5",
    name: "Person",
    preview: "Replied to your message",
    time: "3h",
    unread: 0,
    type: "person",
  },
  {
    id: "conversation-6",
    name: "Organization",
    preview: "New update from the organization",
    time: "5h",
    unread: 0,
    type: "organization",
  },
  {
    id: "conversation-7",
    name: "Person",
    preview: "Let's catch up soon",
    time: "6h",
    unread: 0,
    type: "person",
  },
  {
    id: "conversation-8",
    name: "Person",
    preview: "Thanks for the follow",
    time: "8h",
    unread: 0,
    type: "person",
  },
];

const roomConversations: RoomConversation[] = [
  {
    id: "room-conversation-1",
    name: "Technology Room",
    preview: "Someone replied to your room discussion",
    time: "5m",
    unread: 3,
    status: "Live now",
    isPresenting: true,
  },
  {
    id: "room-conversation-2",
    name: "Evening Conversations",
    preview: "New message in your room",
    time: "18m",
    unread: 1,
    status: "Live now",
    isPresenting: true,
  },
  {
    id: "room-conversation-3",
    name: "Ideas & Discussion",
    preview: "Your room starts in 20 minutes",
    time: "20m",
    unread: 0,
    status: "Upcoming",
    isPresenting: true,
  },
  {
    id: "room-conversation-4",
    name: "General Conversation",
    preview: "New activity from people in the room",
    time: "1h",
    unread: 0,
    status: "Active",
    isPresenting: false,
  },
];

const suggestedRooms: SuggestedRoom[] = [
  {
    id: "suggested-room-1",
    name: "Tech & AI",
    description: "Talk about technology, AI and new ideas.",
    people: "124 people",
    status: "Live now",
    category: "Technology",
  },
  {
    id: "suggested-room-2",
    name: "Late Night Conversations",
    description: "Open conversations about life and everyday experiences.",
    people: "58 people",
    status: "Starting soon",
    category: "Life",
  },
  {
    id: "suggested-room-3",
    name: "Creative Minds",
    description: "Share ideas, creativity and things you're building.",
    people: "91 people",
    status: "Active",
    category: "Creative",
  },
];

const messageRequestCount = 3;

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<MessageTab>("Chats");

  const [searchQuery, setSearchQuery] = useState("");

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return conversations;
    }

    return conversations.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const filteredRooms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return roomConversations;
    }

    return roomConversations.filter(
      (room) =>
        room.name.toLowerCase().includes(query) ||
        room.preview.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const filteredSuggestedRooms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return suggestedRooms;
    }

    return suggestedRooms.filter(
      (room) =>
        room.name.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query) ||
        room.category.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  /* =========================
      NAVIGATION
  ========================= */

  const handleConversationPress = (conversation: Conversation) => {
    console.log("Open conversation:", conversation.id);
  };

  const handleRoomPress = (room: RoomConversation) => {
    console.log("Open room conversation:", room.id);
  };

  const handleSuggestedRoomPress = (room: SuggestedRoom) => {
    console.log("Open suggested room:", room.id);
  };

  const handleMessageRequestsPress = () => {
    router.push("../message-requests");
  };

  const handleForYouPress = () => {
    router.push("../for-you");
  };

  const handleDiscoverPress = () => {
    router.push("../explore");
  };

  const handlePlusPress = () => {
    // Connect this to the existing + creation sheet.
  };

  const handleMessagesPress = () => {
    // Already on Messages.
  };

  const handleProfilePress = () => {
    router.push("../profile");
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
              styles.pageTitle,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            Messages
          </Text>
        </View>

        {/* =========================
            SEARCH
        ========================= */}
        <View
          style={[
            styles.searchContainer,
            {
              marginHorizontal: horizontalPadding,
              backgroundColor: isDark
                ? colors.surface
                : colors.disabledBackground,
              borderColor: colors.divider,
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color={colors.textSecondary}
          />

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search messages"
            placeholderTextColor={colors.textSecondary}
            returnKeyType="search"
            style={[
              styles.searchInput,
              {
                color: colors.textPrimary,
              },
            ]}
          />
        </View>

        {/* =========================
            TABS
        ========================= */}
        <View
          style={[
            styles.tabsContainer,
            {
              borderBottomColor: colors.divider,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("Chats")}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "Chats"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              Chats
            </Text>

            {activeTab === "Chats" && (
              <View
                style={[
                  styles.activeTabIndicator,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("Rooms")}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "Rooms"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              Rooms
            </Text>

            {activeTab === "Rooms" && (
              <View
                style={[
                  styles.activeTabIndicator,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* =========================
            CONTENT
        ========================= */}
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: 100,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              CHATS
          ========================= */}
          {activeTab === "Chats" ? (
            <>
              {/* =========================
                  MESSAGE REQUESTS
              ========================= */}
              {messageRequestCount > 0 && (
                <TouchableOpacity
                  activeOpacity={0.78}
                  onPress={handleMessageRequestsPress}
                  style={[
                    styles.requestCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.requestIcon,
                      {
                        backgroundColor: colors.disabledBackground,
                      },
                    ]}
                  >
                    <Ionicons
                      name="person-add-outline"
                      size={23}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.requestContent}>
                    <Text
                      style={[
                        styles.requestTitle,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      Message Requests
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.requestCount,
                      {
                        backgroundColor: colors.warning,
                      },
                    ]}
                  >
                    <Text style={styles.requestCountText}>
                      {messageRequestCount > 9 ? "9+" : messageRequestCount}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              )}

              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationRow
                    key={conversation.id}
                    conversation={conversation}
                    colors={colors}
                    isDark={isDark}
                    onPress={() => handleConversationPress(conversation)}
                  />
                ))
              ) : (
                <EmptyState
                  icon="chatbubbles-outline"
                  title="No conversations found"
                  description="Try a different search."
                  colors={colors}
                />
              )}
            </>
          ) : (
            <>
              {/* =========================
                  YOUR ROOMS
              ========================= */}
              {filteredRooms.length > 0 && (
                <>
                  <View style={styles.roomSectionHeader}>
                    <Text
                      style={[
                        styles.roomSectionTitle,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      Your Rooms
                    </Text>

                    <Text
                      style={[
                        styles.roomSectionSubtitle,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      Rooms you are presenting, hosting or participating in
                    </Text>
                  </View>

                  {filteredRooms.map((room) => (
                    <RoomConversationRow
                      key={room.id}
                      room={room}
                      colors={colors}
                      onPress={() => handleRoomPress(room)}
                    />
                  ))}
                </>
              )}

              {/* =========================
                  FOR YOU
              ========================= */}
              {filteredSuggestedRooms.length > 0 && (
                <View style={styles.forYouSection}>
                  <View style={styles.forYouHeader}>
                    <View style={styles.forYouHeaderText}>
                      <Text
                        style={[
                          styles.roomSectionTitle,
                          {
                            color: colors.textPrimary,
                          },
                        ]}
                      >
                        For You
                      </Text>

                      <Text
                        style={[
                          styles.roomSectionSubtitle,
                          {
                            color: colors.textSecondary,
                          },
                        ]}
                      >
                        Rooms you may want to join
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleDiscoverPress}
                    >
                      <Text
                        style={[
                          styles.seeAllText,
                          {
                            color: colors.primary,
                          },
                        ]}
                      >
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {filteredSuggestedRooms.map((room) => (
                    <SuggestedRoomCard
                      key={room.id}
                      room={room}
                      colors={colors}
                      onPress={() => handleSuggestedRoomPress(room)}
                    />
                  ))}
                </View>
              )}

              {filteredRooms.length === 0 &&
                filteredSuggestedRooms.length === 0 && (
                  <EmptyState
                    icon="radio-outline"
                    title="No rooms found"
                    description="Rooms you are connected to and suggested rooms will appear here."
                    colors={colors}
                  />
                )}
            </>
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
            active={true}
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
    CONVERSATION ROW
========================= */

function ConversationRow({
  conversation,
  colors,
  isDark,
  onPress,
}: {
  conversation: Conversation;
  colors: ThemeColors;
  isDark: boolean;
  onPress: () => void;
}) {
  const getAvatarIcon = () => {
    if (conversation.type === "organization") {
      return "business-outline" as const;
    }

    if (conversation.type === "room") {
      return "radio-outline" as const;
    }

    return "person-outline" as const;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.conversationRow}
    >
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: isDark
              ? colors.surface
              : colors.disabledBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name={getAvatarIcon()}
          size={25}
          color={colors.textSecondary}
        />
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationTopRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.conversationName,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {conversation.name}
          </Text>

          <Text
            style={[
              styles.conversationTime,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {conversation.time}
          </Text>
        </View>

        <View style={styles.conversationBottomRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.conversationPreview,
              {
                color:
                  conversation.unread > 0
                    ? colors.textPrimary
                    : colors.textSecondary,
                fontWeight: conversation.unread > 0 ? "600" : "500",
              },
            ]}
          >
            {conversation.preview}
          </Text>

          {conversation.unread > 0 && (
            <View
              style={[
                styles.unreadBadge,
                {
                  backgroundColor: colors.warning,
                },
              ]}
            >
              <Text style={styles.unreadBadgeText}>
                {conversation.unread > 9 ? "9+" : conversation.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* =========================
    ROOM CONVERSATION ROW
========================= */

function RoomConversationRow({
  room,
  colors,
  onPress,
}: {
  room: RoomConversation;
  colors: ThemeColors;
  onPress: () => void;
}) {
  const statusIsLive = room.status === "Live now";

  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={onPress}
      style={styles.roomRow}
    >
      <View
        style={[
          styles.roomAvatar,
          {
            backgroundColor: colors.disabledBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons name="radio-outline" size={25} color={colors.primary} />

        {statusIsLive && (
          <View
            style={[
              styles.liveDot,
              {
                backgroundColor: colors.online,
                borderColor: colors.surface,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.roomContent}>
        <View style={styles.roomTopRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.roomName,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {room.name}
          </Text>

          <Text
            style={[
              styles.roomTime,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {room.time}
          </Text>
        </View>

        <View style={styles.roomMiddleRow}>
          <View style={styles.roomStatusRow}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: statusIsLive
                    ? colors.online
                    : colors.textSecondary,
                },
              ]}
            />

            <Text
              style={[
                styles.roomStatus,
                {
                  color: statusIsLive ? colors.online : colors.textSecondary,
                },
              ]}
            >
              {room.status}
            </Text>

            {room.isPresenting && (
              <Text
                style={[
                  styles.presentingText,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                • You’re presenting
              </Text>
            )}
          </View>
        </View>

        <View style={styles.roomBottomRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.roomPreview,
              {
                color:
                  room.unread > 0 ? colors.textPrimary : colors.textSecondary,
                fontWeight: room.unread > 0 ? "600" : "500",
              },
            ]}
          >
            {room.preview}
          </Text>

          {room.unread > 0 && (
            <View
              style={[
                styles.unreadBadge,
                {
                  backgroundColor: colors.warning,
                },
              ]}
            >
              <Text style={styles.unreadBadgeText}>
                {room.unread > 9 ? "9+" : room.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* =========================
    SUGGESTED ROOM CARD
========================= */

function SuggestedRoomCard({
  room,
  colors,
  onPress,
}: {
  room: SuggestedRoom;
  colors: ThemeColors;
  onPress: () => void;
}) {
  const isLive = room.status === "Live now";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.suggestedRoomCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.suggestedRoomIcon,
          {
            backgroundColor: colors.disabledBackground,
          },
        ]}
      >
        <Ionicons name="radio-outline" size={23} color={colors.primary} />

        {isLive && (
          <View
            style={[
              styles.suggestedLiveDot,
              {
                backgroundColor: colors.online,
                borderColor: colors.surface,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.suggestedRoomContent}>
        <View style={styles.suggestedRoomTopRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.suggestedRoomName,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {room.name}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={19}
            color={colors.textSecondary}
          />
        </View>

        <Text
          numberOfLines={1}
          style={[
            styles.suggestedRoomDescription,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {room.description}
        </Text>

        <View style={styles.suggestedRoomMeta}>
          <View style={styles.suggestedStatus}>
            <View
              style={[
                styles.suggestedStatusDot,
                {
                  backgroundColor: isLive
                    ? colors.online
                    : colors.textSecondary,
                },
              ]}
            />

            <Text
              style={[
                styles.suggestedStatusText,
                {
                  color: isLive ? colors.online : colors.textSecondary,
                },
              ]}
            >
              {room.status}
            </Text>
          </View>

          <Text
            style={[
              styles.suggestedPeople,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {room.people}
          </Text>

          <Text
            style={[
              styles.suggestedCategory,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {room.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* =========================
    EMPTY STATE
========================= */

function EmptyState({
  icon,
  title,
  description,
  colors,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  colors: ThemeColors;
}) {
  return (
    <View style={styles.emptyState}>
      <View
        style={[
          styles.emptyIcon,
          {
            backgroundColor: colors.disabledBackground,
          },
        ]}
      >
        <Ionicons name={icon} size={28} color={colors.textSecondary} />
      </View>

      <Text
        style={[
          styles.emptyTitle,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.emptyDescription,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {description}
      </Text>
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

  /* =========================
      HEADER
  ========================= */

  header: {
    minHeight: 65,
    justifyContent: "center",
  },

  pageTitle: {
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "900",
  },

  /* =========================
      SEARCH
  ========================= */

  searchContainer: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    height: 46,
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    paddingVertical: 0,
  },

  /* =========================
      TABS
  ========================= */

  tabsContainer: {
    height: 58,
    flexDirection: "row",
    borderBottomWidth: 1,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tabText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  activeTabIndicator: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: -1,
    height: 3,
    borderRadius: 3,
  },

  /* =========================
      LIST
  ========================= */

  listContent: {
    paddingTop: 7,
  },

  /* =========================
      MESSAGE REQUESTS
  ========================= */

  requestCard: {
    minHeight: 58,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 5,
  },

  requestIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  requestContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 10,
    marginRight: 8,
  },

  requestTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
  },

  requestCount: {
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  requestCountText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "900",
  },

  /* =========================
      CONVERSATION ROW
  ========================= */

  conversationRow: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  conversationContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 13,
  },

  conversationTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  conversationName: {
    flex: 1,
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  conversationTime: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
    marginLeft: 8,
  },

  conversationBottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  conversationPreview: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 19,
    paddingRight: 8,
  },

  /* =========================
      ROOMS
  ========================= */

  roomSectionHeader: {
    paddingTop: 12,
    paddingBottom: 7,
  },

  roomSectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },

  roomSectionSubtitle: {
    marginTop: 2,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "500",
  },

  roomRow: {
    minHeight: 94,
    flexDirection: "row",
    alignItems: "center",
  },

  roomAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  liveDot: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    right: -1,
    bottom: -1,
    borderWidth: 2,
  },

  roomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 13,
  },

  roomTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  roomName: {
    flex: 1,
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  roomTime: {
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },

  roomMiddleRow: {
    marginTop: 3,
  },

  roomStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  roomStatus: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "700",
  },

  presentingText: {
    marginLeft: 5,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
  },

  roomBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  roomPreview: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 19,
    paddingRight: 8,
  },

  /* =========================
      FOR YOU
  ========================= */

  forYouSection: {
    marginTop: 22,
    paddingTop: 18,
  },

  forYouHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  forYouHeaderText: {
    flex: 1,
  },

  seeAllText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 3,
    marginLeft: 12,
  },

  suggestedRoomCard: {
    minHeight: 94,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 9,
  },

  suggestedRoomIcon: {
    width: 49,
    height: 49,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  suggestedLiveDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -1,
    bottom: -1,
    borderWidth: 2,
  },

  suggestedRoomContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  suggestedRoomTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  suggestedRoomName: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  suggestedRoomDescription: {
    marginTop: 3,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "500",
  },

  suggestedRoomMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  suggestedStatus: {
    flexDirection: "row",
    alignItems: "center",
  },

  suggestedStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },

  suggestedStatusText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: "700",
  },

  suggestedPeople: {
    marginLeft: 9,
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: "500",
  },

  suggestedCategory: {
    marginLeft: 9,
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: "500",
  },

  /* =========================
      UNREAD
  ========================= */

  unreadBadge: {
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "900",
  },

  /* =========================
      EMPTY STATE
  ========================= */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 95,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "800",
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 6,
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 280,
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
