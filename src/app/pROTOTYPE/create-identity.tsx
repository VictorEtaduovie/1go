import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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

export default function CreateIdentityScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(22, Math.min(30, width * 0.075));

  const usernameLooksValid =
    username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(username.trim());

  const handleContinue = () => {
    if (!fullName.trim()) {
      return;
    }

    if (!username.trim()) {
      return;
    }

    // Save profile data here later.
    router.push("/(auth)/interests");
  };

  const handlePhotoPress = () => {
    // Connect the image picker here later.
  };

  const handleDatePress = () => {
    // Connect date picker here later.
  };

  const handleCountryPress = () => {
    // Connect country selector here later.
  };

  const handleLanguagePress = () => {
    // Connect language selector here later.
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
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: isVerySmallScreen ? 20 : 28,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              TOP BAR
          ========================= */}
          <View style={styles.topBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={10}
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons
                name="chevron-back"
                size={25}
                color={colors.textSecondary}
              />
            </Pressable>

            <Text
              style={[
                styles.topTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Create Your 1Go Identity
            </Text>

            <View style={styles.topBarSpacer} />
          </View>

          {/* =========================
              PROGRESS
          ========================= */}
          <View
            style={[
              styles.progressSection,
              {
                marginTop: isVerySmallScreen ? 14 : 19,
              },
            ]}
          >
            <View
              style={[
                styles.progressTrack,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#25304A" : "#DCE3EF",
                },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            </View>

            <View style={styles.progressLabels}>
              <Text
                style={[
                  styles.progressText,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Step 1 of 2
              </Text>

              <Text
                style={[
                  styles.progressText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                50%
              </Text>
            </View>
          </View>

          {/* =========================
              MAIN HEADING
          ========================= */}
          <View
            style={[
              styles.headingArea,
              {
                marginTop: isVerySmallScreen ? 28 : 38,
              },
            ]}
          >
            <Text
              style={[
                styles.mainHeading,
                {
                  color: colors.textPrimary,
                  fontSize: isVerySmallScreen ? 24 : 27,
                },
              ]}
            >
              This is who you are on 1Go.
            </Text>
          </View>

          {/* =========================
              PROFILE PHOTO
          ========================= */}
          <View
            style={[
              styles.photoSection,
              {
                marginTop: isVerySmallScreen ? 28 : 36,
              },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add profile photo"
              onPress={handlePhotoPress}
              style={styles.photoButton}
            >
              <View
                style={[
                  styles.photoCircle,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="camera-outline"
                  size={38}
                  color={colors.disabledText}
                />
              </View>

              <View
                style={[
                  styles.photoAddButton,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.background,
                  },
                ]}
              >
                <Ionicons name="add" size={23} color="#FFFFFF" />
              </View>
            </Pressable>
          </View>

          {/* =========================
              FULL NAME
          ========================= */}
          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Full name
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={colors.disabledText}
                autoCapitalize="words"
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              />
            </View>
          </View>

          {/* =========================
              USERNAME
          ========================= */}
          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Username
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: usernameLooksValid
                    ? colors.online
                    : colors.border,
                },
              ]}
            >
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a username"
                placeholderTextColor={colors.disabledText}
                autoCapitalize="none"
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              />

              {usernameLooksValid && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={colors.online}
                />
              )}
            </View>

            {usernameLooksValid && (
              <Text
                style={[
                  styles.availableText,
                  {
                    color: colors.online,
                  },
                ]}
              >
                Username is available
              </Text>
            )}
          </View>

          {/* =========================
              BIO
          ========================= */}
          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Bio (optional)
            </Text>

            <View
              style={[
                styles.inputContainer,
                styles.bioContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Tell others a little about yourself..."
                placeholderTextColor={colors.disabledText}
                multiline
                textAlignVertical="top"
                maxLength={160}
                style={[
                  styles.bioInput,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              />
            </View>
          </View>

          {/* =========================
              DATE OF BIRTH
          ========================= */}
          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Date of birth (optional)
            </Text>

            <Pressable
              onPress={handleDatePress}
              style={[
                styles.selectContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: dateOfBirth
                      ? colors.textPrimary
                      : colors.textSecondary,
                  },
                ]}
              >
                {dateOfBirth || "Select date"}
              </Text>

              <Ionicons
                name="chevron-down"
                size={17}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>

          {/* =========================
              COUNTRY / REGION
          ========================= */}
          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Country / region
            </Text>

            <Pressable
              onPress={handleCountryPress}
              style={[
                styles.selectContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: country ? colors.textPrimary : colors.textSecondary,
                  },
                ]}
              >
                {country || "Select country or region"}
              </Text>

              <Ionicons
                name="chevron-down"
                size={17}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>

          {/* =========================
              LANGUAGE
          ========================= */}
          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Language
            </Text>

            <Pressable
              onPress={handleLanguagePress}
              style={[
                styles.selectContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: language ? colors.textPrimary : colors.textSecondary,
                  },
                ]}
              >
                {language || "Select language"}
              </Text>

              <Ionicons
                name="chevron-down"
                size={17}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>

          {/* =========================
              CONTINUE
          ========================= */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            disabled={!fullName.trim() || !username.trim()}
            onPress={handleContinue}
            style={({ pressed }) => [
              styles.continueButton,
              {
                backgroundColor:
                  fullName.trim() && username.trim()
                    ? pressed
                      ? colors.primaryPressed
                      : colors.primary
                    : colors.disabledBackground,
                opacity:
                  pressed && fullName.trim() && username.trim() ? 0.94 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color:
                    fullName.trim() && username.trim()
                      ? "#FFFFFF"
                      : colors.disabledText,
                },
              ]}
            >
              Continue
            </Text>
          </Pressable>

          {/* =========================
              FOOTER
          ========================= */}
          <View style={styles.footer}>
            <Text
              style={[
                styles.tagline,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                }}
              >
                1Go
              </Text>
              {"  •  "}
              Real People. Live Conversations. New Connections.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 5,
  },

  /* =========================
      TOP BAR
  ========================= */

  topBar: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  topBarSpacer: {
    width: 42,
    height: 42,
  },

  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
  },

  /* =========================
      PROGRESS
  ========================= */

  progressSection: {
    width: "100%",
  },

  progressTrack: {
    width: "100%",
    height: 7,
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    width: "50%",
    height: "100%",
    borderRadius: 5,
  },

  progressLabels: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressText: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "600",
  },

  /* =========================
      HEADING
  ========================= */

  headingArea: {
    alignItems: "center",
  },

  mainHeading: {
    textAlign: "center",
    lineHeight: 33,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  /* =========================
      PHOTO
  ========================= */

  photoSection: {
    alignItems: "center",
  },

  photoButton: {
    width: 126,
    height: 126,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  photoCircle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  photoAddButton: {
    position: "absolute",
    right: -2,
    bottom: -1,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      FORM
  ========================= */

  field: {
    marginTop: 17,
  },

  label: {
    marginBottom: 6,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
  },

  inputContainer: {
    minHeight: 61,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
  },

  bioContainer: {
    minHeight: 76,
    paddingVertical: 13,
    alignItems: "flex-start",
  },

  bioInput: {
    width: "100%",
    minHeight: 48,
    padding: 0,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  availableText: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "600",
  },

  /* =========================
      SELECT
  ========================= */

  selectContainer: {
    minHeight: 61,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  selectText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
  },

  /* =========================
      CONTINUE
  ========================= */

  continueButton: {
    height: 61,
    borderRadius: 31,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    fontSize: 16,
    fontWeight: "800",
  },

  /* =========================
      FOOTER
  ========================= */

  footer: {
    alignItems: "center",
    marginTop: 21,
  },

  tagline: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
  },
});
