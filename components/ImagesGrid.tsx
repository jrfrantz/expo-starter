import { FlatList, Pressable, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ImageTile from "./ImageTile";

import useEmbeddedViemClient from "../hooks/useEmbeddedViemClient";
import Button from "./Button";
const image0 = require("../assets/synthwave/synthwave_image-0.png");
const image1 = require("../assets/synthwave/synthwave_image-1.png");
const image2 = require("../assets/synthwave/synthwave_image-2.png");
const image3 = require("../assets/synthwave/synthwave_image-3.png");
const image4 = require("../assets/synthwave/synthwave_image-4.png");
const image5 = require("../assets/synthwave/synthwave_image-5.png");
const image6 = require("../assets/synthwave/synthwave_image-6.png");
const image7 = require("../assets/synthwave/synthwave_image-7.png");
const image8 = require("../assets/synthwave/synthwave_image-8.png");
const image9 = require("../assets/synthwave/synthwave_image-9.png");
const image10 = require("../assets/synthwave/synthwave_image-10.png");

const imagesAssets = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => ({
  id: idx,
  url: idx,
  img: imagesAssets.at(idx),
}));
export default function ImagesGrid({}) {
  const client = useEmbeddedViemClient();

  const FOOTER_HEIGHT = 100;

  const rotationDegrees = useSharedValue(0);
  const rotation = useDerivedValue(() =>
    interpolate(rotationDegrees.value, [0, 360], [0, 360])
  );
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));
  const startAnimation = (finalNum: number) =>
    (rotationDegrees.value = withSpring(finalNum, { duration: 8000 }));

  return (
    <Animated.View style={{ flex: 1 }}>
      <Pressable onPress={() => startAnimation(180)}>
        <Animated.Text style={[{ padding: 4, justifyContent: 'center', textAlign: 'center', alignItems: 'center', backgroundColor: 'green', }, rotationStyle]}>
          Spinny
        </Animated.Text>
      </Pressable>
      <Button onClick={() => startAnimation(0)} text="start spin" />
      <Button onClick={() => {}} text="stio spin" />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ImageTile item={item} index={index} />
        )}
        contentContainerStyle={{
          paddingBottom: FOOTER_HEIGHT,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          height: FOOTER_HEIGHT,
          backgroundColor: "green",
          padding: 8,
        }}
      >
        <Pressable onPress={() => console.log("pressed")}>
          {({ pressed }) => (
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                padding: 12,
                backgroundColor: pressed ? "pink" : "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Mint random</Text>
            </View>
          )}
        </Pressable>
      </View>
    </Animated.View>
  );
}
