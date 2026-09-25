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

export default function CreateOrganizationScreen() {
  const colorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(18, Math.min(28, width * 0.06));

  const [organizationName, setOrganizationName] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categories = useMemo(
    () => [
      "Technology",
      "Business",
      "Education",
      "Entertainment",
      "Media",
      "Music",
      "Sports",
      "Health & Wellness",
      "Nonprofit",
      "Community",
      "Other",
    ],
    [],
  );

  const canCreate = organizationName.trim().length > 0 && category !== null;

  /* =========================
      ACTIONS
  ========================= */

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!canCreate) return;

    Keyboard.dismiss();

    // Connect this to the next organization setup step
    // when that route is created.
  };

  const handleCreate = () => {
    if (!canCreate) return;

    Keyboard.dismiss();

    // Connect this to your actual organization creation logic.
    router.back();
  };

  const handleLogoPress = () => {
    // Connect this to your image picker/storage flow.
  };

  const handleCategoryPress = () => {
    setShowCategoryMenu((current) => !current);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setShowCategoryMenu(false);
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
            Create Organization
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
              ORGANIZATION LOGO
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
              Organization logo
            </Text>

            <View style={styles.logoRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLogoPress}
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
                onPress={handleLogoPress}
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
              ORGANIZATION NAME
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
              Organization name
            </Text>

            <TextInput
              value={organizationName}
              onChangeText={setOrganizationName}
              placeholder="e.g. SmartTech"
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
              CATEGORY
          ========================= */}
          <View style={[styles.categorySection, styles.section]}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              Category
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
              <Text
                numberOfLines={1}
                style={[
                  styles.categoryText,
                  {
                    color: category ? colors.textPrimary : colors.textSecondary,
                  },
                ]}
              >
                {category || "Select category"}
              </Text>

              <Ionicons
                name={showCategoryMenu ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {/* =========================
                FLOATING CATEGORY MENU
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
                <ScrollView
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  style={styles.categoryMenuScroll}
                >
                  {categories.map((item, index) => {
                    const selected = category === item;

                    return (
                      <TouchableOpacity
                        key={item}
                        activeOpacity={0.75}
                        onPress={() => handleCategorySelect(item)}
                        style={[
                          styles.categoryOption,
                          {
                            borderBottomColor: colors.divider,
                            borderBottomWidth:
                              index === categories.length - 1 ? 0 : 1,
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
                          {item}
                        </Text>

                        {selected && (
                          <Ionicons
                            name="checkmark"
                            size={21}
                            color={colors.primary}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
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
              Description
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Tell people about your organization..."
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
              WEBSITE
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
              Website (optional)
            </Text>

            <TextInput
              value={website}
              onChangeText={setWebsite}
              placeholder="http://"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
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
              CREATE
          ========================= */}
          <TouchableOpacity
            activeOpacity={canCreate ? 0.85 : 1}
            disabled={!canCreate}
            onPress={handleCreate}
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
              Create
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
      LOGO
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
    minHeight: 118,
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
      CATEGORY
  ========================= */

  categorySection: {
    position: "relative",
    zIndex: 20,
    elevation: 20,
  },

  categorySelector: {
    minHeight: 58,
    borderRadius: 15,
    borderWidth: 1.5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    paddingRight: 10,
  },

  categoryMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 88,
    maxHeight: 285,
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

  categoryMenuScroll: {
    maxHeight: 283,
  },

  categoryOption: {
    minHeight: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryOptionText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },

  /* =========================
      CREATE
  ========================= */

  createButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  createButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
});
