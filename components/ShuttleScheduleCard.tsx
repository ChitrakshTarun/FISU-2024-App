import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ShuttleScheduleCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  shuttleNo: string;
  startLocation: string;
  endLocation: string;
  onPress: () => void;
}

const ShuttleScheduleCard = ({
  icon,
  shuttleNo,
  title,
  startLocation,
  endLocation,
  onPress,
}: ShuttleScheduleCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Ionicons name={icon} size={36} style={styles.icon} />
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{shuttleNo}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Text numberOfLines={1} style={styles.description}>
            {startLocation}
          </Text>
          <Ionicons name="arrow-forward-outline" size={16} color="#666" style={styles.arrowIcon} />
          <Text numberOfLines={1} style={styles.description}>
            {endLocation}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
});

export default ShuttleScheduleCard;
