import React from "react";
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
import { router } from "expo-router";

import { themes } from "@/theme/colors";

const electricAzure = themes.electricAzure;

type Room = {
  id: string;
  name: string;
  description: string;
  people: number;
};

const rooms: Room[] = [
  {
    id: "late-night",
    name: "Late Night Conversations",
    description: "Just chatting about life, dreams and more",
    people: 142,
  },
  {
    id: "music-lovers",
    name: "Music Lovers Unite",
    description: "Share your favorite songs and artists",
    people: 7,
  },
  {
    id: "tech-innovation",
    name: "Tech & Innovation",
    description: "The future of technology",
    people: 64,
  },
  {
    id: "dating-relationships",
    name: "Dating & Relationships",
    description: "Real talk about love and relationships",
    people: 91,
  },
  {
    id: "gaming-zone",
    name: "Gaming Zone",
    description: "Let's talk games, strategies and more",
    people: 38,
  },
];

export default function RoomsHappeningNowScreen() {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 640;

  const horizontalPadding = Math.max(22, Math.min(30, width * 0.075));

  const liveColor = colorScheme === "dark" ? "#EF4444" : "#DC2626";

  const handleFinish = () => {
    router.replace("/(auth)/onboarding-complete");
  };

  const handleSkip = () => {
    router.replace("/(auth)/onboarding-complete");
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
              paddingTop: isVerySmallScreen ? 5 : 11,
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
              size={28}
              color={colors.textSecondary}
            />
          </Pressable>

          <Text
            style={[
              styles.title,
              {
                color: colors.textPrimary,
                fontSize: isVerySmallScreen ? 26 : isSmallScreen ? 28 : 30,
              },
            ]}
          >
            Rooms happening now
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Join a live conversation and meet new people.
          </Text>
        </View>

        {/* =========================
            ROOMS
        ========================= */}
        <ScrollView
          style={styles.roomScroll}
          contentContainerStyle={[
            styles.roomContent,
            {
              paddingHorizontal: horizontalPadding,
              paddingTop: isVerySmallScreen ? 18 : 22,
              paddingBottom: 20,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {rooms.map((room) => (
            <View key={room.id} style={styles.roomRow}>
              {/* =========================
                  ROOM IMAGE
              ========================= */}
              <View
                style={[
                  styles.roomImageWrapper,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={styles.roomImage}
                  resizeMode="cover"
                />
              </View>

              {/* =========================
                  ROOM INFORMATION
              ========================= */}
              <View style={styles.roomInfo}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.roomName,
                    {
                      color: colors.textPrimary,
                    },
                  ]}
                >
                  {room.name}
                </Text>

                <Text
                  numberOfLines={2}
                  style={[
                    styles.roomDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {room.description}
                </Text>

                <View style={styles.roomMeta}>
                  <View
                    style={[
                      styles.liveBadge,
                      {
                        backgroundColor: liveColor,
                      },
                    ]}
                  >
                    <View style={styles.liveDot} />

                    <Text style={styles.liveText}>LIVE</Text>
                  </View>

                  <View style={styles.peopleCount}>
                    <Ionicons
                      name="people-outline"
                      size={16}
                      color={colors.textSecondary}
                    />

                    <Text
                      style={[
                        styles.peopleText,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {room.people} {room.people === 1 ? "person" : "people"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* =========================
            BOTTOM ACTIONS
        ========================= */}
        <View
          style={[
            styles.bottomSection,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: isVerySmallScreen ? 7 : 12,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Finish onboarding"
            onPress={handleFinish}
            style={({ pressed }) => [
              styles.finishButton,
              {
                backgroundColor: pressed
                  ? colors.primaryPressed
                  : colors.primary,
                opacity: pressed ? 0.94 : 1,
              },
            ]}
          >
            <Text style={styles.finishText}>Finish</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip"
            onPress={handleSkip}
            style={({ pressed }) => [
              styles.skipButton,
              {
                opacity: pressed ? 0.55 : 1,
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

  backButton: {
    width: 42,
    height: 42,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 5,
  },

  title: {
    fontWeight: "900",
    lineHeight: 36,
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: "500",
  },

  /* =========================
      ROOM LIST
  ========================= */

  roomScroll: {
    flex: 1,
  },

  roomContent: {
    paddingBottom: 18,
  },

  roomRow: {
    width: "100%",
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  /* =========================
      ROOM IMAGE
  ========================= */

  roomImageWrapper: {
    width: 92,
    height: 92,
    borderRadius: 17,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  roomImage: {
    width: "100%",
    height: "100%",
  },

  /* =========================
      ROOM INFORMATION
  ========================= */

  roomInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 15,
  },

  roomName: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: "800",
  },

  roomDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },

  /* =========================
      ROOM META
  ========================= */

  roomMeta: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  liveBadge: {
    height: 25,
    paddingHorizontal: 9,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFFFFF",
    marginRight: 5,
  },

  liveText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  peopleCount: {
    marginLeft: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  peopleText: {
    marginLeft: 4,
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "500",
  },

  /* =========================
      BOTTOM ACTIONS
  ========================= */

  bottomSection: {
    paddingTop: 8,
  },

  finishButton: {
    width: "100%",
    height: 61,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },

  finishText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  skipButton: {
    height: 38,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  skipText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
});
