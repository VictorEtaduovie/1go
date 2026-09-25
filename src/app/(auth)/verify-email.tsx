import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
import { router, useLocalSearchParams } from "expo-router";

import { themes } from "@/theme/colors";

const electricAzure = themes.electricAzure;

export default function VerifyEmailScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const params = useLocalSearchParams<{ email?: string }>();

  const email =
    typeof params.email === "string" ? params.email : "maya@example.com";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(42);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(22, Math.min(30, width * 0.075));

  const headerTopMargin = isVerySmallScreen ? 18 : isSmallScreen ? 26 : 38;

  const codeMarginTop = isVerySmallScreen ? 28 : isSmallScreen ? 38 : 50;

  const buttonMarginTop = isVerySmallScreen ? 28 : isSmallScreen ? 36 : 44;

  const helpMarginTop = isVerySmallScreen ? 25 : isSmallScreen ? 34 : 42;

  const buttonHeight = isVerySmallScreen ? 54 : isSmallScreen ? 58 : 64;

  const codeBoxSize = Math.min(
    56,
    Math.max(48, (width - horizontalPadding * 2 - 5 * 10) / 6),
  );

  const enteredCode = code.join("");
  const isComplete = enteredCode.length === 6;

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleCodeChange = (value: string, index: number) => {
    // Allow only numbers.
    const digits = value.replace(/\D/g, "");

    // Handle paste / multiple digits.
    if (digits.length > 1) {
      const pastedDigits = digits.slice(0, 6).split("");

      const newCode = ["", "", "", "", "", ""];

      pastedDigits.forEach((digit, pastedIndex) => {
        newCode[pastedIndex] = digit;
      });

      setCode(newCode);

      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    const newCode = [...code];
    newCode[index] = digits;
    setCode(newCode);

    if (digits && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;

    // Connect your resend-email API here.
    setSecondsLeft(42);

    Alert.alert(
      "Code sent",
      "A new verification code has been sent to your email address.",
    );
  };

  const handleVerify = async () => {
    if (!isComplete || isVerifying) return;

    setIsVerifying(true);

    try {
      // Connect your email verification API here.
      // Example:
      // await verifyEmail(email, enteredCode);

      Alert.alert("Verification successful", "Your email has been verified.");
    } catch {
      Alert.alert(
        "Verification failed",
        "The verification code could not be confirmed. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const formattedTime = `00:${String(secondsLeft).padStart(2, "0")}`;

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
            Verify your email
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            We sent a 6-digit code to
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={[
              styles.emailText,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {email}
          </Text>
        </View>

        {/* =========================
            CODE INPUTS
        ========================= */}
        <View
          style={[
            styles.codeRow,
            {
              marginTop: codeMarginTop,
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          {code.map((digit, index) => {
            const isFocused = focusedIndex === index;

            return (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={6}
                selectTextOnFocus
                textAlign="center"
                style={[
                  styles.codeInput,
                  {
                    width: codeBoxSize,
                    height: codeBoxSize + 4,
                    backgroundColor: colors.surface,
                    borderColor: isFocused ? colors.primary : colors.border,
                    color: colors.textPrimary,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* =========================
            RESEND
        ========================= */}
        <View style={styles.resendContainer}>
          {secondsLeft > 0 ? (
            <Text
              style={[
                styles.resendText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Resend code in{" "}
              <Text
                style={{
                  color: colors.textPrimary,
                  fontWeight: "700",
                }}
              >
                {formattedTime}
              </Text>
            </Text>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Resend verification code"
              onPress={handleResend}
              hitSlop={8}
            >
              <Text
                style={[
                  styles.resendLink,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                Resend code
              </Text>
            </Pressable>
          )}
        </View>

        {/* =========================
            VERIFY BUTTON
        ========================= */}
        <View
          style={[
            styles.actionArea,
            {
              paddingHorizontal: horizontalPadding,
              marginTop: buttonMarginTop,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Verify email"
            disabled={!isComplete || isVerifying}
            onPress={handleVerify}
            style={({ pressed }) => [
              styles.verifyButton,
              {
                height: buttonHeight,
                backgroundColor: isComplete
                  ? pressed
                    ? colors.primaryPressed
                    : colors.primary
                  : colors.disabledBackground,
                opacity: pressed && isComplete ? 0.94 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.verifyButtonText,
                {
                  color: isComplete ? "#FFFFFF" : colors.disabledText,
                },
              ]}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Text>
          </Pressable>
        </View>

        {/* =========================
            HELP / CHANGE EMAIL
        ========================= */}
        <View
          style={[
            styles.helpArea,
            {
              marginTop: helpMarginTop,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Use a different email"
            onPress={() => router.back()}
            hitSlop={8}
          >
            <Text
              style={[
                styles.changeEmailText,
                {
                  color: colors.primary,
                },
              ]}
            >
              Use a different email
            </Text>
          </Pressable>

          <Text
            style={[
              styles.helpText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Having trouble? Check spam or promotions.
          </Text>
        </View>

        {/* =========================
            FOOTER
        ========================= */}
        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: horizontalPadding,
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
    marginTop: 8,
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: "500",
  },

  emailText: {
    marginTop: 3,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
  },

  /* =========================
      CODE
  ========================= */

  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  codeInput: {
    borderRadius: 15,
    borderWidth: 1.5,
    fontSize: 19,
    fontWeight: "800",
    padding: 0,
  },

  /* =========================
      RESEND
  ========================= */

  resendContainer: {
    alignItems: "center",
    marginTop: 25,
    minHeight: 22,
    justifyContent: "center",
  },

  resendText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
  },

  resendLink: {
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: "700",
  },

  /* =========================
      VERIFY
  ========================= */

  actionArea: {
    width: "100%",
  },

  verifyButton: {
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  verifyButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },

  /* =========================
      HELP
  ========================= */

  helpArea: {
    alignItems: "center",
  },

  changeEmailText: {
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: "700",
  },

  helpText: {
    marginTop: 34,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    textAlign: "center",
  },

  /* =========================
      FOOTER
  ========================= */

  footer: {
    marginTop: "auto",
    alignItems: "center",
  },

  tagline: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
  },
});
