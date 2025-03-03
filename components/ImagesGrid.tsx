import { FlatList, Pressable, Text, View, Animated } from "react-native";
import Reanimated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ImageTile from "./ImageTile";

import useEmbeddedViemClient from "../hooks/useEmbeddedViemClient";
import Button from "./Button";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useRef } from "react";
import useMyNfts from "../hooks/useMyNfts";
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
const image11 = require("../assets/synthwave/synthwave_image-11.png");

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
  image11,
];

const imageTitles = [
  "Dreamy Recording Studio",
  "Neon Forest",
  "Eating Out",
  "Arcade King",
  "Dreamsicle Sunset",
  "Space Cadet",
  "Disco Fiebre",
  "Izakaya",
  "Torn Rider",
  "Fashionista",
  "Beach B0d",
  "¿What the Watercolor",
];

export const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, idx) => ({
  id: idx,
  url: idx,
  img: imagesAssets.at(idx),
  title: imageTitles[idx],
}));
export default function ImagesGrid({}) {
  console.log("rendering");
  const FOOTER_HEIGHT = 100;
  const { contractData } = useMyNfts()

  return (
    <>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ImageTile item={item} index={index} ownershipCount={contractData?.at(index)} />
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
          padding: 8,
        }}
      >
        <Link href="/reveal" asChild>
          <Pressable>
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                padding: 12,
                backgroundColor: "#081F1F",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 24,
                }}
              >
                Mint Random
              </Text>
            </View>
          </Pressable>
        </Link>
      </View>
    </>
  );
}