import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  isLast: boolean;
}

interface ProfileCardProps {
  items: ProfileItemProps[];
}

const ProfileItem = ({ icon, label, value, isLast }: ProfileItemProps) => (
  <View style={[styles.profileItem, isLast && styles.lastProfileItem]}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={24} color={Colors.OceanBlue} />
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const ProfileCard = ({ items }: ProfileCardProps) => (
  <View style={styles.card}>
    {items.map((item, index) => (
      <ProfileItem
        key={index}
        icon={item.icon}
        label={item.label}
        value={item.value}
        isLast={index === items.length - 1}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 28,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
  profileHeader: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.White,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.OceanBlue,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  discipline: {
    fontSize: 18,
    textAlign: "right",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastProfileItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#8F9BB3",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "600",
  },
  logoutButton: {
    marginRight: 16,
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileCard;
