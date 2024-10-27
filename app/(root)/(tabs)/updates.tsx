import { StyleSheet, View, FlatList, Text, RefreshControl } from "react-native";
import UpdatesCard from "@/components/UpdatesCard";
import useUpdatesQuery from "@/hooks/useUpdatesQuery";
import Loader from "@/components/Loader";

const UpdatesScreen = () => {
  const { data: updates, isLoading, isError, refetch, isRefetching } = useUpdatesQuery();

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
        data={updates}
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
