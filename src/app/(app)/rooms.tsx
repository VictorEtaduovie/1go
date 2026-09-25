import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const iconImage = require("@/assets/images/icon.png");

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  /*
   * Same readable typography direction used on Messages.
   * Slightly scaled for different phone widths.
   */
  const scale = Math.min(width / 390, 1.08);
  const sidePadding = 17 * scale;

  const bottomNavigationHeight = 58 * scale;

  /*
   * Extra vertical room so the final Interests card can
   * scroll completely above the fixed bottom navigation.
   */
  const bottomScrollPadding =
    bottomNavigationHeight + insets.bottom + 18 * scale;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#020D1B" />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={[
            styles.mainScrollContent,
            {
              paddingHorizontal: sidePadding,
              paddingBottom: bottomScrollPadding,
            },
          ]}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          {/* =====================================================
              TOP BAR
          ====================================================== */}

          <View
            style={[
              styles.topBar,
              {
                paddingTop: 2 * scale,
              },
            ]}
          >
            <View style={styles.logoRow}>
              <Text
                style={[
                  styles.logoOne,
                  {
                    fontSize: 31 * scale,
                    lineHeight: 34 * scale,
                  },
                ]}
              >
                1
              </Text>

              <Text
                style={[
                  styles.logoGo,
                  {
                    fontSize: 29 * scale,
                    lineHeight: 33 * scale,
                  },
                ]}
              >
                Go
              </Text>
            </View>

            <Pressable
              style={[
                styles.settingsButton,
                {
                  width: 38 * scale,
                  height: 38 * scale,
                  borderRadius: 19 * scale,
                },
              ]}
            >
              <Ionicons
                name="settings-outline"
                size={27 * scale}
                color="#AAB8E3"
              />
            </Pressable>
          </View>

          {/* =====================================================
              PROFILE HERO
          ====================================================== */}

          <View
            style={[
              styles.profileHero,
              {
                marginTop: 12 * scale,
              },
            ]}
          >
            {/* AVATAR */}

            <View
              style={[
                styles.avatarOuter,
                {
                  width: 118 * scale,
                  height: 118 * scale,
                  borderRadius: 59 * scale,
                },
              ]}
            >
              <Image
                source={iconImage}
                style={[
                  styles.mainAvatar,
                  {
                    width: 110 * scale,
                    height: 110 * scale,
                    borderRadius: 55 * scale,
                  },
                ]}
              />

              <View
                style={[
                  styles.profileOnlineDot,
                  {
                    width: 28 * scale,
                    height: 28 * scale,
                    borderRadius: 14 * scale,
                    right: -1 * scale,
                    bottom: 3 * scale,
                  },
                ]}
              />
            </View>

            {/* PROFILE INFORMATION */}

            <View
              style={[
                styles.profileInfo,
                {
                  marginLeft: 17 * scale,
                  paddingTop: 8 * scale,
                },
              ]}
            >
              <View style={styles.nameRow}>
                <Text
                  style={[
                    styles.profileName,
                    {
                      fontSize: 27 * scale,
                      lineHeight: 31 * scale,
                    },
                  ]}
                >
                  Victor
                </Text>

                <View
                  style={[
                    styles.verifiedBadge,
                    {
                      width: 24 * scale,
                      height: 24 * scale,
                      borderRadius: 12 * scale,
                      marginLeft: 7 * scale,
                    },
                  ]}
                >
                  <Ionicons
                    name="checkmark"
                    size={15 * scale}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <Text
                style={[
                  styles.username,
                  {
                    fontSize: 15 * scale,
                    marginTop: 2 * scale,
                  },
                ]}
              >
                @victor1go
              </Text>

              <Text
                style={[
                  styles.bio,
                  {
                    fontSize: 15 * scale,
                    lineHeight: 20 * scale,
                    marginTop: 13 * scale,
                  },
                ]}
              >
                Good vibes. Great conversations.
                {"\n"}Always down for a new room. 🚀
              </Text>
            </View>
          </View>

          {/* =====================================================
              STATS
          ====================================================== */}

          <View
            style={[
              styles.statsRow,
              {
                marginTop: 17 * scale,
              },
            ]}
          >
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statNumber,
                  {
                    fontSize: 21 * scale,
                    lineHeight: 24 * scale,
                  },
                ]}
              >
                12
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  {
                    fontSize: 13 * scale,
                    marginTop: 2 * scale,
                  },
                ]}
              >
                Rooms Joined
              </Text>
            </View>

            <View
              style={[
                styles.statDivider,
                {
                  height: 48 * scale,
                },
              ]}
            />

            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statNumber,
                  {
                    fontSize: 21 * scale,
                    lineHeight: 24 * scale,
                  },
                ]}
              >
                5
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  {
                    fontSize: 13 * scale,
                    marginTop: 2 * scale,
                  },
                ]}
              >
                Followers
              </Text>
            </View>

            <View
              style={[
                styles.statDivider,
                {
                  height: 48 * scale,
                },
              ]}
            />

            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statNumber,
                  {
                    fontSize: 21 * scale,
                    lineHeight: 24 * scale,
                  },
                ]}
              >
                8
              </Text>

              <Text
                style={[
                  styles.statLabel,
                  {
                    fontSize: 13 * scale,
                    marginTop: 2 * scale,
                  },
                ]}
              >
                Following
              </Text>
            </View>
          </View>

          {/* =====================================================
              ACTION BUTTONS
          ====================================================== */}

          <View
            style={[
              styles.actionRow,
              {
                marginTop: 17 * scale,
              },
            ]}
          >
            <Pressable
              style={[
                styles.primaryButton,
                {
                  height: 45 * scale,
                  borderRadius: 22.5 * scale,
                },
              ]}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={21 * scale}
                color="#FFFFFF"
              />

              <Text
                style={[
                  styles.primaryButtonText,
                  {
                    fontSize: 14 * scale,
                    marginLeft: 9 * scale,
                  },
                ]}
              >
                Edit Profile
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.secondaryButton,
                {
                  height: 45 * scale,
                  borderRadius: 22.5 * scale,
                  marginLeft: 7 * scale,
                },
              ]}
            >
              <Ionicons
                name="share-social-outline"
                size={21 * scale}
                color="#A9B8E5"
              />

              <Text
                style={[
                  styles.secondaryButtonText,
                  {
                    fontSize: 14 * scale,
                    marginLeft: 9 * scale,
                  },
                ]}
              >
                Share Profile
              </Text>
            </Pressable>
          </View>

          {/* =====================================================
              TABS
          ====================================================== */}

          <View
            style={[
              styles.tabsContainer,
              {
                marginTop: 27 * scale,
              },
            ]}
          >
            <Pressable style={styles.tab}>
              <Text
                style={[
                  styles.tabTextActive,
                  {
                    fontSize: 16 * scale,
                  },
                ]}
              >
                Posts
              </Text>

              <View
                style={[
                  styles.activeTabIndicator,
                  {
                    height: 3 * scale,
                  },
                ]}
              />
            </Pressable>

            <Pressable style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  {
                    fontSize: 16 * scale,
                  },
                ]}
              >
                Rooms
              </Text>
            </Pressable>

            <Pressable style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  {
                    fontSize: 16 * scale,
                  },
                ]}
              >
                Groups
              </Text>
            </Pressable>
          </View>

          {/* =====================================================
              ABOUT ME CARD
          ====================================================== */}

          <View
            style={[
              styles.infoCard,
              {
                borderRadius: 16 * scale,
                marginTop: 15 * scale,
                padding: 16 * scale,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Ionicons name="person" size={23 * scale} color="#A88BFF" />

                <Text
                  style={[
                    styles.cardTitle,
                    {
                      fontSize: 17 * scale,
                      marginLeft: 11 * scale,
                    },
                  ]}
                >
                  About Me
                </Text>
              </View>

              <Pressable style={styles.editButton}>
                <Ionicons name="pencil" size={15 * scale} color="#8C53FF" />

                <Text
                  style={[
                    styles.editText,
                    {
                      fontSize: 13 * scale,
                      marginLeft: 4 * scale,
                    },
                  ]}
                >
                  Edit
                </Text>
              </Pressable>
            </View>

            <Text
              style={[
                styles.aboutText,
                {
                  fontSize: 15 * scale,
                  lineHeight: 20 * scale,
                  marginTop: 13 * scale,
                },
              ]}
            >
              Tech lover | Music enthusiast | Foodie | Dreamer
            </Text>
          </View>

          {/* =====================================================
              DETAILS CARD
          ====================================================== */}

          <View
            style={[
              styles.infoCard,
              {
                borderRadius: 16 * scale,
                marginTop: 15 * scale,
                paddingHorizontal: 16 * scale,
                paddingVertical: 15 * scale,
              },
            ]}
          >
            <View style={styles.cardHeaderLeft}>
              <Ionicons
                name="information-circle"
                size={23 * scale}
                color="#AAB9FF"
              />

              <Text
                style={[
                  styles.cardTitle,
                  {
                    fontSize: 17 * scale,
                    marginLeft: 11 * scale,
                  },
                ]}
              >
                Details
              </Text>
            </View>

            {/* PHONE */}

            <View
              style={[
                styles.detailRow,
                {
                  marginTop: 17 * scale,
                },
              ]}
            >
              <View style={styles.detailLeft}>
                <Ionicons name="call" size={21 * scale} color="#A7B5F5" />

                <Text
                  style={[
                    styles.detailLabel,
                    {
                      fontSize: 14.5 * scale,
                      marginLeft: 13 * scale,
                    },
                  ]}
                >
                  Phone Number
                </Text>
              </View>

              <Text
                style={[
                  styles.detailValue,
                  {
                    fontSize: 14 * scale,
                  },
                ]}
              >
                +234 812 345 6789
              </Text>
            </View>

            <View style={styles.detailDivider} />

            {/* LOCATION */}

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Ionicons name="location" size={22 * scale} color="#A7B5F5" />

                <Text
                  style={[
                    styles.detailLabel,
                    {
                      fontSize: 14.5 * scale,
                      marginLeft: 13 * scale,
                    },
                  ]}
                >
                  Location
                </Text>
              </View>

              <Text
                style={[
                  styles.detailValue,
                  {
                    fontSize: 14 * scale,
                  },
                ]}
              >
                Lagos, Nigeria
              </Text>
            </View>

            <View style={styles.detailDivider} />

            {/* JOINED */}

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Ionicons name="calendar" size={22 * scale} color="#A7B5F5" />

                <Text
                  style={[
                    styles.detailLabel,
                    {
                      fontSize: 14.5 * scale,
                      marginLeft: 13 * scale,
                    },
                  ]}
                >
                  Joined 1Go
                </Text>
              </View>

              <Text
                style={[
                  styles.detailValue,
                  {
                    fontSize: 14 * scale,
                  },
                ]}
              >
                Jun 2025
              </Text>
            </View>
          </View>

          {/* =====================================================
              INTERESTS CARD
          ====================================================== */}

          <View
            style={[
              styles.infoCard,
              {
                borderRadius: 16 * scale,
                marginTop: 15 * scale,
                padding: 16 * scale,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Ionicons name="pricetag" size={23 * scale} color="#AAB9FF" />

                <Text
                  style={[
                    styles.cardTitle,
                    {
                      fontSize: 17 * scale,
                      marginLeft: 11 * scale,
                    },
                  ]}
                >
                  Interests
                </Text>
              </View>

              <Pressable style={styles.editButton}>
                <Ionicons name="pencil" size={15 * scale} color="#8C53FF" />

                <Text
                  style={[
                    styles.editText,
                    {
                      fontSize: 13 * scale,
                      marginLeft: 4 * scale,
                    },
                  ]}
                >
                  Edit
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.interestsRow,
                {
                  marginTop: 15 * scale,
                },
              ]}
            >
              <InterestPill
                label="Music"
                background="#6533EC"
                border="#7F48FF"
                scale={scale}
              />

              <InterestPill
                label="Games"
                background="#174B95"
                border="#1977FF"
                scale={scale}
              />

              <InterestPill
                label="Movies"
                background="#10536B"
                border="#1594B4"
                scale={scale}
              />

              <InterestPill
                label="Tech"
                background="#6425C4"
                border="#8746F9"
                scale={scale}
              />

              <InterestPill
                label="Travel"
                background="#70209A"
                border="#D04AFF"
                scale={scale}
              />
            </View>
          </View>

          {/* Bottom breathing room */}

          <View
            style={{
              height: 10 * scale,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      {/* ========================================================
          FIXED BOTTOM NAVIGATION
      ====================================================== */}

      <SafeAreaView style={styles.bottomSafeArea} edges={["bottom"]}>
        <View
          style={[
            styles.bottomNavigation,
            {
              height: bottomNavigationHeight,
            },
          ]}
        >
          {/* HOME */}

          <Pressable style={styles.navItem}>
            <Ionicons name="home-outline" size={23 * scale} color="#98A4D0" />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Home
            </Text>
          </Pressable>

          {/* DISCOVER */}

          <Pressable style={styles.navItem}>
            <Ionicons
              name="compass-outline"
              size={24 * scale}
              color="#98A4D0"
            />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Discover
            </Text>
          </Pressable>

          {/* CREATE */}

          <Pressable
            style={[
              styles.createButton,
              {
                width: 45 * scale,
                height: 45 * scale,
                borderRadius: 23 * scale,
                marginTop: -24 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.createButtonInner,
                {
                  width: 44 * scale,
                  height: 44 * scale,
                  borderRadius: 22 * scale,
                },
              ]}
            >
              <Ionicons name="add" size={31 * scale} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* MESSAGES */}

          <Pressable style={styles.navItem}>
            <View style={styles.messageIconWrapper}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={23 * scale}
                color="#98A4D0"
              />

              <View
                style={[
                  styles.messageBadge,
                  {
                    minWidth: 18 * scale,
                    height: 18 * scale,
                    borderRadius: 9 * scale,
                    right: -8 * scale,
                    top: -6 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageBadgeText,
                    {
                      fontSize: 8.5 * scale,
                    },
                  ]}
                >
                  8
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Messages
            </Text>
          </Pressable>

          {/* PROFILE — ACTIVE */}

          <Pressable style={styles.navItem}>
            <Ionicons name="person" size={24 * scale} color="#9652FF" />

            <Text
              style={[
                styles.navLabelActive,
                {
                  fontSize: 11 * scale,
                },
              ]}
            >
              Profile
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* ==============================================================
   INTEREST PILL
============================================================== */

function InterestPill({
  label,
  background,
  border,
  scale,
}: {
  label: string;
  background: string;
  border: string;
  scale: number;
}) {
  return (
    <View
      style={[
        styles.interestPill,
        {
          backgroundColor: background,
          borderColor: border,
          height: 32 * scale,
          borderRadius: 17 * scale,
          paddingHorizontal: 14 * scale,
          marginRight: 7 * scale,
        },
      ]}
    >
      <Text
        style={[
          styles.interestText,
          {
            fontSize: 13 * scale,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

/* ==============================================================
   STYLES
============================================================== */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020D1B",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#020D1B",
  },

  mainScroll: {
    flex: 1,
  },

  mainScrollContent: {
    flexGrow: 1,
  },

  /* ===========================================================
     TOP BAR
  =========================================================== */

  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoOne: {
    fontWeight: "900",
    fontStyle: "italic",
    color: "#804CFF",
    letterSpacing: -3,
  },

  logoGo: {
    fontWeight: "900",
    color: "#F5F7FF",
    letterSpacing: -2,
    marginLeft: 1,
  },

  settingsButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  /* ===========================================================
     PROFILE HERO
  =========================================================== */

  profileHero: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatarOuter: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#853CFF",
    backgroundColor: "#15233E",
  },

  mainAvatar: {
    borderWidth: 1,
    borderColor: "#2F82FF",
    backgroundColor: "#18253F",
  },

  profileOnlineDot: {
    position: "absolute",
    backgroundColor: "#08E2A7",
    borderWidth: 3,
    borderColor: "#020D1B",
  },

  profileInfo: {
    flex: 1,
    minWidth: 0,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileName: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  verifiedBadge: {
    backgroundColor: "#7542F6",
    alignItems: "center",
    justifyContent: "center",
  },

  username: {
    color: "#A4B2D8",
    fontWeight: "500",
  },

  bio: {
    color: "#F0F2FA",
    fontWeight: "500",
  },

  /* ===========================================================
     STATS
  =========================================================== */

  statsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  statLabel: {
    color: "#B0BCDF",
    fontWeight: "500",
  },

  statDivider: {
    width: 1,
    backgroundColor: "#395083",
  },

  /* ===========================================================
     ACTION BUTTONS
  =========================================================== */

  actionRow: {
    flexDirection: "row",
    width: "100%",
  },

  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7036F3",
    borderWidth: 1,
    borderColor: "#8755FF",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  secondaryButton: {
    flex: 0.82,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B1C34",
    borderWidth: 1,
    borderColor: "#1D4772",
  },

  secondaryButtonText: {
    color: "#AAB9E7",
    fontWeight: "700",
  },

  /* ===========================================================
     TABS
  =========================================================== */

  tabsContainer: {
    width: "100%",
    height: 46,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#173559",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  tabText: {
    color: "#8798C5",
    fontWeight: "600",
  },

  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    backgroundColor: "#7342F4",
  },

  /* ===========================================================
     INFO CARDS
  =========================================================== */

  infoCard: {
    width: "100%",
    backgroundColor: "#071A31",
    borderWidth: 1,
    borderColor: "#153C68",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  editText: {
    color: "#8D55FF",
    fontWeight: "700",
  },

  aboutText: {
    color: "#AEBCE1",
    fontWeight: "500",
  },

  /* ===========================================================
     DETAILS
  =========================================================== */

  detailRow: {
    minHeight: 37,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  detailLabel: {
    color: "#AAB8DE",
    fontWeight: "500",
  },

  detailValue: {
    color: "#AAB8DE",
    fontWeight: "500",
    textAlign: "right",
  },

  detailDivider: {
    height: 1,
    backgroundColor: "#163B66",
    marginVertical: 5,
  },

  /* ===========================================================
     INTERESTS
  =========================================================== */

  interestsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  interestPill: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 4,
  },

  interestText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* ===========================================================
     BOTTOM NAV
  =========================================================== */

  bottomSafeArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#020D1B",
  },

  bottomNavigation: {
    borderTopWidth: 1,
    borderTopColor: "#182B45",
    backgroundColor: "#020D1B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  navItem: {
    minWidth: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    color: "#9CAAD0",
    fontWeight: "600",
    marginTop: 2,
  },

  navLabelActive: {
    color: "#9652FF",
    fontWeight: "700",
    marginTop: 2,
  },

  createButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  createButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7D42F6",
    borderWidth: 1,
    borderColor: "#A576FF",
    shadowColor: "#773BFF",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
  },

  messageIconWrapper: {
    position: "relative",
    alignItems: "center",
  },

  messageBadge: {
    position: "absolute",
    backgroundColor: "#F02D64",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#020D1B",
  },

  messageBadgeText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
