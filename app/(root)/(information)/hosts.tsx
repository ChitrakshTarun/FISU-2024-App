import React from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import { Colors } from "@/constants/Colors";
import defaultStyles from "@/constants/Styles";
import Loader from "@/components/Loader";

const HostsScreen = () => {
  interface EventInfo {
    [key: string]: {
      name: string;
      description: string;
      title: string;
    };
  }

  const { data, isLoading, error, refetch, isRefetching } = useFirestoreQuery<EventInfo>("hosts");

  if (isLoading) return <Loader text="hosts information..." />;
  if (error) return <Text style={styles.message}>Error loading event info: {error.message}</Text>;
  if (!data) return <Text style={styles.message}>No event information available.</Text>;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    >
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.section}>
          <Text style={defaultStyles.topSectionTitle}>{value.title}</Text>
          <Text style={styles.universityName}>{value.name}</Text>
          <Text style={defaultStyles.text}>{value.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.White,
  },
  message: {
    ...defaultStyles.text,
    textAlign: "center",
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  universityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Orange,
    marginBottom: 8,
  },
});

export default HostsScreen;
