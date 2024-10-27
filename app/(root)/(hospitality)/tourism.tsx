import React from "react";
import { Text, StyleSheet, RefreshControl, FlatList } from "react-native";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import defaultStyles from "@/constants/Styles";
import Loader from "@/components/Loader";
import ItemCard from "@/components/ItemCard";
import { useRouter } from "expo-router";

const TourismPage = () => {
  interface TourismItem {
    id: string;
    name: string;
    description: string;
    maps: string;
    link?: string;
  }

  const { data, isLoading, error, refetch, isRefetching } = useFirestoreQuery<TourismItem>("tourism");

  if (isLoading) return <Loader text="tourism information" />;
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>;
  if (!data) return <Text style={styles.message}>No cultural information available.</Text>;

  const dataArray = Object.keys(data).map((key) => {
    const { id, ...rest } = data[key];
    return {
      id: key,
      ...rest,
    };
  });

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={dataArray}
      renderItem={({ item }) => (
        <ItemCard icon="ticket-outline" title={item.name} description={item.description} onPress={() => {}} />
      )}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  message: {
    ...defaultStyles.text,
    textAlign: "center",
    marginTop: 20,
  },
});

export default TourismPage;
