import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const iconImage = require("@/assets/images/icon.png");

const rooms = [
  {
    title: "Late Night Vibes 🌙",
    people: "246",
    tags: "Music • Chill • Friends • Advice",
    extra: "+241",
    background:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Life in Your 20s",
    people: "182",
    tags: "Lifestyle • Growth • Advice",
    extra: "+178",
    background:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Gaming Zone 🎮",
    people: "138",
    tags: "Games • Talk • Community",
    extra: "+134",
    background:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Island Vibes 🌴",
    people: "42",
    tags: "Good Vibes • Fun • Chill",
    extra: "+38",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Music Vibes 🎵",
    people: "64",
    tags: "Music • Chill • Good Energy",
    extra: "+60",
    background:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
  },
];

const recommended = [
  {
    title: "Tech & Innovation",
    people: "96",
    background:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Real Talk Only",
    people: "128",
    background:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Chill & Relax",
    people: "74",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Sports Talk",
    people: "52",
    background:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=85",
  },
];

function SmallAvatar({
  index,
  avatarSize,
}: {
  index: number;
  avatarSize: number;
}) {
  return (
    <Image
      source={iconImage}
      style={[
        styles.smallAvatar,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          marginLeft: index === 0 ? 0 : -6,
        },
      ]}
    />
  );
}

