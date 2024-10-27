import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import { Colors } from "@/constants/Colors";
import defaultStyles from "@/constants/Styles";
import Loader from "@/components/Loader";

const VenuesScreen = () => {
  interface VenueItem {
    name: string;
    shootingPoints: number | string;
    seatingCapacity: number | string;
  }

  interface VenueSection {
    type: string;
    title: string;
    items: VenueItem[];
  }

  interface Venue {
    name: string;
    location: string;
    description: string;
    sections: VenueSection[];
  }

  interface VenuesData {
    [key: string]: Venue;
  }

  const { data, isLoading, error, refetch, isRefetching } = useFirestoreQuery<VenuesData>("venues");
  if (isLoading) return <Loader text="venues information..." />;
  if (error) return <Text style={styles.message}>Error loading venues: {error.message}</Text>;
  if (!data || Object.keys(data).length === 0) return <Text style={styles.message}>No venues available.</Text>;

  // Destructure the venues data
  const venues = Object.values(data) as unknown as Venue[];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    >
      {venues.map((venue, venueIndex) => (
        <View key={venueIndex}>
          <Text style={defaultStyles.topSectionTitle}>{venue.name}</Text>
          <Text style={styles.location}>{venue.location}</Text>
          <Text style={defaultStyles.text}>{venue.description}</Text>

          {venue.sections?.map((section, sectionIndex) => (
            <View key={sectionIndex}>
              <Text style={defaultStyles.sectionTitle}>{section.title}</Text>
              {section.items?.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <Text style={styles.venueName}>{item.name}</Text>
                  <Text style={styles.venueDetail}>Shooting Points: {item.shootingPoints}</Text>
                  <Text style={styles.venueDetail}>Seating Capacity: {item.seatingCapacity}</Text>
                </View>
              ))}
            </View>
          ))}
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
  location: {
    color: Colors.Gray,
    marginBottom: 8,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Orange,
    marginVertical: 8,
  },
  venueDetail: {
    fontSize: 14,
    color: Colors.Black,
  },
});

export default VenuesScreen;
