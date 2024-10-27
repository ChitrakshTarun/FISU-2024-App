import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable, RefreshControl } from "react-native";
import Loader from "@/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import useScheduleQuery from "@/hooks/useScheduleQuery";
import { Schedule } from "@/utils/types/schedule";

const CalendarPage: React.FC = () => {
  const { data, isLoading, error, refetch, isRefetching } = useScheduleQuery();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  if (isLoading) return <Loader text="schedule" />;
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>;
  if (!data) return <Text style={styles.message}>No events available.</Text>;

  const toggleDay = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(2000 + year, month - 1, day); // Adjusting year to 2000s and month to 0-based index
  };

  const renderEventItem = ({ item: [date, events] }: { item: [string, Schedule] }) => (
    <View key={date} style={styles.eventsContainer}>
      <Pressable style={styles.button} onPress={() => toggleDay(date)}>
        <Text style={styles.dateHeading}>
          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(parseDate(date))}
        </Text>
        <Ionicons name={expandedDay === date ? "chevron-up" : "chevron-down"} size={20} color="#000" />
      </Pressable>
      {expandedDay === date && (
        <View style={styles.eventContainer}>
          {Object.entries(events).map(([id, event]) => (
            <View key={id} style={styles.eventItem}>
              <Text style={styles.eventText}>
                • {event.title} {event.allDay ? "(All Day)" : ""}
              </Text>
              {event.startTime && event.endTime && (
                <Text style={styles.eventText}>
                  Start:{" "}
                  {new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(
                    new Date(event.startTime.toMillis())
                  )}
                  - End:{" "}
                  {new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(
                    new Date(event.endTime.toMillis())
                  )}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={Object.entries(data)}
      keyExtractor={(item) => item[0]} // Use the date as a unique key
      renderItem={renderEventItem}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      contentContainerStyle={styles.container}
    />
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  eventsContainer: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    marginVertical: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dateHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    alignItems: "center",
  },
  eventContainer: {
    paddingVertical: 8,
  },
  eventItem: {
    marginBottom: 4,
  },
  eventText: {
    fontSize: 16,
    color: "#4b5563",
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
