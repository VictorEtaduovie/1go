import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { themes } from "@/theme/colors";

const electricAzure = themes.electricAzure;

export default function GetStartedScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  // Electric Azure is the default theme.
  // The screen automatically follows light/dark mode.
  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  // Responsive sizing for smaller phones.
  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(22, Math.min(30, width * 0.075));

  const contentTopMargin = isVerySmallScreen ? 28 : isSmallScreen ? 38 : 52;

  const dividerMargin = isVerySmallScreen ? 18 : isSmallScreen ? 24 : 30;

  const signInMarginTop = isVerySmallScreen ? 32 : isSmallScreen ? 44 : 58;

  const infoCardMarginTop = isVerySmallScreen ? 22 : isSmallScreen ? 30 : 38;

  const footerTaglineMargin = isVerySmallScreen ? 14 : isSmallScreen ? 20 : 28;

  const buttonHeight = isVerySmallScreen ? 54 : isSmallScreen ? 58 : 62;

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
      <View style={styles.container}>
        {/* =========================
            TOP AREA
        ========================= */}
        <View>
          <View
            style={[
              styles.topBar,
              {
                height: isVerySmallScreen ? 50 : 56,
              },
            ]}
          >
            {/* BACK BUTTON */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={10}
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons
                name="chevron-back"
                size={24}
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

          {/* HEADER */}
          <View
            style={[
              styles.header,
              {
                marginTop: isVerySmallScreen ? 20 : isSmallScreen ? 26 : 34,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                  fontSize: isVerySmallScreen ? 26 : 29,
                },
              ]}
            >
              Get started
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Choose how you want to continue.
            </Text>
          </View>
        </View>

        {/* =========================
            CONTENT
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
          {/* GOOGLE BUTTON */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
            onPress={() => {
              // Add Google authentication here later.
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                height: buttonHeight,
                backgroundColor: pressed
                  ? colors.primaryPressed
                  : colors.primary,
                opacity: pressed ? 0.94 : 1,
              },
            ]}
          >
            <View style={styles.googleMark}>
              <Text style={styles.googleG}>G</Text>
            </View>

            <Text
              style={[
                styles.primaryButtonText,
                {
                  fontSize: isVerySmallScreen ? 15 : 16,
                },
              ]}
            >
              Continue with Google
            </Text>

            <View style={styles.buttonIconSpacer} />
          </Pressable>

          {/* OR DIVIDER */}
          <View
            style={[
              styles.dividerRow,
              {
                marginVertical: dividerMargin,
              },
            ]}
          >
            <View
              style={[
                styles.dividerLine,
                {
                  backgroundColor: colors.divider,
                },
              ]}
            />

            <Text
              style={[
                styles.orText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              or
            </Text>

            <View
              style={[
                styles.dividerLine,
                {
                  backgroundColor: colors.divider,
                },
              ]}
            />
          </View>

          {/* EMAIL BUTTON */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue with Email"
            onPress={() => router.push("/(auth)/email")}
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                height: buttonHeight,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                opacity: pressed ? 0.88 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                {
                  color: colors.textPrimary,
                  fontSize: isVerySmallScreen ? 15 : 16,
                },
              ]}
            >
              Continue with Email
            </Text>
          </Pressable>

          {/* SIGN IN */}
          <View
            style={[
              styles.signInRow,
              {
                marginTop: signInMarginTop,
              },
            ]}
          >
            <Text
              style={[
                styles.signInText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Already have an account?
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign in"
              hitSlop={6}
              onPress={() => router.push("/(auth)/signin")}
            >
              <Text
                style={[
                  styles.signInLink,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                {" "}
                Sign in
              </Text>
            </Pressable>
          </View>

          {/* ACCOUNT INFO CARD */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                marginTop: infoCardMarginTop,
                paddingVertical: isVerySmallScreen ? 14 : 17,
              },
            ]}
          >
            <Text
              style={[
                styles.infoTitle,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              1Go account
            </Text>

            <Text
              style={[
                styles.infoText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Use Google or email to create or access your 1Go account.
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
              paddingHorizontal: isVerySmallScreen ? 18 : 24,
            },
          ]}
        >
          <Text
            style={[
              styles.termsText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            By continuing, you agree to the Terms of Service and Privacy Policy.
          </Text>

          <Text
            style={[
              styles.tagline,
              {
                color: colors.textSecondary,
                marginTop: footerTaglineMargin,
              },
            ]}
          >
            <Text style={{ color: colors.textPrimary }}>1Go</Text>
            {"  •  "}
            Real People. Live Conversations. New Connections.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 8,
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
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -0.8,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
    textAlign: "center",
  },

  /* =========================
      CONTENT
  ========================= */

  content: {
    width: "100%",
  },

  /* =========================
      GOOGLE BUTTON
  ========================= */

  primaryButton: {
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  googleMark: {
    width: 30,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  googleG: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 27,
    fontWeight: "900",
  },

  primaryButtonText: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "800",
    textAlign: "center",
  },

  buttonIconSpacer: {
    width: 30,
  },

  /* =========================
      DIVIDER
  ========================= */

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dividerLine: {
    height: 1,
    flex: 1,
  },

  orText: {
    width: 54,
    textAlign: "center",
    fontSize: 12.5,
    fontWeight: "500",
  },

  /* =========================
      EMAIL BUTTON
  ========================= */

  secondaryButton: {
    borderRadius: 32,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontWeight: "800",
  },

  /* =========================
      SIGN IN
  ========================= */

  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  signInText: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: "500",
  },

  signInLink: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: "700",
  },

  /* =========================
      ACCOUNT CARD
  ========================= */

  infoCard: {
    minHeight: 82,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 18,
  },

  infoTitle: {
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "800",
  },

  infoText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },

  /* =========================
      FOOTER
  ========================= */

  footer: {
    alignItems: "center",
    marginTop: "auto",
  },

  termsText: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
  },

  tagline: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
  },
});
