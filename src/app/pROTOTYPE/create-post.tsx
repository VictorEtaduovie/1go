import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
import { themes } from "@/theme/colors";

export default function CreatePostScreen() {
  const colorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  const [postText, setPostText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [audience, setAudience] = useState<"Public" | "Followers">("Public");
  const [showAudienceMenu, setShowAudienceMenu] = useState(false);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const topics = useMemo(() => ["Tech", "Life", "Thoughts"], []);

  const rooms = useMemo(
    () => ["General Conversation", "Technology Talk", "Life & Ideas"],
    [],
  );

  const canPost = postText.trim().length > 0;

  /* =========================
      ACTIONS
  ========================= */

  const handleBack = () => {
    router.back();
  };

  const handlePost = () => {
    if (!canPost) return;

    // Connect this to your actual post creation logic.
    router.back();
  };

  const handleTopicPress = (topic: string) => {
    setSelectedTopic((current) => (current === topic ? null : topic));
  };

  const handleAudiencePress = () => {
    setShowAudienceMenu((current) => !current);
    setShowRoomSelector(false);
  };

  const handleAudienceSelect = (value: "Public" | "Followers") => {
    setAudience(value);
    setShowAudienceMenu(false);
  };

  const handleRoomPress = () => {
    setShowRoomSelector((current) => !current);
    setShowAudienceMenu(false);
  };

  const handleRoomSelect = (room: string) => {
    setSelectedRoom((current) => (current === room ? null : room));
    setShowRoomSelector(false);
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
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* =========================
            HEADER
        ========================= */}
        <View
          style={[
            styles.header,
            {
              borderBottomColor: colors.divider,
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={styles.headerButton}
            hitSlop={10}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={colors.textPrimary}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            Create Post
          </Text>

          <TouchableOpacity
            activeOpacity={canPost ? 0.8 : 1}
            disabled={!canPost}
            onPress={handlePost}
            style={[
              styles.postButton,
              {
                backgroundColor: canPost
                  ? colors.primary
                  : colors.disabledBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.postButtonText,
                {
                  color: canPost ? "#FFFFFF" : colors.disabledText,
                },
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: 32,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              IDENTITY + AUDIENCE
          ========================= */}
          <View style={styles.identitySection}>
            <View style={styles.identityRow}>
              {/* Identity avatar */}
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? colors.surface
                        : colors.disabledBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="person"
                  size={27}
                  color={colors.textSecondary}
                />
              </View>

              {/* Identity information */}
              <View style={styles.identityText}>
                <Text
                  style={[
                    styles.identityName,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Your Identity
                </Text>

                <Text
                  style={[
                    styles.identityHandle,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  Your profile
                </Text>
              </View>

              {/* Audience */}
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleAudiencePress}
                style={[
                  styles.audienceButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={
                    audience === "Public" ? "globe-outline" : "people-outline"
                  }
                  size={17}
                  color={colors.textSecondary}
                />

                <Text
                  style={[
                    styles.audienceText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {audience}
                </Text>

                <Ionicons
                  name={showAudienceMenu ? "chevron-up" : "chevron-down"}
                  size={14}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* =========================
                FLOATING AUDIENCE MENU
            ========================= */}
            {showAudienceMenu && (
              <View
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleAudienceSelect("Public")}
                  style={styles.dropdownRow}
                >
                  <View style={styles.dropdownIcon}>
                    <Ionicons
                      name="globe-outline"
                      size={19}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.dropdownContent}>
                    <Text
                      style={[
                        styles.dropdownTitle,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      Public
                    </Text>

                    <Text
                      style={[
                        styles.dropdownDescription,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      Anyone on 1Go can see this post
                    </Text>
                  </View>

                  {audience === "Public" && (
                    <Ionicons
                      name="checkmark"
                      size={21}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleAudienceSelect("Followers")}
                  style={styles.dropdownRow}
                >
                  <View style={styles.dropdownIcon}>
                    <Ionicons
                      name="people-outline"
                      size={19}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.dropdownContent}>
                    <Text
                      style={[
                        styles.dropdownTitle,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      Followers
                    </Text>

                    <Text
                      style={[
                        styles.dropdownDescription,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      Only people who follow you
                    </Text>
                  </View>

                  {audience === "Followers" && (
                    <Ionicons
                      name="checkmark"
                      size={21}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* =========================
              COMPOSER
          ========================= */}
          <View
            style={[
              styles.composerContainer,
              {
                borderBottomColor: colors.divider,
              },
            ]}
          >
            <TextInput
              autoFocus
              multiline
              value={postText}
              onChangeText={setPostText}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.textSecondary}
              textAlignVertical="top"
              style={[
                styles.composer,
                {
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* =========================
              MEDIA
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Add photos or videos
            </Text>

            <View style={styles.mediaRow}>
              <TouchableOpacity
                activeOpacity={0.75}
                style={[
                  styles.mediaButton,
                  {
                    backgroundColor: colors.disabledBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="image-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                style={[
                  styles.mediaButton,
                  {
                    backgroundColor: colors.disabledBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="videocam-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* =========================
              TOPICS
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Add a topic (optional)
            </Text>

            <View style={styles.topicRow}>
              {topics.map((topic) => {
                const isSelected = selectedTopic === topic;

                return (
                  <TouchableOpacity
                    key={topic}
                    activeOpacity={0.75}
                    onPress={() => handleTopicPress(topic)}
                    style={[
                      styles.topicChip,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.disabledBackground,
                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.topicText,
                        {
                          color: isSelected ? "#FFFFFF" : colors.textSecondary,
                        },
                      ]}
                    >
                      #{topic}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* =========================
              CONNECT TO ROOM
          ========================= */}
          <View style={styles.section}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleRoomPress}
              style={styles.roomHeader}
            >
              <View style={styles.roomTitleRow}>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Connect to a room (optional)
                </Text>

                <Ionicons
                  name="information-circle-outline"
                  size={17}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleRoomPress}
              style={[
                styles.roomSelector,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.roomSelectorLeft}>
                <View
                  style={[
                    styles.roomIcon,
                    {
                      backgroundColor: colors.disabledBackground,
                    },
                  ]}
                >
                  <Ionicons
                    name="radio-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <Text
                  numberOfLines={1}
                  style={[
                    styles.roomSelectorText,
                    {
                      color: selectedRoom
                        ? colors.textPrimary
                        : colors.textSecondary,
                    },
                  ]}
                >
                  {selectedRoom || "Choose a room"}
                </Text>
              </View>

              <Ionicons
                name={showRoomSelector ? "chevron-up" : "chevron-forward"}
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {/* =========================
                ROOM LIST
            ========================= */}
            {showRoomSelector && (
              <View
                style={[
                  styles.roomDropdown,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {rooms.map((room) => {
                  const isSelected = selectedRoom === room;

                  return (
                    <TouchableOpacity
                      key={room}
                      activeOpacity={0.75}
                      onPress={() => handleRoomSelect(room)}
                      style={styles.roomOption}
                    >
                      <Ionicons
                        name="radio-outline"
                        size={19}
                        color={
                          isSelected ? colors.primary : colors.textSecondary
                        }
                      />

                      <Text
                        style={[
                          styles.roomOptionText,
                          {
                            color: colors.textPrimary,
                          },
                        ]}
                      >
                        {room}
                      </Text>

                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={21}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* =========================
              COMPOSER TOOLS
          ========================= */}
          <View
            style={[
              styles.toolsContainer,
              {
                borderTopColor: colors.divider,
              },
            ]}
          >
            <View style={styles.toolsGroup}>
              <TouchableOpacity activeOpacity={0.7} style={styles.toolButton}>
                <Ionicons
                  name="image-outline"
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.toolButton}>
                <Ionicons
                  name="happy-outline"
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.toolButton}>
                <Ionicons
                  name="stats-chart-outline"
                  size={21}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.toolButton}>
                <Text
                  style={[
                    styles.textToolIcon,
                    {
                      color: colors.primary,
                    },
                  ]}
                >
                  Aa
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.moreButton}>
              <Ionicons
                name="grid-outline"
                size={21}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {isSmallScreen && (
            <View
              style={{
                height: isVerySmallScreen ? 12 : 24,
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerButton: {
    width: 42,
    height: 42,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
  },

  postButton: {
    minWidth: 68,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  postButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  /* =========================
      MAIN CONTENT
  ========================= */

  scrollContent: {
    flexGrow: 1,
    paddingTop: 14,
  },

  /* =========================
      IDENTITY
  ========================= */

  identitySection: {
    position: "relative",
    zIndex: 20,
    elevation: 20,
  },

  identityRow: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  identityText: {
    flex: 1,
    paddingLeft: 12,
  },

  identityName: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  identityHandle: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },

  audienceButton: {
    minHeight: 36,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  audienceText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  /* =========================
      FLOATING AUDIENCE MENU
  ========================= */

  dropdown: {
    position: "absolute",
    top: 58,
    right: 0,
    width: 250,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 30,
    elevation: 30,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.14,
    shadowRadius: 14,
  },

  dropdownRow: {
    minHeight: 72,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownIcon: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownContent: {
    flex: 1,
    paddingHorizontal: 8,
  },

  dropdownTitle: {
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "800",
  },

  dropdownDescription: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
  },

  /* =========================
      COMPOSER
  ========================= */

  composerContainer: {
    minHeight: 170,
    paddingTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },

  composer: {
    minHeight: 145,
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "500",
    paddingTop: 0,
    paddingHorizontal: 0,
  },

  /* =========================
      SECTIONS
  ========================= */

  section: {
    paddingVertical: 17,
  },

  sectionTitle: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  /* =========================
      MEDIA
  ========================= */

  mediaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  mediaButton: {
    width: 72,
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      TOPICS
  ========================= */

  topicRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginTop: 12,
  },

  topicChip: {
    minHeight: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
  },

  topicText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: "700",
  },

  /* =========================
      ROOM
  ========================= */

  roomHeader: {
    minHeight: 24,
    justifyContent: "center",
  },

  roomTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  roomSelector: {
    minHeight: 58,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  roomSelectorLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  roomIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  roomSelectorText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },

  roomDropdown: {
    marginTop: 8,
    borderRadius: 15,
    borderWidth: 1,
    overflow: "hidden",
  },

  roomOption: {
    minHeight: 54,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  roomOptionText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: "600",
  },

  /* =========================
      TOOLS
  ========================= */

  toolsContainer: {
    minHeight: 65,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toolsGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  toolButton: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  textToolIcon: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900",
  },

  moreButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
