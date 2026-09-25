import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { darkColors, lightColors } from "@/theme/colors";

export default function PhoneScreen() {
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? darkColors : lightColors;

  const isDark = colorScheme === "dark";

  const [phone, setPhone] = useState("");

  const digitsOnly = phone.replace(/\D/g, "");
  const canContinue = digitsOnly.length >= 7;

  const handleContinue = () => {
    if (!canContinue) {
      if (__DEV__) {
        console.log(
          "[1Go Phone] Continue blocked - phone number is too short.",
        );
      }

      return;
    }

    if (__DEV__) {
      console.log("[1Go Phone] Continue pressed.");
      console.log("[1Go Phone] Phone digits:", digitsOnly);
      console.log("[1Go Phone] Navigating to /otp.");
    }

    router.push("/otp");
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 12}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Top navigation */}
            <View style={styles.topBar}>
              <Pressable
                onPress={() => {
                  if (__DEV__) {
                    console.log("[1Go Phone] Back pressed.");
                  }

                  router.back();
                }}
                hitSlop={10}
                style={({ pressed }) => [
                  styles.backButton,
                  {
                    borderColor: colors.border,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.035)"
                      : "rgba(255,255,255,0.72)",
                    opacity: pressed ? 0.65 : 1,
                  },
                ]}
              >
                <Ionicons
                  name="arrow-back"
                  size={18}
                  color={colors.textPrimary}
                />
              </Pressable>

              <View style={styles.brandRow}>
                <View
                  style={[
                    styles.brandMark,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  <Text style={styles.brandNumber}>1</Text>
                </View>

                <Text
                  style={[
                    styles.brandName,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  1Go
                </Text>
              </View>

              <View style={styles.topBarSpacer} />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text
                style={[
                  styles.eyebrow,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                GET STARTED
              </Text>

              <Text
                style={[
                  styles.title,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Your phone number
              </Text>

              <Text
                style={[
                  styles.description,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                We’ll use your number to create and secure your 1Go account.
              </Text>

              {/* Phone field */}
              <View style={styles.form}>
                <Text
                  style={[
                    styles.fieldLabel,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  PHONE NUMBER
                </Text>

                <View
                  style={[
                    styles.phoneField,
                    {
                      borderColor: phone ? colors.primary : colors.inputBorder,
                      backgroundColor: colors.inputBackground,
                    },
                  ]}
                >
                  <Pressable
                    style={styles.countryCode}
                    onPress={() => {
                      if (__DEV__) {
                        console.log("[1Go Phone] Country selector pressed.");
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.countryCodeText,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      +234
                    </Text>

                    <Ionicons
                      name="chevron-down"
                      size={14}
                      color={colors.textSecondary}
                    />
                  </Pressable>

                  <View
                    style={[
                      styles.divider,
                      {
                        backgroundColor: colors.divider,
                      },
                    ]}
                  />

                  <TextInput
                    value={phone}
                    onChangeText={(value) => {
                      const cleaned = value
                        .replace(/[^\d\s-]/g, "")
                        .slice(0, 15);

                      setPhone(cleaned);
                    }}
                    keyboardType="phone-pad"
                    placeholder="Phone number"
                    placeholderTextColor={colors.disabledText}
                    maxLength={15}
                    selectionColor={colors.primary}
                    style={[
                      styles.input,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                    textContentType="telephoneNumber"
                    autoComplete="tel"
                  />
                </View>

                <Text
                  style={[
                    styles.helper,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  You’ll receive a verification code by SMS.
                </Text>
              </View>
            </View>

            {/* Bottom action */}
            <View style={styles.footer}>
              <Pressable
                onPress={handleContinue}
                disabled={!canContinue}
                style={({ pressed }) => [
                  styles.continueButton,
                  {
                    backgroundColor: canContinue
                      ? colors.primary
                      : colors.disabledBackground,
                    opacity: pressed && canContinue ? 0.9 : 1,
                    transform: [
                      {
                        scale: pressed && canContinue ? 0.985 : 1,
                      },
                    ],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.continueText,
                    {
                      color: canContinue ? "#FFFFFF" : colors.disabledText,
                    },
                  ]}
                >
                  Continue
                </Text>

                <View
                  style={[
                    styles.continueIcon,
                    {
                      backgroundColor: canContinue
                        ? "rgba(255,255,255,0.15)"
                        : isDark
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(15,23,42,0.04)",
                    },
                  ]}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={17}
                    color={canContinue ? "#FFFFFF" : colors.disabledText}
                  />
                </View>
              </Pressable>

              <Text
                style={[
                  styles.legal,
                  {
                    color: colors.disabledText,
                  },
                ]}
              >
                By continuing, you agree to the 1Go Terms and Privacy Policy.
              </Text>
            </View>
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

  keyboard: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 18,
  },

  /* Top bar */

  topBar: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  brandMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  brandNumber: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  brandName: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.4,
  },

  topBarSpacer: {
    width: 40,
  },

  /* Content */

  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },

  eyebrow: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.8,
  },

  title: {
    marginTop: 11,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -1.35,
  },

  description: {
    marginTop: 12,
    maxWidth: 330,
    fontSize: 15,
    lineHeight: 23,
  },

  /* Form */

  form: {
    marginTop: 38,
  },

  fieldLabel: {
    marginBottom: 9,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.25,
  },

  phoneField: {
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  countryCode: {
    height: 42,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },

  countryCodeText: {
    fontSize: 15,
    fontWeight: "700",
  },

  divider: {
    width: 1,
    height: 24,
    marginRight: 12,
  },

  input: {
    flex: 1,
    height: 58,
    paddingVertical: 0,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  helper: {
    marginTop: 9,
    fontSize: 11,
    lineHeight: 17,
  },

  /* Footer */

  footer: {
    paddingTop: 12,
  },

  continueButton: {
    height: 58,
    borderRadius: 29,
    paddingLeft: 21,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  continueText: {
    fontSize: 15.5,
    fontWeight: "800",
    letterSpacing: -0.1,
  },

  continueIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  legal: {
    marginTop: 11,
    textAlign: "center",
    fontSize: 10.5,
    lineHeight: 16,
  },
});
