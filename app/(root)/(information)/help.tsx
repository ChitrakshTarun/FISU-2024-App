import { Linking, Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import { Ionicons } from "@expo/vector-icons";
import defaultStyles from "@/constants/Styles";
import Loader from "@/components/Loader";

const HelpPage = () => {
  interface HelpData {
    email: {
      Contact: string;
      "Delegation Service": string;
      Info: string;
    };
    phone: {
      Helpline: string;
    };
  }

  const { data, isLoading, error } = useFirestoreQuery<HelpData>("help", "contacts");

  if (isLoading) {
    return <Loader text="help information..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching help data</Text>
      </View>
    );
  }

  const { email, phone } = data!;

  return (
    <ScrollView style={styles.container}>
      <Text style={defaultStyles.topSectionTitle}>Contact Numbers</Text>
      {Object.entries(phone).map(([key, value]) => (
        <Pressable key={key} style={styles.contactItem} onPress={() => Linking.openURL(`tel:${value}`)}>
          <Text style={styles.contactText}>{key}</Text>
          <Ionicons name="call-outline" size={24} color="#000" />
        </Pressable>
      ))}

      <Text style={defaultStyles.sectionTitle}>Email Contacts</Text>
      {Object.entries(email).map(([key, value]) => (
        <Pressable key={key} style={styles.contactItem} onPress={() => Linking.openURL(`mailto:${value}`)}>
          <Text style={styles.contactText}>{key}</Text>
          <Ionicons name="mail-outline" size={24} color="#000" />
        </Pressable>
      ))}

      <Text style={styles.footerText}>
        The following numbers and emails can be contacted for assistance through phone call or email. Click the icon to
        be redirected accordingly.
      </Text>
    </ScrollView>
  );
};

export default HelpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  contactText: {
    fontSize: 16,
  },
  footerText: {
    marginTop: 24,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
});
