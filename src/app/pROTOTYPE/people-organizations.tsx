import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { themes } from "@/theme/colors";

const electricAzure = themes.electricAzure;

type Tab = "people" | "organizations";

type Recommendation = {
  id: string;
  name: string;
  username: string;
  type: "person" | "organization";
  verified?: boolean;
};

const peopleRecommendations: Recommendation[] = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    username: "@sarah",
    type: "person",
  },
  {
    id: "daniel",
    name: "Daniel Ade",
    username: "@danielade",
    type: "person",
  },
  {
    id: "lisa",
    name: "Lisa Carter",
    username: "@lisacarter",
    type: "person",
  },
];

const organizationRecommendations: Recommendation[] = [
  {
    id: "techworld",
    name: "TechWorld",
    username: "@techworld",
    type: "organization",
    verified: true,
  },
  {
    id: "music-vibes",
    name: "Music Vibes",
    username: "@musicvibes",
    type: "organization",
    verified: true,
  },
  {
    id: "smarttech",
    name: "SmartTech",
    username: "@smarttech",
    type: "organization",
    verified: true,
  },
];

export default function PeopleOrganizationsScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const [activeTab, setActiveTab] = useState<Tab>("people");
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(22, Math.min(30, width * 0.075));

  const recommendations = useMemo(() => {
    return activeTab === "people"
      ? peopleRecommendations
      : organizationRecommendations;
  }, [activeTab]);

  const toggleFollow = (id: string) => {
    setFollowedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleContinue = () => {
    /*
      The next onboarding route has intentionally not been invented here.

      Wire this button to the next screen once that screen is provided.
    */
  };

  const handleSkip = () => {
    /*
      The next onboarding route has intentionally not been invented here.

      Wire this button to the next screen once that screen is provided.
    */
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
      <View style={styles.container}>
        {/* =========================
            HEADER
        ========================= */}
        <View
          style={[
            styles.header,
            {
              paddingHorizontal: horizontalPadding,
              paddingTop: isVerySmallScreen ? 8 : 14,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: colors.textPrimary,
                fontSize: isVerySmallScreen ? 27 : isSmallScreen ? 29 : 31,
              },
            ]}
          >
            People and organizations
            {"\n"}
            you might like
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
                marginTop: isVerySmallScreen ? 6 : 8,
              },
            ]}
          >
            Follow them to see their posts and updates.
          </Text>
        </View>

        {/* =========================
            TABS
        ========================= */}
        <View
          style={[
            styles.tabContainer,
            {
              marginHorizontal: horizontalPadding,
              marginTop: isVerySmallScreen ? 18 : 23,
              backgroundColor:
                colorScheme === "dark"
                  ? colors.surface
                  : colors.disabledBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{
              selected: activeTab === "people",
            }}
            accessibilityLabel="People"
            onPress={() => setActiveTab("people")}
            style={[
              styles.tab,
              activeTab === "people" && [
                styles.activeTab,
                {
                  backgroundColor: colors.surface,
                },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "people"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              People
            </Text>

            {activeTab === "people" && (
              <View
                style={[
                  styles.activeTabIndicator,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityState={{
              selected: activeTab === "organizations",
            }}
            accessibilityLabel="Organizations"
            onPress={() => setActiveTab("organizations")}
            style={[
              styles.tab,
              activeTab === "organizations" && [
                styles.activeTab,
                {
                  backgroundColor: colors.surface,
                },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "organizations"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              Organizations
            </Text>

            {activeTab === "organizations" && (
              <View
                style={[
                  styles.activeTabIndicator,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </Pressable>
        </View>

        {/* =========================
            RECOMMENDATIONS
        ========================= */}
        <ScrollView
          style={styles.listScrollView}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingTop: isVerySmallScreen ? 14 : 18,
              paddingBottom: 20,
            },
          ]}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          {recommendations.map((item) => {
            const isFollowed = followedIds.includes(item.id);

            return (
              <View key={item.id} style={styles.recommendationRow}>
                {/* AVATAR */}
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor:
                        item.type === "organization"
                          ? colors.surface
                          : colorScheme === "dark"
                            ? colors.surface
                            : "#EEF2F7",
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {item.type === "organization" ? (
                    <Image
                      source={require("@/assets/images/icon.png")}
                      style={styles.organizationImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons
                      name="person"
                      size={27}
                      color={colors.textSecondary}
                    />
                  )}
                </View>

                {/* IDENTITY */}
                <View style={styles.identity}>
                  <View style={styles.nameRow}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.name,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>

                    {item.verified && (
                      <Ionicons
                        name="checkmark-circle"
                        size={17}
                        color={colors.primary}
                        style={styles.verifiedIcon}
                      />
                    )}
                  </View>

                  <Text
                    numberOfLines={1}
                    style={[
                      styles.username,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {item.username}
                  </Text>
                </View>

                {/* FOLLOW */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    isFollowed ? `Unfollow ${item.name}` : `Follow ${item.name}`
                  }
                  accessibilityState={{
                    selected: isFollowed,
                  }}
                  onPress={() => toggleFollow(item.id)}
                  style={({ pressed }) => [
                    styles.followButton,
                    {
                      backgroundColor: isFollowed
                        ? colors.surface
                        : pressed
                          ? colors.primaryPressed
                          : colors.primary,
                      borderColor: isFollowed ? colors.primary : colors.primary,
                      opacity: pressed ? 0.94 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.followButtonText,
                      {
                        color: isFollowed ? colors.primary : "#FFFFFF",
                      },
                    ]}
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>

        {/* =========================
            BOTTOM ACTIONS
        ========================= */}
        <View
          style={[
            styles.bottomSection,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: isVerySmallScreen ? 8 : 12,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            onPress={handleContinue}
            style={({ pressed }) => [
              styles.continueButton,
              {
                backgroundColor: pressed
                  ? colors.primaryPressed
                  : colors.primary,
                opacity: pressed ? 0.94 : 1,
              },
            ]}
          >
            <Text style={styles.continueText}>Continue</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip"
            onPress={handleSkip}
            hitSlop={8}
            style={({ pressed }) => [
              styles.skipButton,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.skipText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Skip
            </Text>
          </Pressable>
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
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    width: "100%",
  },

  title: {
    fontWeight: "900",
    letterSpacing: -0.8,
    lineHeight: 37,
  },

  subtitle: {
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: "500",
  },

  /* =========================
      TABS
  ========================= */

  tabContainer: {
    minHeight: 55,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },

  tab: {
    flex: 1,
    minHeight: 55,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 8,
  },

  activeTab: {
    borderRadius: 15,
  },

  tabText: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "700",
  },

  activeTabIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
    borderRadius: 3,
  },

  /* =========================
      LIST
  ========================= */

  listScrollView: {
    flex: 1,
  },

  listContent: {
    flexGrow: 1,
  },

  recommendationRow: {
    minHeight: 77,
    flexDirection: "row",
    alignItems: "center",
  },

  /* =========================
      AVATAR
  ========================= */

  avatar: {
    width: 53,
    height: 53,
    borderRadius: 26.5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  organizationImage: {
    width: "100%",
    height: "100%",
    borderRadius: 26.5,
  },

  /* =========================
      IDENTITY
  ========================= */

  identity: {
    flex: 1,
    minWidth: 0,
    marginLeft: 13,
    marginRight: 10,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  name: {
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  verifiedIcon: {
    marginLeft: 5,
  },

  username: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },

  /* =========================
      FOLLOW
  ========================= */

  followButton: {
    minWidth: 98,
    height: 42,
    paddingHorizontal: 17,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  followButtonText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: "800",
  },

  /* =========================
      BOTTOM ACTIONS
  ========================= */

  bottomSection: {
    paddingTop: 10,
  },

  continueButton: {
    width: "100%",
    height: 59,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  skipButton: {
    minHeight: 38,
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  skipText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
});
