import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Animated, Easing, Image, Pressable } from "react-native";
import { images } from "../components/ImagesGrid";
import useMintNft from "../hooks/useMintNft";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import DemoRouletteWheel from "../components/DemoRouletteWheel";
const stirs = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

export default function Reveal() {
  const insets = useSafeAreaInsets();
  const [finished, setIsFinished] = useState(false);
  const winningIndex = useMemo(() => Math.floor(Math.random() * 11), []);
  const { txHash, mint, isLoading, error } = useMintNft();
  console.log({ txHash, mint, isLoading, error });
  const winningAngle = (360 / stirs.length) * winningIndex;

  const spinValue = useRef(new Animated.Value(0)).current;
  const spinTiming = Animated.timing(spinValue, {
    toValue: 1080,
    duration: 2000,
    easing: Easing.out(Easing.circle),
    useNativeDriver: true,
  });

  const revealItemSizeValue = useRef(new Animated.Value(0)).current;
  const revealItemTiming = Animated.timing(revealItemSizeValue, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  });

  useEffect(() => {
    finished && revealItemTiming.start();
  }, [finished]);

  return (
    <LinearGradient
      style={{
        height: "100%",
        width: "100%",
        paddingTop: 18,
      }}
      colors={["#937DE530", "#50E2C830"]}
      start={{ x: 0.07, y: 0 }}
    >
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignContent: "center",
              opacity: revealItemSizeValue,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 24,
                  marginBottom: 48,
                }}
              >
                Congrats, you minted
              </Text>
              <Image
                source={images[winningIndex]?.img ?? ""}
                resizeMode="contain"
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  marginTop: 30,
                  fontWeight: "bold",
                }}
              >
                {images[winningIndex]?.title}
              </Text>
            </View>
          </Animated.View>
          <View
            style={{
              overflow: "hidden",
              position: "absolute",
              top: "20%",
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                top: 50,
                zIndex: 100,
                opacity: revealItemSizeValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    rotate: Animated.modulo(
                      spinValue,
                      360 / stirs.length
                    ).interpolate({
                      inputRange: [0, 360 / stirs.length],
                      outputRange: ["0deg", "-20deg"],
                    }),
                  },
                  { scaleY: 1.25 },
                ],
              }}
            >
              <FontAwesome5 name="map-marker" size={96} color="red" />
            </Animated.View>
            <Animated.View
              style={{
                width: "auto",
                justifyContent: "center",
                alignItems: "center",
                opacity: revealItemSizeValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    rotate: spinValue.interpolate({
                      inputRange: [0, 1080],
                      outputRange: ["0deg", `${2160 + -1 * winningAngle}deg`],
                    }),
                  },
                ],
              }}
            >
              <DemoRouletteWheel />
            </Animated.View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: "5%",
            right: 0,
            alignSelf: "flex-end",
            zIndex: 99999,
            height: 100 /* FOOTER_HEIGHT */,
            padding: 8,
          }}
        >
          <Pressable
            disabled={finished}
            onPress={() => {
              console.log("asdf clicked spin starting");
              spinTiming.reset();
              // start the spinner
              spinTiming.start(
                ({ finished }) => finished && setIsFinished(true)
              );
              // kick off the mint
              mint(winningIndex);
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                padding: 12,
                backgroundColor: "#081F1F",
                opacity: finished ? 0.6 : 1,
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
                Spin the wheel
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
