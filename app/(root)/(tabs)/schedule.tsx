import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import Loader from "@/components/Loader";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import EventScheduleCard from "@/components/EventScheduleCard";
import { Schedule } from "@/utils/types/schedule";

const SchedulePage = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFirestoreQuery<Schedule>("schedule");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  if (isLoading) return <Loader text="schedule" />;
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>;
  if (!data) return <Text style={styles.message}>No events available.</Text>;

  const toggleDay = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <FlatList
      data={Object.entries(data)}
      keyExtractor={(item) => item[0]}
      renderItem={({ item: [date, events] }) => (
        <EventScheduleCard
          date={date}
          events={Object.values(events)}
          isExpanded={expandedDay === date}
          onToggle={() => toggleDay(date)}
        />
      )}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      contentContainerStyle={styles.container}
    />
  );
};

export default SchedulePage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
