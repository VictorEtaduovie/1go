import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { themes } from "@/theme/colors";
import CreateSheet from "@/components/create/CreateSheet";

export default function CreateTestScreen() {
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const colorScheme = useColorScheme();

  const electricAzure = themes.electricAzure;

  const colors =
    colorScheme === "dark" ? electricAzure.dark : electricAzure.light;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          + Button Test
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowCreateSheet(true)}
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>Open Create</Text>
        </TouchableOpacity>
      </View>

      <CreateSheet
        visible={showCreateSheet}
        onClose={() => setShowCreateSheet(false)}
        onCreatePost={() => {
          console.log("Create Post");
        }}
        onCreateRoom={() => {
          console.log("Create Room");
        }}
        onCreateOrganization={() => {
          console.log("Create Organization");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 24,
  },

  button: {
    minWidth: 180,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
