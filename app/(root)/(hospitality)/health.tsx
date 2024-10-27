import React from "react";
import { Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import { Colors } from "@/constants/Colors";
import defaultStyles from "@/constants/Styles";
import Loader from "@/components/Loader";

const MedicalFacilitiesScreen = () => {
  interface HealthData {
    [key: string]: {
      description: string;
      services: string[];
    };
  }

  const { data, isLoading, error, refetch, isRefetching } = useFirestoreQuery<HealthData>("health");

  if (isLoading) return <Loader text="healthcare information" />;
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>;
  if (!data) return <Text style={styles.message}>No medical facilities information available.</Text>;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    >
      <Text style={defaultStyles.topSectionTitle}>Health Information</Text>

      {Object.entries(data).map(([providerName, providerData]) => (
        <React.Fragment key={providerName}>
          <Text style={defaultStyles.sectionTitle}>{providerData.name}</Text>
          <Text style={defaultStyles.text}>{providerData.description}</Text>

          <Text style={defaultStyles.sectionTitle}>Services</Text>
          {providerData.services.map((service, index) => (
            <Text key={index} style={styles.serviceItem}>
              • {service}
            </Text>
          ))}
        </React.Fragment>
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
  serviceItem: {
    ...defaultStyles.text,
    marginLeft: 16,
    marginBottom: 8,
  },
});

export default MedicalFacilitiesScreen;
