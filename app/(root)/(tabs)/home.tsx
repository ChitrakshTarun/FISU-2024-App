// DEPENDENCIES
import { StyleSheet, Text, ScrollView, View } from "react-native";
// COMPONENTS AND ICONS
import HomeButtonCard from "@/components/HomeButtonCard";
import CustomCarousel from "@/components/CustomCarousel";
import { Ionicons } from "@expo/vector-icons";
// DATA, CONSTANTS AND FUNCTIONS
import information from "@/data/hometabs/information.json";
import hospitality from "@/data/hometabs/hospitality.json";
import defaultStyles, { SCREEN_HEIGHT } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Href } from "expo-router";

const HomePage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* CAROUSEL */}
      <CustomCarousel />
      {/* INFORMATION */}
      <Text style={defaultStyles.subheading}>Gear up for the event</Text>
      <View style={styles.grid}>
        {information.map((item, index) => (
          <HomeButtonCard
            key={index}
            title={item.title}
            icon={item.icon as keyof typeof Ionicons.glyphMap}
            backgroundColor={[Colors.Sage, Colors.SeaGreen]}
            path={item.path as Href<string>}
          />
        ))}
      </View>

      {/* HOSPITALITY */}
      <Text style={defaultStyles.subheading}>Hospitality</Text>
      <View style={styles.grid}>
        {hospitality.map((item, index) => (
          <HomeButtonCard
            key={index}
            title={item.title}
            icon={item.icon as keyof typeof Ionicons.glyphMap}
            backgroundColor={[Colors.Sage, Colors.SeaGreen]}
            path={item.path as Href<string>}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  carousel: {
    height: SCREEN_HEIGHT / 4.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "flex-start",
  },
});
