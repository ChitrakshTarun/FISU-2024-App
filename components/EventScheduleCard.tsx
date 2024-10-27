// src/components/EventScheduleCard.tsx

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Event {
  title: string;
  allDay: boolean;
  startTime?: { toMillis: () => number };
  endTime?: { toMillis: () => number };
}

interface EventScheduleCardProps {
  date: string;
  events: Event[];
  isExpanded: boolean;
  onToggle: () => void;
}

const EventScheduleCard = ({ date, events, isExpanded, onToggle }: EventScheduleCardProps) => {
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(2000 + year, month - 1, day); // Adjusting year to 2000s and month to 0-based index
  };

  return (
    <View style={styles.eventsContainer}>
      <Pressable style={styles.button} onPress={onToggle}>
        <Text style={styles.dateHeading}>
          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(parseDate(date))}
        </Text>
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#000" />
      </Pressable>
      {isExpanded && (
        <View style={styles.eventContainer}>
          {events.map((event, index) => (
            <View key={index} style={styles.eventItem}>
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
};

const styles = StyleSheet.create({
  eventsContainer: {
    backgroundColor: "#fff",
    paddingVertical: 8,
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
});

export default EventScheduleCard;
