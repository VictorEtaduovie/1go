import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "@/theme/colors";

type CreateSheetProps = {
  visible: boolean;
  onClose: () => void;
  onCreatePost: () => void;
  onCreateRoom: () => void;
  onCreateOrganization: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CreateSheet({
  visible,
  onClose,
  onCreatePost,
  onCreateRoom,
  onCreateOrganization,
}: CreateSheetProps) {
  const colorScheme = useColorScheme();
  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 22,
          stiffness: 180,
          mass: 0.8,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backdropAnim]);

  const handleCreatePost = () => {
    onClose();
    setTimeout(onCreatePost, 180);
  };

  const handleCreateRoom = () => {
    onClose();
    setTimeout(onCreateRoom, 180);
  };

  const handleCreateOrganization = () => {
    onClose();
    setTimeout(onCreateOrganization, 180);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        {/* =========================
            BACKDROP
        ========================= */}
        <Animated.View
          pointerEvents={visible ? "auto" : "none"}
          style={[
            styles.backdrop,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(0,0,0,0.72)"
                  : "rgba(0,0,0,0.55)",
              opacity: backdropAnim,
            },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        {/* =========================
            CREATE SHEET
        ========================= */}
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Drag handle */}
          <View
            style={[
              styles.handle,
              {
                backgroundColor: colors.border,
              },
            ]}
          />

          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              What do you want to create?
            </Text>
          </View>

          {/* =========================
              CREATE POST
          ========================= */}
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={handleCreatePost}
            style={[
              styles.option,
              {
                backgroundColor: colorScheme === "dark" ? "#211B3A" : "#F0EBFF",
                borderColor: colorScheme === "dark" ? "#3A315C" : "#E3DAFF",
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#7C3AED" : "#7C3AED",
                },
              ]}
            >
              <Ionicons name="create-outline" size={27} color="#FFFFFF" />
            </View>

            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Create a Post
              </Text>

              <Text
                style={[
                  styles.optionDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Share your thoughts, ideas or moments
              </Text>
            </View>
          </TouchableOpacity>

          {/* =========================
              CREATE ROOM
          ========================= */}
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={handleCreateRoom}
            style={[
              styles.option,
              {
                backgroundColor: colorScheme === "dark" ? "#12243D" : "#EAF4FF",
                borderColor: colorScheme === "dark" ? "#243D5D" : "#D6E8FF",
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="radio-outline" size={28} color="#FFFFFF" />
            </View>

            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Create a Room
              </Text>

              <Text
                style={[
                  styles.optionDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Start a live conversation
              </Text>
            </View>
          </TouchableOpacity>

          {/* =========================
              CREATE ORGANIZATION
          ========================= */}
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={handleCreateOrganization}
            style={[
              styles.option,
              {
                backgroundColor: colorScheme === "dark" ? "#102C20" : "#E9FAF0",
                borderColor: colorScheme === "dark" ? "#234E3A" : "#D1F1DE",
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#16A34A" : "#16A34A",
                },
              ]}
            >
              <Ionicons name="business-outline" size={28} color="#FFFFFF" />
            </View>

            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                Create an Organization
              </Text>

              <Text
                style={[
                  styles.optionDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Build your brand or business
              </Text>
            </View>
          </TouchableOpacity>

          {/* =========================
              CANCEL
          ========================= */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={styles.cancelButton}
          >
            <Text
              style={[
                styles.cancelText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
  },

  sheet: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },

  handle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 25,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 22,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    textAlign: "center",
  },

  option: {
    minHeight: 100,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  optionContent: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 4,
  },

  optionTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
    marginBottom: 4,
  },

  optionDescription: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: "500",
  },

  cancelButton: {
    minHeight: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
  },

  cancelText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
});
