import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Loader from "@/components/Loader";
import { useAuth } from "@/providers/CustomAuthProvider";
import usePlayerDataQuery from "@/hooks/usePlayerDataQuery";
import { Colors } from "@/constants/Colors";
import ProfileCard from "@/components/ProfileCard";

export default function ProfileScreen() {
  const { signOut, passportNumber } = useAuth();
  const { data, isLoading } = usePlayerDataQuery(passportNumber!);

  if (isLoading) {
    return <Loader text="your profile" />;
  }

  const { country, dob, gender, name, shooting_discipline } = data!;
  const profileItems = [
    { icon: "person-outline", label: "Name", value: name },
    { icon: "id-card-outline", label: "Passport Number", value: passportNumber },
    { icon: "flag-outline", label: "Country", value: country },
    { icon: "calendar-outline", label: "Date of Birth", value: dob },
    { icon: "person-outline", label: "Gender", value: gender },
    { icon: "card-outline", label: "Discipline", value: shooting_discipline },
  ];

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={signOut} style={{ marginRight: 20 }}>
              <Ionicons name="log-out-outline" size={28} color={Colors.Black} />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{name[0]}</Text>
            </View>
          </View>
        </View>
        <ProfileCard items={profileItems} />
      </ScrollView>
    </>
  );
}

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
    shadowColor: Colors.Black,
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
    // fontSize: 24,
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
});