function RoomCard({
  title,
  people,
  tags,
  extra,
  background,
  scale,
}: {
  title: string;
  people: string;
  tags: string;
  extra: string;
  background: string;
  scale: number;
}) {
  /*
   * Slightly larger avatar so the fourth row remains clearly visible.
   */
  const avatarSize = 20 * scale;

  return (
    <Pressable
      style={[
        styles.roomCard,
        {
          /*
           * Increased from 72 so the four rows have enough
           * breathing room with readable production text.
           */
          height: 86 * scale,
          borderRadius: 11 * scale,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: background }}
        style={styles.roomBackground}
        imageStyle={[
          styles.roomBackgroundImage,
          {
            borderRadius: 11 * scale,
          },
        ]}
      >
        <View style={styles.fullOverlay} />
        <View style={styles.leftOverlay} />

        {/* =================================================
            FOUR ROWS
            1. Live
            2. Room title
            3. People + topics
            4. Avatars + extra count
        ================================================== */}

        <View
          style={[
            styles.roomContent,
            {
              paddingHorizontal: 11 * scale,
              paddingTop: 7 * scale,
              paddingBottom: 6 * scale,
              paddingRight: 48 * scale,
            },
          ]}
        >
          {/* ROW 1 — LIVE */}

          <View
            style={[
              styles.liveBadge,
              {
                height: 18 * scale,
                paddingHorizontal: 7 * scale,
                borderRadius: 9 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.liveDot,
                {
                  width: 5 * scale,
                  height: 5 * scale,
                  borderRadius: 2.5 * scale,
                  marginRight: 4 * scale,
                },
              ]}
            />

            <Text
              style={[
                styles.liveText,
                {
                  fontSize: 9 * scale,
                },
              ]}
            >
              Live
            </Text>
          </View>

          {/* ROW 2 — ROOM TITLE */}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.roomTitle,
              {
                fontSize: 13 * scale,
                lineHeight: 16 * scale,
              },
            ]}
          >
            {title}
          </Text>

          {/* ROW 3 — PEOPLE + TOPICS */}

          <View style={styles.roomMeta}>
            <Ionicons name="people" size={11 * scale} color="#F4F6FF" />

            <Text
              style={[
                styles.roomMetaText,
                {
                  fontSize: 10 * scale,
                  marginLeft: 4 * scale,
                },
              ]}
            >
              {people}
            </Text>

            <Text
              style={[
                styles.roomSeparator,
                {
                  fontSize: 9 * scale,
                  marginHorizontal: 5 * scale,
                },
              ]}
            >
              •
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.roomTags,
                {
                  fontSize: 9.5 * scale,
                },
              ]}
            >
              {tags}
            </Text>
          </View>

          {/* ROW 4 — AVATARS + EXTRA */}

          <View style={styles.roomBottom}>
            <View style={styles.avatarStack}>
              {[0, 1, 2, 3].map((item) => (
                <SmallAvatar key={item} index={item} avatarSize={avatarSize} />
              ))}

              <View
                style={[
                  styles.extraPeople,
                  {
                    height: avatarSize,
                    minWidth: 42 * scale,
                    borderRadius: avatarSize / 2,
                    paddingHorizontal: 7 * scale,
                    marginLeft: 2 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.extraPeopleText,
                    {
                      fontSize: 9 * scale,
                    },
                  ]}
                >
                  {extra}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ARROW */}

        <View
          style={[
            styles.roomArrow,
            {
              width: 32 * scale,
              height: 32 * scale,
              borderRadius: 16 * scale,
              right: 8 * scale,
              marginTop: -16 * scale,
            },
          ]}
        >
          <Ionicons name="chevron-forward" size={17 * scale} color="#FFFFFF" />
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function RecommendedCard({
  title,
  people,
  background,
  scale,
}: {
  title: string;
  people: string;
  background: string;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.recommendedCard,
        {
          height: 82 * scale,
          borderRadius: 10 * scale,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: background }}
        style={styles.recommendedBackground}
        imageStyle={[
          styles.recommendedBackgroundImage,
          {
            borderRadius: 10 * scale,
          },
        ]}
      >
        <View style={styles.recommendedOverlay} />

        {/* BOTTOM CONTENT */}

        <View
          style={[
            styles.recommendedContent,
            {
              paddingHorizontal: 8 * scale,
              paddingBottom: 7 * scale,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.recommendedTitle,
              {
                fontSize: 10.5 * scale,
                lineHeight: 13 * scale,
                marginBottom: 4 * scale,
              },
            ]}
          >
            {title}
          </Text>

          <View style={styles.recommendedMeta}>
            <Ionicons name="people" size={10 * scale} color="#FFFFFF" />

            <Text
              style={[
                styles.recommendedPeople,
                {
                  fontSize: 9 * scale,
                  marginLeft: 4 * scale,
                },
              ]}
            >
              {people}
            </Text>

            <View
              style={[
                styles.recommendedLiveDot,
                {
                  width: 6 * scale,
                  height: 6 * scale,
                  borderRadius: 3 * scale,
                  marginLeft: 7 * scale,
                  marginRight: 4 * scale,
                },
              ]}
            />

            <Text
              style={[
                styles.recommendedLive,
                {
                  fontSize: 9 * scale,
                },
              ]}
            >
              Live
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const scale = Math.min(width / 384, 1.08);
  const sidePadding = 17 * scale;

  /*
   * Exact vertical scroll space requested.
   * This allows the final Recommendation cards to move
   * above the fixed bottom navigation without creating
   * a large empty area.
   */
  const bottomScrollSpace = 60 * scale;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#020D1B" />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* =====================================================
            MAIN VERTICAL PAGE SCROLL
        ====================================================== */}

        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={[
            styles.mainScrollContent,
            {
              paddingHorizontal: sidePadding,
              paddingBottom: bottomScrollSpace,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          alwaysBounceVertical
        >
          {/* =====================================================
              HEADER
          ====================================================== */}

          <View
            style={[
              styles.header,
              {
                marginTop: 1 * scale,
                marginBottom: 14 * scale,
              },
            ]}
          >
            <View style={styles.headerTop}>
              <View>
                {/* LOGO */}

                <View
                  style={[
                    styles.logoRow,
                    {
                      height: 33 * scale,
                      marginBottom: 2 * scale,
                    },
                  ]}
                >
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

                {/* GREETING */}

                <Text
                  style={[
                    styles.goodMorning,
                    {
                      fontSize: 14.5 * scale,
                      lineHeight: 18 * scale,
                    },
                  ]}
                >
                  Good morning,
                </Text>

                <Text
                  style={[
                    styles.userName,
                    {
                      fontSize: 22 * scale,
                      lineHeight: 26 * scale,
                    },
                  ]}
                >
                  Victor <Text style={styles.wave}>👋</Text>
                </Text>

                <Text
                  style={[
                    styles.subtitle,
                    {
                      fontSize: 12.5 * scale,
                      lineHeight: 16 * scale,
                      marginTop: 4 * scale,
                    },
                  ]}
                >
                  Great conversations, real people,
                  {"\n"}and amazing rooms.
                </Text>
              </View>

              {/* HEADER ACTIONS */}

              <View
                style={[
                  styles.headerActions,
                  {
                    marginTop: 2 * scale,
                  },
                ]}
              >
                <Pressable
                  style={[
                    styles.notificationButton,
                    {
                      width: 28 * scale,
                      height: 34 * scale,
                      marginRight: 11 * scale,
                    },
                  ]}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={23 * scale}
                    color="#FFFFFF"
                  />

                  <View
                    style={[
                      styles.notificationDot,
                      {
                        width: 8 * scale,
                        height: 8 * scale,
                        borderRadius: 4 * scale,
                        right: 1 * scale,
                        top: 1 * scale,
                      },
                    ]}
                  />
                </Pressable>

                <Pressable style={styles.profileWrapper}>
                  <Image
                    source={iconImage}
                    style={[
                      styles.profileImage,
                      {
                        width: 35 * scale,
                        height: 35 * scale,
                        borderRadius: 18 * scale,
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.onlineDot,
                      {
                        width: 9 * scale,
                        height: 9 * scale,
                        borderRadius: 5 * scale,
                        right: -1 * scale,
                        bottom: 0,
                      },
                    ]}
                  />
                </Pressable>
              </View>
            </View>

            {/* SEARCH */}

            <Pressable
              style={[
                styles.searchBar,
                {
                  height: 42 * scale,
                  borderRadius: 14 * scale,
                  marginTop: 12 * scale,
                  paddingHorizontal: 13 * scale,
                },
              ]}
            >
              <Ionicons name="search" size={22 * scale} color="#AEBEFF" />

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.searchPlaceholder,
                  {
                    fontSize: 13.5 * scale,
                    marginLeft: 11 * scale,
                  },
                ]}
              >
                Search rooms, topics or people...
              </Text>
            </Pressable>
          </View>

          {/* =====================================================
              YOUR ROOMS
          ====================================================== */}

          <View
            style={[
              styles.sectionHeader,
              {
                marginBottom: 9 * scale,
              },
            ]}
          >
            <View style={styles.sectionTitleWrap}>
              <Ionicons name="people" size={20 * scale} color="#8F52FF" />

              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontSize: 16 * scale,
                    marginLeft: 8 * scale,
                  },
                ]}
              >
                Your Rooms
              </Text>
            </View>

            <Pressable style={styles.roomsCountButton}>
              <Text
                style={[
                  styles.roomsCount,
                  {
                    fontSize: 10 * scale,
                  },
                ]}
              >
                5 rooms
              </Text>

              <Ionicons
                name="chevron-forward"
                size={15 * scale}
                color="#8B65FF"
              />
            </Pressable>
          </View>

          {/* ROOM LIST */}

          <View style={styles.roomsContainer}>
            {rooms.map((room, index) => (
              <View
                key={room.title}
                style={{
                  marginBottom: index === rooms.length - 1 ? 0 : 7 * scale,
                }}
              >
                <RoomCard
                  title={room.title}
                  people={room.people}
                  tags={room.tags}
                  extra={room.extra}
                  background={room.background}
                  scale={scale}
                />
              </View>
            ))}
          </View>

          {/* =====================================================
              RECOMMENDED HEADER
          ====================================================== */}

          <View
            style={[
              styles.recommendedHeader,
              {
                marginTop: 18 * scale,
                marginBottom: 8 * scale,
              },
            ]}
          >
            <Text
              style={[
                styles.recommendedSectionTitle,
                {
                  fontSize: 16 * scale,
                },
              ]}
            >
              Recommended for you
            </Text>

            <Pressable style={styles.seeAllButton}>
              <Text
                style={[
                  styles.seeAll,
                  {
                    fontSize: 10 * scale,
                  },
                ]}
              >
                See all
              </Text>

              <Ionicons
                name="chevron-forward"
                size={15 * scale}
                color="#9B60FF"
              />
            </Pressable>
          </View>

          {/* =====================================================
              HORIZONTAL RECOMMENDED CARDS
          ====================================================== */}

          <View style={styles.recommendedListWrapper}>
            <FlatList
              data={recommended}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={false}
              bounces
              alwaysBounceHorizontal
              keyExtractor={(item) => item.title}
              style={styles.recommendedList}
              contentContainerStyle={{
                paddingRight: 18 * scale,
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: 98 * scale,
                    marginRight: 7 * scale,
                  }}
                >
                  <RecommendedCard
                    title={item.title}
                    people={item.people}
                    background={item.background}
                    scale={scale}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* =====================================================
          FIXED BOTTOM NAVIGATION
      ====================================================== */}

      <SafeAreaView style={styles.bottomSafeArea} edges={["bottom"]}>
        <View
          style={[
            styles.bottomNavigation,
            {
              height: 54 * scale,
            },
          ]}
        >
          {/* HOME */}

          <Pressable style={styles.navItem}>
            <Ionicons name="home" size={22 * scale} color="#924CFF" />

            <Text
              style={[
                styles.navLabelActive,
                {
                  fontSize: 10 * scale,
                  marginTop: 2 * scale,
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
              size={23 * scale}
              color="#98A4D0"
            />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 10 * scale,
                  marginTop: 2 * scale,
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
                width: 40 * scale,
                height: 40 * scale,
                borderRadius: 20 * scale,
                marginTop: -22 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.createButtonInner,
                {
                  width: 39 * scale,
                  height: 39 * scale,
                  borderRadius: 20 * scale,
                },
              ]}
            >
              <Ionicons name="add" size={28 * scale} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* MESSAGES */}

          <Pressable style={styles.navItem}>
            <View style={styles.messageIconWrapper}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={22 * scale}
                color="#98A4D0"
              />

              <View
                style={[
                  styles.messageBadge,
                  {
                    minWidth: 14 * scale,
                    height: 14 * scale,
                    borderRadius: 7 * scale,
                    right: -6 * scale,
                    top: -4 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageBadgeText,
                    {
                      fontSize: 7 * scale,
                    },
                  ]}
                >
                  3
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 10 * scale,
                  marginTop: 2 * scale,
                },
              ]}
            >
              Messages
            </Text>
          </Pressable>

          {/* PROFILE */}

          <Pressable style={styles.navItem}>
            <Ionicons name="person-outline" size={23 * scale} color="#98A4D0" />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 10 * scale,
                  marginTop: 2 * scale,
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

