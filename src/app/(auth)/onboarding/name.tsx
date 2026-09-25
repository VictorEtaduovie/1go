import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

import { darkColors, lightColors } from "@/theme/colors";

export default function NameScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkColors : lightColors;
  const isDark = colorScheme === "dark";

  const scrollRef = useRef<ScrollView>(null);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");

  const [focusedField, setFocusedField] = useState<
    "name" | "username" | "dob" | "city" | null
  >(null);

  const normalizedUsername = username.trim().toLowerCase();

  const cleanDate = dateOfBirth.replace(/\D/g, "");

  const isUsernameValid =
    normalizedUsername.length >= 3 && /^[a-z0-9._]+$/.test(normalizedUsername);

  const isDateValid = (() => {
    if (cleanDate.length !== 8) {
      return false;
    }

    const day = Number(cleanDate.slice(0, 2));
    const month = Number(cleanDate.slice(2, 4));
    const year = Number(cleanDate.slice(4, 8));

    if (
      day < 1 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    return day <= daysInMonth;
  })();

  const canContinue =
    displayName.trim().length >= 2 && isUsernameValid && isDateValid;

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

    const subscription = Keyboard.addListener(keyboardShowEvent, () => {
      if (focusedField === "city") {
        requestAnimationFrame(() => {
          scrollRef.current?.scrollToEnd({
            animated: true,
          });
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [focusedField]);

  const handleFieldFocus = (field: "name" | "username" | "dob" | "city") => {
    setFocusedField(field);

    if (__DEV__) {
      console.log(`[1Go Profile] Focused field: ${field}`);
    }

    if (field === "city") {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({
          animated: true,
        });
      }, 200);
    }
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) {
      return digits;
    }

    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const handleAddPhoto = () => {
    if (__DEV__) {
      console.log("[1Go Profile] Profile photo pressed.");
      console.log("[1Go Profile] Image picker will be connected here.");
    }
  };

  const handleUseLocation = () => {
    if (__DEV__) {
      console.log("[1Go Profile] Current location requested.");
      console.log(
        "[1Go Profile] Device-location integration will be connected here.",
      );
    }
  };

  const handleContinue = () => {
    if (!canContinue) {
      if (__DEV__) {
        console.log("[1Go Profile] Continue blocked.");
      }

      return;
    }

    Keyboard.dismiss();

    if (__DEV__) {
      console.log("[1Go Profile] Profile setup completed.");
      console.log("[1Go Profile] Display name:", displayName);
      console.log("[1Go Profile] Username:", normalizedUsername);
      console.log("[1Go Profile] DOB:", dateOfBirth);
      console.log("[1Go Profile] City:", city || "Not provided");
    }

    router.push("/onboarding/interests");
  };

  const getInputBorder = (field: "name" | "username" | "dob" | "city") => {
    if (focusedField === field) {
      return colors.primary;
    }

    return colors.inputBorder;
  };

  const getInputBackground = (field: "name" | "username" | "dob" | "city") => {
    if (focusedField === field) {
      return isDark ? "rgba(37,99,235,0.055)" : "rgba(37,99,235,0.035)";
    }

    return colors.inputBackground;
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 18}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* TOP BAR */}
            <View style={styles.topBar}>
              <Pressable
                onPress={() => router.back()}
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

            {/* CONTENT */}
            <View style={styles.content}>
              <Text
                style={[
                  styles.eyebrow,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                YOUR PROFILE
              </Text>

              <Text
                style={[
                  styles.title,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Let’s get to know you.
              </Text>

              <Text
                style={[
                  styles.description,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Set up your profile so people know who they’re talking to.
              </Text>

              {/* PROFILE PHOTO */}
              <View style={styles.photoSection}>
                <Pressable
                  onPress={handleAddPhoto}
                  hitSlop={8}
                  style={({ pressed }) => [
                    styles.photoButton,
                    {
                      opacity: pressed ? 0.75 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.profileAvatar,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={30}
                      color={colors.textSecondary}
                    />

                    <View
                      style={[
                        styles.cameraButton,
                        {
                          backgroundColor: colors.primary,
                          borderColor: colors.background,
                        },
                      ]}
                    >
                      <Ionicons name="camera" size={13} color="#FFFFFF" />
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.photoHint,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    Add a profile photo
                    {"  "}
                    <Text
                      style={{
                        color: colors.disabledText,
                      }}
                    >
                      Optional
                    </Text>
                  </Text>
                </Pressable>
              </View>

              {/* FORM */}
              <View style={styles.form}>
                {/* DISPLAY NAME */}
                <View style={styles.formGroup}>
                  <Text
                    style={[
                      styles.fieldLabel,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Display name
                  </Text>

                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: getInputBackground("name"),
                        borderColor: getInputBorder("name"),
                      },
                    ]}
                  >
                    <TextInput
                      value={displayName}
                      onChangeText={setDisplayName}
                      onFocus={() => handleFieldFocus("name")}
                      onBlur={handleFieldBlur}
                      placeholder="Your name"
                      placeholderTextColor={colors.disabledText}
                      autoCapitalize="words"
                      autoCorrect={false}
                      maxLength={40}
                      selectionColor={colors.primary}
                      style={[
                        styles.input,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    />

                    {displayName.length > 0 && (
                      <Pressable
                        onPress={() => setDisplayName("")}
                        hitSlop={8}
                        style={[
                          styles.clearButton,
                          {
                            backgroundColor: colors.disabledBackground,
                          },
                        ]}
                      >
                        <Ionicons
                          name="close"
                          size={15}
                          color={colors.textSecondary}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>

                {/* USERNAME */}
                <View style={styles.formGroup}>
                  <Text
                    style={[
                      styles.fieldLabel,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Username
                  </Text>

                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: getInputBackground("username"),
                        borderColor: getInputBorder("username"),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.atSymbol,
                        {
                          color:
                            focusedField === "username"
                              ? colors.primary
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      @
                    </Text>

                    <TextInput
                      value={username}
                      onChangeText={(value) => {
                        const cleaned = value
                          .toLowerCase()
                          .replace(/[^a-z0-9._]/g, "")
                          .slice(0, 24);

                        setUsername(cleaned);
                      }}
                      onFocus={() => handleFieldFocus("username")}
                      onBlur={handleFieldBlur}
                      placeholder="username"
                      placeholderTextColor={colors.disabledText}
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={24}
                      selectionColor={colors.primary}
                      style={[
                        styles.input,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    />

                    {isUsernameValid && (
                      <View
                        style={[
                          styles.check,
                          {
                            backgroundColor: isDark
                              ? "rgba(37,99,235,0.16)"
                              : "rgba(37,99,235,0.10)",
                          },
                        ]}
                      >
                        <Ionicons
                          name="checkmark"
                          size={15}
                          color={colors.primary}
                        />
                      </View>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.helper,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    3–24 characters using letters, numbers, periods or
                    underscores.
                  </Text>
                </View>

                {/* DATE OF BIRTH */}
                <View style={styles.formGroup}>
                  <Text
                    style={[
                      styles.fieldLabel,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    Date of birth
                  </Text>

                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: getInputBackground("dob"),
                        borderColor: getInputBorder("dob"),
                      },
                    ]}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={
                        focusedField === "dob"
                          ? colors.primary
                          : colors.textSecondary
                      }
                    />

                    <TextInput
                      value={dateOfBirth}
                      onChangeText={(value) =>
                        setDateOfBirth(formatDate(value))
                      }
                      onFocus={() => handleFieldFocus("dob")}
                      onBlur={handleFieldBlur}
                      placeholder="DD / MM / YYYY"
                      placeholderTextColor={colors.disabledText}
                      keyboardType="number-pad"
                      maxLength={10}
                      selectionColor={colors.primary}
                      style={[
                        styles.input,
                        styles.dateInput,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
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
                    Your date of birth won’t be displayed publicly.
                  </Text>
                </View>

                {/* CITY */}
                <View style={styles.formGroup}>
                  <View style={styles.labelRow}>
                    <Text
                      style={[
                        styles.fieldLabel,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      City
                    </Text>

                    <Text
                      style={[
                        styles.optionalLabel,
                        {
                          color: colors.disabledText,
                        },
                      ]}
                    >
                      Optional
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: getInputBackground("city"),
                        borderColor: getInputBorder("city"),
                      },
                    ]}
                  >
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color={
                        focusedField === "city"
                          ? colors.primary
                          : colors.textSecondary
                      }
                    />

                    <TextInput
                      value={city}
                      onChangeText={setCity}
                      onFocus={() => handleFieldFocus("city")}
                      onBlur={handleFieldBlur}
                      placeholder="Your city"
                      placeholderTextColor={colors.disabledText}
                      autoCapitalize="words"
                      autoCorrect={false}
                      maxLength={60}
                      selectionColor={colors.primary}
                      style={[
                        styles.input,
                        styles.cityInput,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    />

                    <Pressable
                      onPress={handleUseLocation}
                      hitSlop={8}
                      style={[
                        styles.locationButton,
                        {
                          backgroundColor: isDark
                            ? "rgba(37,99,235,0.12)"
                            : "rgba(37,99,235,0.08)",
                        },
                      ]}
                    >
                      <Ionicons
                        name="navigate-outline"
                        size={17}
                        color={colors.primary}
                      />
                    </Pressable>
                  </View>

                  <Text
                    style={[
                      styles.helper,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    Use your current location to fill this automatically.
                  </Text>
                </View>
              </View>
            </View>

            {/* FOOTER */}
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

  /* TOP BAR */

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

  /* CONTENT */

  content: {
    paddingTop: 27,
    paddingBottom: 20,
  },

  eyebrow: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.8,
  },

  title: {
    marginTop: 10,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -1.2,
  },

  description: {
    marginTop: 9,
    maxWidth: 345,
    fontSize: 14.5,
    lineHeight: 21,
  },

  /* PROFILE PHOTO */

  photoSection: {
    marginTop: 20,
    alignItems: "center",
  },

  photoButton: {
    alignItems: "center",
  },

  profileAvatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  photoHint: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "600",
  },

  /* FORM */

  form: {
    marginTop: 23,
  },

  formGroup: {
    marginTop: 17,
  },

  fieldLabel: {
    marginBottom: 7,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    letterSpacing: 0,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionalLabel: {
    marginBottom: 7,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0,
  },

  inputWrapper: {
    height: 53,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 51,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0,
  },

  dateInput: {
    marginLeft: 10,
  },

  cityInput: {
    marginLeft: 10,
  },

  atSymbol: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: "600",
  },

  clearButton: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  locationButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  helper: {
    marginTop: 6,
    fontSize: 10.5,
    lineHeight: 15,
  },

  /* FOOTER */

  footer: {
    paddingTop: 2,
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
});
