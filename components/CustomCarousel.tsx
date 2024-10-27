// DEPENDENCIES
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
// COMPONENTS AND ICONS
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
// DATA, CONSTANTS AND FUNCTIONS
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/constants/Styles";
import { Image } from "expo-image";
import tourismCarousel from "@/assets/images/tourism-carousel.png";
import eventsCarousel from "@/assets/images/events-carousel.png";
import { Href, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CarouselItem {
  title: string;
  carouselImage: any;
  path: Href<string>;
}

const carousel: CarouselItem[] = [
  {
    title: "Discover Tourism Spots",
    carouselImage: tourismCarousel,
    path: "/(root)/(hospitality)/tourism",
  },
  {
    title: "Check out the events",
    carouselImage: eventsCarousel,
    path: "/(root)/(information)/events",
  },
];

const CustomCarousel = () => {
  const router = useRouter();
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4.75,
  } as const;

  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <View style={{ alignItems: "center", paddingTop: 16 }}>
      <Carousel
        ref={ref}
        {...baseOptions}
        style={{ width: SCREEN_WIDTH }}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={4000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={carousel}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.75}
            onPress={() => router.push(item.path)}
            style={[styles.carousel]}
          >
            <Image style={[styles.carousel, { borderRadius: 8 }]} contentFit="cover" source={item.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carousel: {
    height: SCREEN_HEIGHT / 4.75,
    width: SCREEN_WIDTH,
    borderRadius: 16,
    overflow: "hidden",
  },
  carouselText: {
    position: "absolute",
    bottom: 12,
    left: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