const styles = StyleSheet.create({
  /* ===========================================================
     ROOT
  =========================================================== */

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
     HEADER
  =========================================================== */

  header: {
    width: "100%",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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

  goodMorning: {
    color: "#F0F3FA",
    fontWeight: "500",
  },

  userName: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  wave: {
    fontSize: 19,
  },

  subtitle: {
    color: "#9DA9CA",
    fontWeight: "500",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  notificationDot: {
    position: "absolute",
    backgroundColor: "#F12559",
    borderWidth: 1,
    borderColor: "#020D1B",
  },

  profileWrapper: {
    position: "relative",
  },

  profileImage: {
    borderWidth: 1,
    borderColor: "#7864FF",
    backgroundColor: "#18233B",
  },

  onlineDot: {
    position: "absolute",
    backgroundColor: "#00E0A5",
    borderWidth: 1.5,
    borderColor: "#020D1B",
  },

  /* ===========================================================
     SEARCH
  =========================================================== */

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3B4A9A",
    backgroundColor: "#07172D",
  },

  searchPlaceholder: {
    flex: 1,
    color: "#A7B2D4",
    fontWeight: "500",
  },

  /* ===========================================================
     YOUR ROOMS
  =========================================================== */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#F7F8FF",
    fontWeight: "800",
  },

  roomsCountButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  roomsCount: {
    color: "#9EABD2",
    fontWeight: "600",
    marginRight: 2,
  },

  /* ===========================================================
     ROOM CARDS
  =========================================================== */

  roomsContainer: {
    width: "100%",
  },

  roomCard: {
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#42309D",
    backgroundColor: "#101B32",
  },

  roomBackground: {
    flex: 1,
  },

  roomBackgroundImage: {
    width: "100%",
    height: "100%",
  },

  fullOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 16, 0.34)",
  },

  leftOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "68%",
    backgroundColor: "rgba(1, 7, 19, 0.76)",
  },

  roomContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  liveBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 220, 168, 0.90)",
  },

  liveDot: {
    backgroundColor: "#FFFFFF",
  },

  liveText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  roomTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  roomMeta: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  roomMetaText: {
    color: "#F7F7FF",
    fontWeight: "600",
  },

  roomSeparator: {
    color: "#BCC6E1",
  },

  roomTags: {
    color: "#CBD2E7",
    fontWeight: "500",
    flex: 1,
  },

  roomBottom: {
    position: "relative",
  },

  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallAvatar: {
    borderWidth: 1.5,
    borderColor: "#08162A",
    backgroundColor: "#202A45",
  },

  extraPeople: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 54, 100, 0.90)",
  },

  extraPeopleText: {
    color: "#E5E9F9",
    fontWeight: "700",
  },

  roomArrow: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(16, 53, 94, 0.88)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ===========================================================
     RECOMMENDED HEADER
  =========================================================== */

  recommendedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  recommendedSectionTitle: {
    color: "#F8F9FF",
    fontWeight: "800",
  },

  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  seeAll: {
    color: "#9B67FF",
    fontWeight: "700",
  },

  /* ===========================================================
     RECOMMENDED CARDS
  =========================================================== */

  recommendedListWrapper: {
    width: "100%",
  },

  recommendedList: {
    width: "100%",
    flexGrow: 0,
    overflow: "visible",
  },

  recommendedCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#34477A",
    backgroundColor: "#111B32",
  },

  recommendedBackground: {
    flex: 1,
  },

  recommendedBackgroundImage: {
    width: "100%",
    height: "100%",
  },

  recommendedOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 4, 17, 0.48)",
  },

  recommendedContent: {
    flex: 1,
    justifyContent: "flex-end",
  },

  recommendedTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  recommendedMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  recommendedPeople: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  recommendedLiveDot: {
    backgroundColor: "#00E2A6",
  },

  recommendedLive: {
    color: "#00E2A6",
    fontWeight: "700",
  },

  /* ===========================================================
     BOTTOM NAVIGATION
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
    borderTopColor: "#18263E",
    backgroundColor: "#020D1B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 7,
  },

  navItem: {
    minWidth: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabelActive: {
    color: "#9754FF",
    fontWeight: "700",
  },

  navLabel: {
    color: "#9BA7CC",
    fontWeight: "600",
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
    elevation: 7,
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
