import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

export default function EmailScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const [email, setEmail] = useState("");

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(22, Math.min(30, width * 0.075));

  const headerTopMargin = isVerySmallScreen ? 18 : isSmallScreen ? 26 : 36;

  const contentTopMargin = isVerySmallScreen ? 34 : isSmallScreen ? 46 : 62;

  const verificationMarginTop = isVerySmallScreen
    ? 38
    : isSmallScreen
      ? 52
      : 72;

  const footerMarginTop = isVerySmallScreen ? 18 : isSmallScreen ? 24 : 32;

  const buttonHeight = isVerySmallScreen ? 54 : isSmallScreen ? 58 : 64;

  const trimmedEmail = email.trim();

  const isValidEmail =
    trimmedEmail.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

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
        <View style={styles.container}>
          {/* =========================
              TOP BAR
          ========================= */}
          <View
            style={[
              styles.topBar,
              {
                height: isVerySmallScreen ? 50 : 56,
              },
            ]}
          >
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

            {/* 1GO LOGO */}
            <View style={styles.logo}>
              <Text
                style={[
                  styles.logoOne,
                  {
                    color: colors.primary,
                    fontSize: isVerySmallScreen ? 35 : 39,
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
                      fontSize: isVerySmallScreen ? 35 : 39,
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

            {/* BALANCER */}
            <View style={styles.topBarSpacer} />
          </View>

          {/* =========================
              HEADER
          ========================= */}
          <View
            style={[
              styles.header,
              {
                marginTop: headerTopMargin,
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                  fontSize: isVerySmallScreen ? 25 : 28,
                },
              ]}
            >
              Enter your email
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              We'll send a verification code to your email address.
            </Text>
          </View>

          {/* =========================
              MAIN CONTENT
          ========================= */}
          <View
            style={[
              styles.content,
              {
                paddingHorizontal: horizontalPadding,
                marginTop: contentTopMargin,
              },
            ]}
          >
            {/* EMAIL INPUT */}
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: email ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.inputLabel,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Email address
              </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={colors.disabledText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="done"
                style={[
                  styles.input,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              />
            </View>

            {/* CONTINUE BUTTON */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue"
              disabled={!isValidEmail}
              onPress={() => {
                if (!isValidEmail) return;

                router.push({
                  pathname: "/(auth)/verify-email",
                  params: {
                    email: trimmedEmail,
                  },
                });
              }}
              style={({ pressed }) => [
                styles.continueButton,
                {
                  height: buttonHeight,
                  backgroundColor: isValidEmail
                    ? pressed
                      ? colors.primaryPressed
                      : colors.primary
                    : colors.disabledBackground,
                  opacity: pressed && isValidEmail ? 0.94 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.continueButtonText,
                  {
                    color: isValidEmail ? "#FFFFFF" : colors.disabledText,
                  },
                ]}
              >
                Continue
              </Text>
            </Pressable>

            {/* BACK TO SIGN-IN OPTIONS */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to sign-in options"
              hitSlop={8}
              onPress={() => router.back()}
              style={styles.optionsButton}
            >
              <Text
                style={[
                  styles.optionsText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                Back to sign-in options
              </Text>
            </Pressable>

            {/* VERIFICATION CARD */}
            <View
              style={[
                styles.verificationCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  marginTop: verificationMarginTop,
                },
              ]}
            >
              <Text
                style={[
                  styles.verificationTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Verification
              </Text>

              <Text
                style={[
                  styles.verificationText,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                A 6-digit code will be sent to the email above.
              </Text>
            </View>
          </View>

          {/* =========================
              FOOTER
          ========================= */}
          <View
            style={[
              styles.footer,
              {
                marginTop: "auto",
                paddingHorizontal: horizontalPadding,
                paddingBottom: footerMarginTop,
              },
            ]}
          >
            <Text
              style={[
                styles.tagline,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              <Text style={{ color: colors.textPrimary }}>1Go</Text>
              {"  •  "}
              Real People. Live Conversations. New Connections.
            </Text>
          </View>
        </View>
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

  container: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
  },

  /* =========================
      TOP BAR
  ========================= */

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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

  /* =========================
      LOGO
  ========================= */

  logo: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  logoOne: {
    lineHeight: 42,
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
    lineHeight: 42,
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

  /* =========================
      HEADER
  ========================= */

  header: {
    alignItems: "flex-start",
  },

  title: {
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: "500",
  },

  /* =========================
      CONTENT
  ========================= */

  content: {
    width: "100%",
  },

  /* =========================
      EMAIL INPUT
  ========================= */

  inputContainer: {
    minHeight: 70,
    borderRadius: 17,
    borderWidth: 1.5,
    paddingHorizontal: 19,
    paddingTop: 10,
    justifyContent: "center",
  },

  inputLabel: {
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
  },

  input: {
    padding: 0,
    marginTop: 1,
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "600",
  },

  /* =========================
      CONTINUE BUTTON
  ========================= */

  continueButton: {
    marginTop: 16,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },

  /* =========================
      OPTIONS
  ========================= */

  optionsButton: {
    alignSelf: "center",
    marginTop: 18,
    paddingVertical: 5,
  },

  optionsText: {
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: "600",
  },

  /* =========================
      VERIFICATION CARD
  ========================= */

  verificationCard: {
    minHeight: 96,
    borderRadius: 19,
    borderWidth: 1.5,
    paddingHorizontal: 19,
    paddingVertical: 17,
  },

  verificationTitle: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "800",
  },

  verificationText: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },

  /* =========================
      FOOTER
  ========================= */

  footer: {
    alignItems: "center",
  },

  tagline: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
  },
});
