import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import defaultStyles from "@/constants/Styles";
import ItemCard from "@/components/ItemCard";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import Loader from "@/components/Loader";

const ShootingEventsPage = () => {
  const { data: shootingEvents, isLoading, error } = useFirestoreQuery("events");

  if (isLoading) return <Loader text="Loading shooting events..." />;
  if (error) return <Text>Error loading events: {error.message}</Text>;
  if (!shootingEvents) return <Text>No event information available.</Text>;

  const sortCategories = (categories: string[]) => {
    const order = ["men", "women", "mixed"];
    return categories.sort((a, b) => order.indexOf(a.toLowerCase()) - order.indexOf(b.toLowerCase()));
  };

  const renderEvents = (category: string, events: any) => (
    <React.Fragment key={category}>
      <Text style={[category === "men" ? defaultStyles.topSectionTitle : defaultStyles.sectionTitle]}>
        Events {`(${category.charAt(0).toUpperCase() + category.slice(1)})`}
      </Text>
      {Object.keys(events).map((weaponType) => (
        <React.Fragment key={weaponType}>
          <Text style={defaultStyles.subheading}>{weaponType.charAt(0).toUpperCase() + weaponType.slice(1)}</Text>
          {Object.keys(events[weaponType]).map((eventName) => (
            <ItemCard
              key={eventName}
              icon="ticket-outline"
              title={eventName}
              description={events[weaponType][eventName]}
              onPress={() => {}}
            />
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sortCategories(Object.keys(shootingEvents)).map((category) => renderEvents(category, shootingEvents[category]))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ShootingEventsPage;
