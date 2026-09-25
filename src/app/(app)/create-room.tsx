import React, { useMemo, useState } from "react";
import {
  Keyboard,
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

type RoomType = "Public" | "Private" | "Temporary";
type ScheduleType = "Start now" | "Schedule for later";

export default function CreateRoomScreen() {
  const colorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [roomType, setRoomType] = useState<RoomType>("Public");
  const [roomCategory, setRoomCategory] = useState("Technology");
  const [schedule, setSchedule] = useState<ScheduleType>("Start now");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categories = useMemo(
    () => [
      "Technology",
      "Music",
      "Life",
      "Sports",
      "Gaming",
      "Business",
      "Education",
      "Entertainment",
    ],
    [],
  );

  const canCreate = roomName.trim().length > 0;

  /* =========================
      ACTIONS
  ========================= */

  const handleBack = () => {
    router.back();
  };

  const handleCreateRoom = () => {
    if (!canCreate) return;

    Keyboard.dismiss();

    // Connect this to your actual room creation logic.
    router.back();
  };

  const handleNext = () => {
    if (!canCreate) return;

    Keyboard.dismiss();

    // Wire this to the next creation step when that route exists.
    // For now, the actual creation action remains at the bottom.
  };

  const handleRoomLogoPress = () => {
    // Connect this to your image picker/storage flow.
  };

  const handleRoomTypeSelect = (type: RoomType) => {
    setRoomType(type);
  };

  const handleCategoryPress = () => {
    setShowCategoryMenu((current) => !current);
  };

  const handleCategorySelect = (category: string) => {
    setRoomCategory(category);
    setShowCategoryMenu(false);
  };

  const handleScheduleSelect = (value: ScheduleType) => {
    setSchedule(value);
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
              paddingHorizontal: horizontalPadding,
              borderBottomColor: colors.divider,
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
            Create Room
          </Text>

          <TouchableOpacity
            activeOpacity={canCreate ? 0.8 : 1}
            disabled={!canCreate}
            onPress={handleNext}
            style={styles.nextButton}
          >
            <Text
              style={[
                styles.nextButtonText,
                {
                  color: canCreate ? colors.primary : colors.disabledText,
                },
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: 30,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              ROOM LOGO
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Room logo
            </Text>

            <View style={styles.logoRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleRoomLogoPress}
                style={[
                  styles.logoButton,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? colors.surface
                        : colors.disabledBackground,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Ionicons
                  name="image-outline"
                  size={30}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleRoomLogoPress}
                style={styles.addLogoButton}
              >
                <Text
                  style={[
                    styles.addLogoText,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Add logo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* =========================
              ROOM NAME
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Room name
            </Text>

            <TextInput
              value={roomName}
              onChangeText={setRoomName}
              placeholder="e.g. Tech Talk, Music Lovers..."
              placeholderTextColor={colors.textSecondary}
              returnKeyType="done"
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.inputBorder,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* =========================
              DESCRIPTION
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Add a description (optional)
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Tell people what your room is about..."
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
              style={[
                styles.descriptionInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.inputBorder,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          {/* =========================
              ROOM TYPE
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Room type
            </Text>

            <View
              style={[
                styles.roomTypeCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              {/* Public */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleRoomTypeSelect("Public")}
                style={[
                  styles.roomTypeRow,
                  {
                    backgroundColor:
                      roomType === "Public"
                        ? colorScheme === "dark"
                          ? "#142440"
                          : "#EEF6FF"
                        : colors.surface,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <View style={styles.roomTypeIcon}>
                  <Ionicons
                    name="globe-outline"
                    size={24}
                    color={
                      roomType === "Public"
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                </View>

                <View style={styles.roomTypeContent}>
                  <Text
                    style={[
                      styles.roomTypeTitle,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Public
                  </Text>

                  <Text
                    style={[
                      styles.roomTypeDescription,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    Anyone can join
                  </Text>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor:
                        roomType === "Public" ? colors.primary : colors.border,
                    },
                  ]}
                >
                  {roomType === "Public" && (
                    <View
                      style={[
                        styles.radioInner,
                        {
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* Private */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleRoomTypeSelect("Private")}
                style={[
                  styles.roomTypeRow,
                  {
                    backgroundColor:
                      roomType === "Private"
                        ? colorScheme === "dark"
                          ? "#142440"
                          : "#EEF6FF"
                        : colors.surface,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <View style={styles.roomTypeIcon}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={23}
                    color={
                      roomType === "Private"
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                </View>

                <View style={styles.roomTypeContent}>
                  <Text
                    style={[
                      styles.roomTypeTitle,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Private
                  </Text>

                  <Text
                    style={[
                      styles.roomTypeDescription,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    Invite only
                  </Text>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor:
                        roomType === "Private" ? colors.primary : colors.border,
                    },
                  ]}
                >
                  {roomType === "Private" && (
                    <View
                      style={[
                        styles.radioInner,
                        {
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* Temporary */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleRoomTypeSelect("Temporary")}
                style={[
                  styles.roomTypeRow,
                  styles.roomTypeRowLast,
                  {
                    backgroundColor:
                      roomType === "Temporary"
                        ? colorScheme === "dark"
                          ? "#142440"
                          : "#EEF6FF"
                        : colors.surface,
                  },
                ]}
              >
                <View style={styles.roomTypeIcon}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={23}
                    color={
                      roomType === "Temporary"
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                </View>

                <View style={styles.roomTypeContent}>
                  <Text
                    style={[
                      styles.roomTypeTitle,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Temporary
                  </Text>

                  <Text
                    style={[
                      styles.roomTypeDescription,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    Ends after the session
                  </Text>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor:
                        roomType === "Temporary"
                          ? colors.primary
                          : colors.border,
                    },
                  ]}
                >
                  {roomType === "Temporary" && (
                    <View
                      style={[
                        styles.radioInner,
                        {
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* =========================
              ROOM CATEGORY
          ========================= */}
          <View style={[styles.section, styles.categorySection]}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Room category
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCategoryPress}
              style={[
                styles.categorySelector,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.categoryLeft}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  {roomCategory}
                </Text>
              </View>

              <Ionicons
                name={showCategoryMenu ? "chevron-up" : "chevron-forward"}
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {/* =========================
                CATEGORY MENU
            ========================= */}
            {showCategoryMenu && (
              <View
                style={[
                  styles.categoryMenu,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {categories.map((category) => {
                  const isSelected = category === roomCategory;

                  return (
                    <TouchableOpacity
                      key={category}
                      activeOpacity={0.75}
                      onPress={() => handleCategorySelect(category)}
                      style={[
                        styles.categoryOption,
                        {
                          borderBottomColor: colors.divider,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryOptionText,
                          {
                            color: colors.textPrimary,
                          },
                        ]}
                      >
                        {category}
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
              SCHEDULE
          ========================= */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Set a schedule (optional)
            </Text>

            <View
              style={[
                styles.scheduleCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              {/* Start now */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleScheduleSelect("Start now")}
                style={[
                  styles.scheduleRow,
                  {
                    backgroundColor:
                      schedule === "Start now"
                        ? colorScheme === "dark"
                          ? "#142440"
                          : "#EEF6FF"
                        : colors.surface,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <View style={styles.scheduleIcon}>
                  <Ionicons
                    name="time-outline"
                    size={23}
                    color={
                      schedule === "Start now"
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                </View>

                <Text
                  style={[
                    styles.scheduleText,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Start now
                </Text>

                {schedule === "Start now" && (
                  <Ionicons name="checkmark" size={21} color={colors.primary} />
                )}
              </TouchableOpacity>

              {/* Schedule later */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleScheduleSelect("Schedule for later")}
                style={[
                  styles.scheduleRow,
                  styles.scheduleRowLast,
                  {
                    backgroundColor:
                      schedule === "Schedule for later"
                        ? colorScheme === "dark"
                          ? "#142440"
                          : "#EEF6FF"
                        : colors.surface,
                  },
                ]}
              >
                <View style={styles.scheduleIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={23}
                    color={
                      schedule === "Schedule for later"
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                </View>

                <Text
                  style={[
                    styles.scheduleText,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  Schedule for later
                </Text>

                {schedule === "Schedule for later" && (
                  <Ionicons name="checkmark" size={21} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* =========================
              CREATE ROOM
          ========================= */}
          <TouchableOpacity
            activeOpacity={canCreate ? 0.85 : 1}
            disabled={!canCreate}
            onPress={handleCreateRoom}
            style={[
              styles.createButton,
              {
                backgroundColor: canCreate
                  ? colors.primary
                  : colors.disabledBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.createButtonText,
                {
                  color: canCreate ? "#FFFFFF" : colors.disabledText,
                },
              ]}
            >
              Create Room
            </Text>
          </TouchableOpacity>

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

  nextButton: {
    minWidth: 55,
    height: 42,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  nextButtonText: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  /* =========================
      CONTENT
  ========================= */

  scrollContent: {
    flexGrow: 1,
    paddingTop: 12,
  },

  section: {
    marginBottom: 22,
  },

  label: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
    marginBottom: 10,
  },

  /* =========================
      ROOM LOGO
  ========================= */

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoButton: {
    width: 108,
    height: 108,
    borderRadius: 30,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  addLogoButton: {
    marginLeft: 18,
    minHeight: 48,
    justifyContent: "center",
  },

  addLogoText: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "700",
  },

  /* =========================
      INPUTS
  ========================= */

  input: {
    minHeight: 58,
    borderRadius: 15,
    borderWidth: 1.5,
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
  },

  descriptionInput: {
    minHeight: 104,
    borderRadius: 15,
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
  },

  /* =========================
      ROOM TYPE
  ========================= */

  roomTypeCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  roomTypeRow: {
    minHeight: 76,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },

  roomTypeRowLast: {
    borderBottomWidth: 0,
  },

  roomTypeIcon: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  roomTypeContent: {
    flex: 1,
    paddingHorizontal: 8,
  },

  roomTypeTitle: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  roomTypeDescription: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },

  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  /* =========================
      CATEGORY
  ========================= */

  categorySection: {
    position: "relative",
    zIndex: 20,
  },

  categorySelector: {
    minHeight: 57,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryLeft: {
    flex: 1,
  },

  categoryText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },

  categoryMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 88,
    borderRadius: 15,
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

  categoryOption: {
    minHeight: 51,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },

  categoryOptionText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },

  /* =========================
      SCHEDULE
  ========================= */

  scheduleCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  scheduleRow: {
    minHeight: 65,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },

  scheduleRowLast: {
    borderBottomWidth: 0,
  },

  scheduleIcon: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  scheduleText: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "700",
  },

  /* =========================
      CREATE BUTTON
  ========================= */

  createButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  createButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
});
