import { useRouter } from "expo-router";
import { StyleSheet, View, FlatList, Text, RefreshControl } from "react-native";
import UpdatesCard from "@/components/UpdatesCard";
import useFirestoreQuery from "@/hooks/useFirestoreQuery";
import Loader from "@/components/Loader";
import { Updates } from "@/utils/types/updates";

const UpdatesScreen = () => {
  // Replace useUpdatesQuery with useFirestoreQuery for the "updates" collection
  const { data: updates, isLoading, isError, refetch, isRefetching } = useFirestoreQuery<Updates>("updates");

  if (isLoading) {
    return <Loader text="notifications" />;
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text>An error occurred</Text>
      </View>
    );
  }

  return (
    <View style={styles.safeAreaContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(updates || {})} // Use Object.values to transform the updates object into an array
        renderItem={({ item }) => (
          <UpdatesCard
            id={item.id}
            time={item.time}
            title={item.title}
            description={item.description}
            onPress={() => {}}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flexGrow: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdatesScreen;
