import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import ItemCard from "@/components/ItemCard";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import defaultStyles from "@/constants/Styles";
import Loader from "@/components/Loader";

const FoodPage = () => {
  interface MenuItem {
    name: string;
    description: string;
  }

  const { data, isLoading, error, refetch, isRefetching } = useFirestoreQuery<{ [key: string]: MenuItem }>("food");

  if (isLoading) return <Loader text="food information" />;
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>;
  if (!data) return <Text style={styles.message}>No food information available.</Text>;

  // Transform the data from an object to an array of items
  const items = Object.entries(data).map(([id, item]) => ({
    id,
    title: item.name,
    description: item.description,
  }));

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={items} // Use the transformed items array
      renderItem={({ item }) => (
        <ItemCard
          icon="fast-food-outline"
          title={item.title}
          description={item.description}
          onPress={() => {
            /* Handle item press */
          }}
        />
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

export default FoodPage;
