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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const iconImage = require("@/assets/images/icon.png");

/* ============================================================
   DATA
============================================================ */

const categories = [
  { label: "All", icon: "flame" as const },
  { label: "Trending", icon: "trending-up" as const },
  { label: "Music", icon: "musical-notes" as const },
  { label: "Sports", icon: "football" as const },
  { label: "Tech", icon: "laptop-outline" as const },
  { label: "Lifestyle", icon: "heart-outline" as const },
];

const trendingRooms = [
  {
    title: "Late Night Vibes",
    tags: "Music • Chill • Friends",
    people: "246",
    badge: "Trending",
    background:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Life in Your 20s",
    tags: "Lifestyle • Growth • Advice",
    people: "182",
    badge: "Hot Topic",
    background:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Gaming Zone",
    tags: "Games • Talk • Community",
    people: "138",
    badge: "Trending",
    background:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=85",
  },
];

const liveRooms = [
  {
    title: "Late Night Vibes 🌙",
    description: "Music, chill, real conversations",
    people: "246",
  },
  {
    title: "Real Talk Only 💬",
    description: "Life • Relationships • Advice",
    people: "128",
  },
  {
    title: "Tech & Innovation 💻",
    description: "Tech • AI • Startups • Future",
    people: "96",
  },
  {
    title: "Good Vibes Only ✨",
    description: "Positive minds • Great energy",
    people: "74",
  },
];

const nearbyRooms = [
  {
    title: "Lagos Talk",
    distance: "2.4 km",
    people: "64",
    background:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Island Vibes",
    distance: "3.1 km",
    people: "42",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Abuja Connect",
    distance: "5.2 km",
    people: "37",
    background:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Naija Music",
    distance: "7.8 km",
    people: "28",
    background:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=85",
  },
];

/* ============================================================
   CATEGORY CHIP
============================================================ */

