import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShuttleScheduleCard from "@/components/ShuttleScheduleCard";

const ShuttlesPage = () => {
  return (
    <View style={styles.container}>
      <ShuttleScheduleCard
        icon="bus-outline"
        onPress={() => {}}
        title="Shuttle"
        shuttleNo="DL123ABCD"
        startLocation="Airport"
        endLocation="Hotel"
      />
      <ShuttleScheduleCard
        icon="bus-outline"
        onPress={() => {}}
        title="Shuttle"
        shuttleNo="DL123EFGH"
        startLocation="Shooting Range"
        endLocation="University"
      />
      <ShuttleScheduleCard
        icon="bus-outline"
        onPress={() => {}}
        title="Shuttle"
        shuttleNo="DL123IJKL"
        startLocation="Hotel"
        endLocation="Airport"
      />
      <ShuttleScheduleCard
        icon="bus-outline"
        onPress={() => {}}
        title="Shuttle"
        shuttleNo="DL123MNOP"
        startLocation="Shooting Range"
        endLocation="Venue"
      />
    </View>
  );
};

export default ShuttlesPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
