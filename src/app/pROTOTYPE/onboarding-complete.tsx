import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
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

export default function OnboardingCompleteScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(24, Math.min(30, width * 0.075));

  /* =========================
      ANIMATION VALUES
  ========================= */

  const circleScale = useRef(new Animated.Value(0.72)).current;

  const circleOpacity = useRef(new Animated.Value(0)).current;

  const checkScale = useRef(new Animated.Value(0.55)).current;

  const checkOpacity = useRef(new Animated.Value(0)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;

  const contentTranslateY = useRef(new Animated.Value(18)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const buttonTranslateY = useRef(new Animated.Value(20)).current;

  const discoveryOpacity = useRef(new Animated.Value(0)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const entranceAnimation = Animated.sequence([
      /* Circle appears */
      Animated.parallel([
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),

        Animated.spring(circleScale, {
          toValue: 1,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        }),
      ]),

      /* Checkmark appears */
      Animated.parallel([
        Animated.spring(checkScale, {
          toValue: 1,
          friction: 5,
          tension: 90,
          useNativeDriver: true,
        }),

        Animated.timing(checkOpacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),

      /* Text appears */
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),

        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      /* Button appears */
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),

        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      /* Discovery line */
      Animated.timing(discoveryOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),

      /* Footer */
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    entranceAnimation.start();

    return () => {
      entranceAnimation.stop();
    };
  }, [
    circleScale,
    circleOpacity,
    checkScale,
    checkOpacity,
    contentOpacity,
    contentTranslateY,
    buttonOpacity,
    buttonTranslateY,
    discoveryOpacity,
    footerOpacity,
  ]);

  /* =========================
      VERY SUBTLE PULSE
  ========================= */

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.delay(900),

      Animated.timing(pulseScale, {
        toValue: 1.035,
        duration: 650,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),

      Animated.timing(pulseScale, {
        toValue: 1,
        duration: 650,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ]);

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [pulseScale]);

  const logoSize = isVerySmallScreen ? 35 : isSmallScreen ? 38 : 42;

  const checkCircleSize = isVerySmallScreen ? 145 : isSmallScreen ? 165 : 185;

  const checkIconSize = isVerySmallScreen ? 70 : isSmallScreen ? 80 : 90;

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
            LOGO
        ========================= */}
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Text
              style={[
                styles.logoOne,
                {
                  color: colors.primary,
                  fontSize: logoSize,
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
                    fontSize: logoSize,
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
        </View>

        {/* =========================
            MAIN CONTENT
        ========================= */}
        <View
          style={[
            styles.mainContent,
            {
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          {/* CHECK CIRCLE */}
          <Animated.View
            style={[
              styles.checkCircleAnimated,
              {
                opacity: circleOpacity,
                transform: [{ scale: circleScale }, { scale: pulseScale }],
              },
            ]}
          >
            <View
              style={[
                styles.checkCircle,
                {
                  width: checkCircleSize,
                  height: checkCircleSize,
                  borderRadius: checkCircleSize / 2,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Animated.View
                style={{
                  opacity: checkOpacity,
                  transform: [{ scale: checkScale }],
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={checkIconSize}
                  color={colors.accent}
                />
              </Animated.View>
            </View>
          </Animated.View>

          {/* TITLE + DESCRIPTION */}
          <Animated.View
            style={{
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslateY,
                },
              ],
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                  fontSize: isVerySmallScreen ? 27 : 30,
                },
              ]}
            >
              You're all set
            </Text>

            <View style={styles.description}>
              <Text
                style={[
                  styles.descriptionLine,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Your 1Go identity is ready.
              </Text>

              <Text
                style={[
                  styles.descriptionLine,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Let's get you into the conversation.
              </Text>
            </View>
          </Animated.View>

          {/* ENTER 1GO BUTTON */}
          <Animated.View
            style={{
              width: "100%",
              opacity: buttonOpacity,
              transform: [
                {
                  translateY: buttonTranslateY,
                },
              ],
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Enter 1Go"
              onPress={() => router.replace("/rooms")}
              style={({ pressed }) => [
                styles.enterButton,
                {
                  height: buttonHeight,
                  backgroundColor: pressed
                    ? colors.primaryPressed
                    : colors.primary,
                  opacity: pressed ? 0.94 : 1,
                },
              ]}
            >
              <Text style={styles.enterButtonText}>Enter 1Go</Text>

              <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
            </Pressable>
          </Animated.View>

          {/* PERSONALIZED DISCOVERY */}
          <Animated.Text
            style={[
              styles.discoveryText,
              {
                color: colors.textSecondary,
                opacity: discoveryOpacity,
              },
            ]}
          >
            Your personalized discovery starts next.
          </Animated.Text>
        </View>

        {/* =========================
            FOOTER
        ========================= */}
        <Animated.View
          style={[
            styles.footer,
            {
              paddingHorizontal: horizontalPadding,
              opacity: footerOpacity,
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
        </Animated.View>
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
    paddingTop: 8,
    paddingBottom: 8,
  },

  /* =========================
      LOGO
  ========================= */

  logoSection: {
    alignItems: "center",
  },

  logo: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  logoOne: {
    lineHeight: 45,
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
    lineHeight: 45,
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
      MAIN CONTENT
  ========================= */

  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      CHECK
  ========================= */

  checkCircleAnimated: {
    alignItems: "center",
    justifyContent: "center",
  },

  checkCircle: {
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
      TITLE
  ========================= */

  title: {
    marginTop: 34,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -0.8,
    textAlign: "center",
  },

  /* =========================
      DESCRIPTION
  ========================= */

  description: {
    marginTop: 9,
    alignItems: "center",
  },

  descriptionLine: {
    fontSize: 14.5,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center",
  },

  /* =========================
      BUTTON
  ========================= */

  enterButton: {
    width: "100%",
    borderRadius: 31,
    marginTop: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  enterButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  /* =========================
      DISCOVERY
  ========================= */

  discoveryText: {
    marginTop: 35,
    fontSize: 12.5,
    lineHeight: 19,
    fontWeight: "500",
    textAlign: "center",
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