function CategoryChip({
  label,
  icon,
  active,
  scale,
}: {
  label: string;
  icon:
    | "flame"
    | "trending-up"
    | "musical-notes"
    | "football"
    | "laptop-outline"
    | "heart-outline";
  active: boolean;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.categoryChip,
        {
          height: 31 * scale,
          borderRadius: 16 * scale,
          paddingHorizontal: 12 * scale,
          marginRight: 6 * scale,
        },
        active && styles.categoryChipActive,
      ]}
    >
      <Ionicons
        name={icon}
        size={14 * scale}
        color={active ? "#FFFFFF" : "#B6C2E1"}
      />

      <Text
        style={[
          styles.categoryText,
          {
            fontSize: 9.5 * scale,
            marginLeft: 6 * scale,
          },
          active && styles.categoryTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* ============================================================
   TRENDING ROOM CARD
============================================================ */

function TrendingRoomCard({
  title,
  tags,
  people,
  badge,
  background,
  scale,
}: {
  title: string;
  tags: string;
  people: string;
  badge: string;
  background: string;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.trendingCard,
        {
          width: 132 * scale,
          height: 104 * scale,
          borderRadius: 10 * scale,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: background }}
        style={styles.trendingBackground}
        imageStyle={[
          styles.trendingBackgroundImage,
          {
            borderRadius: 10 * scale,
          },
        ]}
      >
        <View style={styles.trendingOverlay} />

        <View
          style={[
            styles.trendingBadge,
            {
              top: 7 * scale,
              left: 7 * scale,
              height: 17 * scale,
              borderRadius: 9 * scale,
              paddingHorizontal: 7 * scale,
            },
          ]}
        >
          <Ionicons name="flame" size={8 * scale} color="#FFFFFF" />

          <Text
            style={[
              styles.trendingBadgeText,
              {
                fontSize: 7 * scale,
                marginLeft: 3 * scale,
              },
            ]}
          >
            {badge}
          </Text>
        </View>

        <View
          style={[
            styles.trendingContent,
            {
              paddingHorizontal: 9 * scale,
              paddingBottom: 8 * scale,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.trendingTitle,
              {
                fontSize: 10.5 * scale,
                lineHeight: 12 * scale,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            numberOfLines={1}
            style={[
              styles.trendingTags,
              {
                fontSize: 7.5 * scale,
                marginTop: 2 * scale,
              },
            ]}
          >
            {tags}
          </Text>

          <View
            style={[
              styles.trendingMeta,
              {
                marginTop: 6 * scale,
              },
            ]}
          >
            <Ionicons name="people" size={9 * scale} color="#FFFFFF" />

            <Text
              style={[
                styles.trendingPeople,
                {
                  fontSize: 7.5 * scale,
                  marginLeft: 3 * scale,
                },
              ]}
            >
              {people}
            </Text>

            <View
              style={[
                styles.greenDot,
                {
                  width: 5 * scale,
                  height: 5 * scale,
                  borderRadius: 3 * scale,
                  marginLeft: 7 * scale,
                  marginRight: 3 * scale,
                },
              ]}
            />

            <Text
              style={[
                styles.trendingLive,
                {
                  fontSize: 7.5 * scale,
                },
              ]}
            >
              Live
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.trendingArrow,
            {
              width: 25 * scale,
              height: 25 * scale,
              borderRadius: 13 * scale,
              right: 7 * scale,
              bottom: 8 * scale,
            },
          ]}
        >
          <Ionicons name="chevron-forward" size={13 * scale} color="#FFFFFF" />
        </View>
      </ImageBackground>
    </Pressable>
  );
}

/* ============================================================
   LIVE ROOM
============================================================ */

function LiveRoomCard({
  title,
  description,
  people,
  scale,
}: {
  title: string;
  description: string;
  people: string;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.liveRoomCard,
        {
          height: 50 * scale,
          borderRadius: 10 * scale,
          marginBottom: 5 * scale,
        },
      ]}
    >
      <Image
        source={iconImage}
        style={[
          styles.liveAvatar,
          {
            width: 38 * scale,
            height: 38 * scale,
            borderRadius: 19 * scale,
            marginLeft: 9 * scale,
          },
        ]}
      />

      <View
        style={[
          styles.liveRoomText,
          {
            marginLeft: 10 * scale,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.liveRoomTitle,
            {
              fontSize: 10.5 * scale,
              lineHeight: 12 * scale,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={[
            styles.liveRoomDescription,
            {
              fontSize: 7.5 * scale,
              lineHeight: 9 * scale,
              marginTop: 1 * scale,
            },
          ]}
        >
          {description}
        </Text>

        <View
          style={[
            styles.liveRoomMeta,
            {
              marginTop: 3 * scale,
            },
          ]}
        >
          <Ionicons name="people" size={8 * scale} color="#FFFFFF" />

          <Text
            style={[
              styles.liveRoomPeople,
              {
                fontSize: 7 * scale,
                marginLeft: 3 * scale,
              },
            ]}
          >
            {people}
          </Text>

          <View
            style={[
              styles.greenDot,
              {
                width: 5 * scale,
                height: 5 * scale,
                borderRadius: 3 * scale,
                marginLeft: 8 * scale,
                marginRight: 3 * scale,
              },
            ]}
          />

          <Text
            style={[
              styles.liveRoomLive,
              {
                fontSize: 7 * scale,
              },
            ]}
          >
            Live
          </Text>
        </View>
      </View>

      <Pressable
        style={[
          styles.joinButton,
          {
            width: 50 * scale,
            height: 25 * scale,
            borderRadius: 13 * scale,
            marginRight: 9 * scale,
          },
        ]}
      >
        <Text
          style={[
            styles.joinText,
            {
              fontSize: 9 * scale,
            },
          ]}
        >
          Join
        </Text>
      </Pressable>
    </Pressable>
  );
}

/* ============================================================
   NEARBY CARD
============================================================ */

function NearbyCard({
  title,
  distance,
  people,
  background,
  scale,
}: {
  title: string;
  distance: string;
  people: string;
  background: string;
  scale: number;
}) {
  return (
    <Pressable
      style={[
        styles.nearbyCard,
        {
          width: 85 * scale,
          height: 65 * scale,
          borderRadius: 8 * scale,
          marginRight: 6 * scale,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: background }}
        style={styles.nearbyBackground}
        imageStyle={[
          styles.nearbyBackgroundImage,
          {
            borderRadius: 8 * scale,
          },
        ]}
      >
        <View style={styles.nearbyOverlay} />

        <View
          style={[
            styles.nearbyContent,
            {
              paddingHorizontal: 7 * scale,
              paddingBottom: 5 * scale,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.nearbyTitle,
              {
                fontSize: 8.5 * scale,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.nearbyDistance,
              {
                fontSize: 7 * scale,
                marginTop: 1 * scale,
              },
            ]}
          >
            {distance}
          </Text>

          <View
            style={[
              styles.nearbyMeta,
              {
                marginTop: 3 * scale,
              },
            ]}
          >
            <Ionicons name="people" size={8 * scale} color="#FFFFFF" />

            <Text
              style={[
                styles.nearbyPeople,
                {
                  fontSize: 6.5 * scale,
                  marginLeft: 3 * scale,
                },
              ]}
            >
              {people}
            </Text>

            <View
              style={[
                styles.greenDot,
                {
                  width: 5 * scale,
                  height: 5 * scale,
                  borderRadius: 3 * scale,
                  marginLeft: 6 * scale,
                  marginRight: 3 * scale,
                },
              ]}
            />

            <Text
              style={[
                styles.nearbyLive,
                {
                  fontSize: 6.5 * scale,
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

/* ============================================================
   DISCOVER SCREEN
============================================================ */

export default function DiscoverScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const scale = width / 384;
  const sidePadding = 19 * scale;

  /*
   * The bottom navigation is position:absolute.
   *
   * Therefore the vertical ScrollView needs enough extra
   * content underneath the final Nearby section to allow
   * that final section to move completely above the nav.
   *
   * This is calculated from:
   *   - bottom navigation height
   *   - actual device safe-area bottom inset
   *   - a small visual gap
   */
  const bottomNavigationHeight = 54 * scale;

  const verticalBottomPadding =
    bottomNavigationHeight + insets.bottom + 14 * scale;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#020D1B" />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* ======================================================
            MAIN VERTICAL SCROLL
        ======================================================= */}

        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={[
            styles.mainScrollContent,
            {
              paddingHorizontal: sidePadding,

              /*
               * THIS IS THE IMPORTANT FIX.
               *
               * The entire page can now scroll far enough for
               * the Nearby cards to move completely above the
               * fixed bottom navigation.
               */
              paddingBottom: verticalBottomPadding,
            },
          ]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical
        >
          {/* ====================================================
              HEADER
          ===================================================== */}

          <View
            style={[
              styles.header,
              {
                marginTop: 2 * scale,
              },
            ]}
          >
            <View style={styles.headerTop}>
              <View>
                <View
                  style={[
                    styles.logoRow,
                    {
                      height: 28 * scale,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.logoOne,
                      {
                        fontSize: 27 * scale,
                        lineHeight: 29 * scale,
                      },
                    ]}
                  >
                    1
                  </Text>

                  <Text
                    style={[
                      styles.logoGo,
                      {
                        fontSize: 25 * scale,
                        lineHeight: 28 * scale,
                      },
                    ]}
                  >
                    Go
                  </Text>
                </View>

                <Text
                  style={[
                    styles.goodMorning,
                    {
                      fontSize: 13.5 * scale,
                      lineHeight: 17 * scale,
                      marginTop: 9 * scale,
                    },
                  ]}
                >
                  Good morning,
                </Text>

                <Text
                  style={[
                    styles.userName,
                    {
                      fontSize: 21 * scale,
                      lineHeight: 24 * scale,
                    },
                  ]}
                >
                  Victor <Text style={styles.wave}>👋</Text>
                </Text>

                <Text
                  style={[
                    styles.subtitle,
                    {
                      fontSize: 10.5 * scale,
                      lineHeight: 14 * scale,
                      marginTop: 4 * scale,
                    },
                  ]}
                >
                  Find rooms, join conversations,
                  {"\n"}and meet amazing people.
                </Text>
              </View>

              <View
                style={[
                  styles.headerActions,
                  {
                    marginTop: 4 * scale,
                  },
                ]}
              >
                <Pressable
                  style={[
                    styles.notificationButton,
                    {
                      width: 27 * scale,
                      height: 32 * scale,
                      marginRight: 11 * scale,
                    },
                  ]}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={21 * scale}
                    color="#FFFFFF"
                  />

                  <View
                    style={[
                      styles.notificationDot,
                      {
                        width: 7 * scale,
                        height: 7 * scale,
                        borderRadius: 4 * scale,
                        right: 1 * scale,
                        top: 0,
                      },
                    ]}
                  />
                </Pressable>

                <View style={styles.profileWrapper}>
                  <Image
                    source={iconImage}
                    style={[
                      styles.profileImage,
                      {
                        width: 31 * scale,
                        height: 31 * scale,
                        borderRadius: 16 * scale,
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.onlineDot,
                      {
                        width: 7 * scale,
                        height: 7 * scale,
                        borderRadius: 4 * scale,
                        right: -1 * scale,
                        bottom: 0,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* SEARCH */}

            <Pressable
              style={[
                styles.searchBar,
                {
                  height: 32 * scale,
                  borderRadius: 11 * scale,
                  marginTop: 12 * scale,
                  paddingHorizontal: 11 * scale,
                },
              ]}
            >
              <Ionicons name="search" size={19 * scale} color="#B3C0E2" />

              <Text
                style={[
                  styles.searchPlaceholder,
                  {
                    fontSize: 10.5 * scale,
                    marginLeft: 10 * scale,
                  },
                ]}
              >
                Search rooms, topics or people...
              </Text>
            </Pressable>
          </View>

          {/* ====================================================
              CATEGORIES
          ===================================================== */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            style={{
              marginTop: 12 * scale,
            }}
            contentContainerStyle={{
              paddingRight: 10 * scale,
            }}
          >
            {categories.map((category, index) => (
              <CategoryChip
                key={category.label}
                label={category.label}
                icon={category.icon}
                active={index === 0}
                scale={scale}
              />
            ))}
          </ScrollView>

          {/* ====================================================
              TRENDING HEADER
          ===================================================== */}

          <View
            style={[
              styles.sectionHeader,
              {
                marginTop: 15 * scale,
                marginBottom: 8 * scale,
              },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize: 15 * scale,
                },
              ]}
            >
              Trending rooms
            </Text>

            <Pressable style={styles.seeAllButton}>
              <Text
                style={[
                  styles.seeAll,
                  {
                    fontSize: 8.5 * scale,
                  },
                ]}
              >
                See all
              </Text>

              <Ionicons
                name="chevron-forward"
                size={13 * scale}
                color="#9C61FF"
              />
            </Pressable>
          </View>

          {/* TRENDING */}

          <FlatList
            data={trendingRooms}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.title}
            style={styles.horizontalList}
            contentContainerStyle={{
              paddingRight: 20 * scale,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  marginRight: 7 * scale,
                }}
              >
                <TrendingRoomCard
                  title={item.title}
                  tags={item.tags}
                  people={item.people}
                  badge={item.badge}
                  background={item.background}
                  scale={scale}
                />
              </View>
            )}
          />

          {/* ====================================================
              LIVE NOW HEADER
          ===================================================== */}

          <View
            style={[
              styles.sectionHeader,
              {
                marginTop: 15 * scale,
                marginBottom: 8 * scale,
              },
            ]}
          >
            <View style={styles.liveNowTitleWrap}>
              <View
                style={[
                  styles.liveNowRedDot,
                  {
                    width: 7 * scale,
                    height: 7 * scale,
                    borderRadius: 4 * scale,
                    marginRight: 6 * scale,
                  },
                ]}
              />

              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontSize: 15 * scale,
                  },
                ]}
              >
                Live now
              </Text>
            </View>

            <Pressable style={styles.seeAllButton}>
              <Text
                style={[
                  styles.seeAll,
                  {
                    fontSize: 8.5 * scale,
                  },
                ]}
              >
                See all
              </Text>

              <Ionicons
                name="chevron-forward"
                size={13 * scale}
                color="#9C61FF"
              />
            </Pressable>
          </View>

          {/* LIVE NOW */}

          <View>
            {liveRooms.map((room) => (
              <LiveRoomCard
                key={room.title}
                title={room.title}
                description={room.description}
                people={room.people}
                scale={scale}
              />
            ))}
          </View>

          {/* ====================================================
              NEARBY HEADER
          ===================================================== */}

          <View
            style={[
              styles.sectionHeader,
              {
                marginTop: 8 * scale,
                marginBottom: 8 * scale,
              },
            ]}
          >
            <View style={styles.nearbyTitleWrap}>
              <Ionicons name="location" size={17 * scale} color="#8555FF" />

              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontSize: 15 * scale,
                    marginLeft: 5 * scale,
                  },
                ]}
              >
                Nearby
              </Text>
            </View>

            <Pressable style={styles.seeAllButton}>
              <Text
                style={[
                  styles.seeAll,
                  {
                    fontSize: 8.5 * scale,
                  },
                ]}
              >
                See all
              </Text>

              <Ionicons
                name="chevron-forward"
                size={13 * scale}
                color="#9C61FF"
              />
            </Pressable>
          </View>

          {/* ====================================================
              NEARBY
          ===================================================== */}

          <FlatList
            data={nearbyRooms}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.title}
            style={styles.horizontalList}
            contentContainerStyle={{
              paddingRight: 20 * scale,
            }}
            renderItem={({ item }) => (
              <NearbyCard
                title={item.title}
                distance={item.distance}
                people={item.people}
                background={item.background}
                scale={scale}
              />
            )}
          />

          {/* ====================================================
              SMALL END CAP
              This stays inside the vertical ScrollView and gives
              the final Nearby cards a tiny amount of breathing
              room above the fixed bottom navigation.
          ===================================================== */}

          <View
            style={{
              height: 6 * scale,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      {/* ========================================================
          FIXED BOTTOM NAVIGATION
      ======================================================== */}

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
            <Ionicons name="home-outline" size={21 * scale} color="#98A4D0" />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 9 * scale,
                  marginTop: 1 * scale,
                },
              ]}
            >
              Home
            </Text>
          </Pressable>

          {/* DISCOVER ACTIVE */}

          <Pressable style={styles.navItem}>
            <Ionicons name="compass" size={22 * scale} color="#9652FF" />

            <Text
              style={[
                styles.navLabelActive,
                {
                  fontSize: 9 * scale,
                  marginTop: 1 * scale,
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
                width: 39 * scale,
                height: 39 * scale,
                borderRadius: 20 * scale,
                marginTop: -21 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.createButtonInner,
                {
                  width: 38 * scale,
                  height: 38 * scale,
                  borderRadius: 19 * scale,
                },
              ]}
            >
              <Ionicons name="add" size={27 * scale} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* MESSAGES */}

          <Pressable style={styles.navItem}>
            <View style={styles.messageIconWrapper}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={21 * scale}
                color="#98A4D0"
              />

              <View
                style={[
                  styles.messageBadge,
                  {
                    minWidth: 13 * scale,
                    height: 13 * scale,
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
                      fontSize: 6.5 * scale,
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
                  fontSize: 9 * scale,
                  marginTop: 1 * scale,
                },
              ]}
            >
              Messages
            </Text>
          </Pressable>

          {/* PROFILE */}

          <Pressable style={styles.navItem}>
            <Ionicons name="person-outline" size={22 * scale} color="#98A4D0" />

            <Text
              style={[
                styles.navLabel,
                {
                  fontSize: 9 * scale,
                  marginTop: 1 * scale,
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

  /* ===========================================================
     MAIN VERTICAL SCROLL
  =========================================================== */

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
    fontSize: 18,
  },

  subtitle: {
    color: "#A2ACCA",
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
    backgroundColor: "#B92CFF",
    borderWidth: 1,
    borderColor: "#020D1B",
  },

  /* ===========================================================
     SEARCH
  =========================================================== */

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#394B82",
    backgroundColor: "#07172D",
  },

  searchPlaceholder: {
    flex: 1,
    color: "#B5C0DF",
    fontWeight: "500",
  },

  /* ===========================================================
     CATEGORY CHIPS
  =========================================================== */

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D1C33",
    borderWidth: 1,
    borderColor: "#172B4B",
  },

  categoryChipActive: {
    backgroundColor: "#6A35EF",
    borderColor: "#7A45FF",
  },

  categoryText: {
    color: "#B8C2DE",
    fontWeight: "600",
  },

  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* ===========================================================
     SECTION HEADERS
  =========================================================== */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#F4F6FF",
    fontWeight: "800",
  },

  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  seeAll: {
    color: "#9C61FF",
    fontWeight: "700",
  },

  liveNowTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  liveNowRedDot: {
    backgroundColor: "#FF315B",
  },

  nearbyTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* ===========================================================
     HORIZONTAL LISTS
  =========================================================== */

  horizontalList: {
    width: "100%",
    flexGrow: 0,
  },

  /* ===========================================================
     TRENDING
  =========================================================== */

  trendingCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#33477D",
    backgroundColor: "#111C31",
  },

  trendingBackground: {
    flex: 1,
  },

  trendingBackgroundImage: {
    width: "100%",
    height: "100%",
  },

  trendingOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(1, 5, 17, 0.48)",
  },

  trendingBadge: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9141EF",
  },

  trendingBadgeText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  trendingContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  trendingTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  trendingTags: {
    color: "#C0C9E0",
    fontWeight: "500",
  },

  trendingMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  trendingPeople: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  trendingLive: {
    color: "#00E2A6",
    fontWeight: "700",
  },

  greenDot: {
    backgroundColor: "#00E2A6",
  },

  trendingArrow: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16, 48, 87, 0.90)",
  },

  /* ===========================================================
     LIVE NOW
  =========================================================== */

  liveRoomCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1A3154",
    backgroundColor: "#06152A",
  },

  liveAvatar: {
    borderWidth: 1.5,
    borderColor: "#7251FF",
    backgroundColor: "#172944",
  },

  liveRoomText: {
    flex: 1,
    justifyContent: "center",
  },

  liveRoomTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  liveRoomDescription: {
    color: "#A9B5D1",
    fontWeight: "500",
  },

  liveRoomMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  liveRoomPeople: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  liveRoomLive: {
    color: "#00E2A6",
    fontWeight: "700",
  },

  joinButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6D35EF",
  },

  joinText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  /* ===========================================================
     NEARBY
  =========================================================== */

  nearbyCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#304779",
    backgroundColor: "#111D32",
  },

  nearbyBackground: {
    flex: 1,
  },

  nearbyBackgroundImage: {
    width: "100%",
    height: "100%",
  },

  nearbyOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(1, 8, 20, 0.38)",
  },

  nearbyContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  nearbyTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  nearbyDistance: {
    color: "#D0D6E8",
    fontWeight: "500",
  },

  nearbyMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  nearbyPeople: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  nearbyLive: {
    color: "#00E2A6",
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

  navLabel: {
    color: "#9BA7CC",
    fontWeight: "600",
  },

  navLabelActive: {
    color: "#9853FF",
    fontWeight: "700",
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
