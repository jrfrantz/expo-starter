import Fontisto from "@expo/vector-icons/Fontisto";
import { FontAwesome5 } from "@expo/vector-icons";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Animated, Easing, Image, Pressable } from "react-native";
import Button from "../components/Button";
import RouletteWheel from "../components/RouletteWheel";
import { images } from "../components/ImagesGrid";
import useMintNft from "../hooks/useMintNft";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
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
    easing: Easing.exp,
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
              backgroundColor: "white",
              width: "75%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignContent: "center",
              transform: [
                { scale: revealItemSizeValue },
                {
                  translateY: revealItemSizeValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50],
                  }),
                },
              ],
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 12,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              You won a ...{" "}
              {finished
                ? `${
                    winningIndex + 1
                  }. The array index is that minus one though`
                : "spinning"}
            </Text>
            <Image
              source={images[winningIndex]?.img ?? ""}
              resizeMode="contain"
              style={{
                height: 200,
                width: 200,
                alignSelf: "center",
              }}
            />
          </Animated.View>
          <View
            style={{
              overflow: "hidden",
              position: "absolute",
              top: "40%",
            }}
          >
            <Animated.View
              style={{
                height: 100,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                top: 70,
                zIndex: 100,
                transform: [
                  {
                    rotate: Animated.modulo(
                      spinValue,
                      360 / stirs.length
                    ).interpolate({
                      inputRange: [0, 360 / stirs.length],
                      outputRange: ["0deg", "20deg"],
                    }),
                  },
                ],
              }}
            >
              <FontAwesome5 name="map-marker" size={72} color="red" />
            </Animated.View>
            <Animated.View
              style={{
                padding: 8,
                marginTop: 36,
                width: "auto",
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    rotate: spinValue.interpolate({
                      inputRange: [0, 1080],
                      outputRange: [
                        "0deg",
                        `${1080 + -1 * (winningAngle + 90)}deg`,
                      ],
                    }),
                  },
                ],
              }}
            >
              <RouletteWheel
                panels={stirs.map((stirName, idx) => {
                  return (
                    <View
                      key={stirName}
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "flex-end",
                        backgroundColor: ["red", "green", "blue"].at(idx % 3),
                      }}
                    >
                      <Text>{stirName} asdf</Text>
                      <Image
                        source={images[idx]?.img ?? ""}
                        resizeMode="contain"
                        style={{ height: 100, width: 100 }}
                      />
                    </View>
                  );
                })}
              />
            </Animated.View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            console.log("asdf clicked spin starting");
            spinTiming.reset();
            // start the spinner
            spinTiming.start(({ finished }) => finished && setIsFinished(true));
            // kick off the mint
            mint(winningIndex);
          }}
        >
          <View
            style={{
              backgroundColor: "blue",
              margin: 4,
              padding: 14,
              borderRadius: 10,
              opacity: 0.8,
              marginBottom: insets.bottom,
              shadowColor: "#171717",
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
            }}
          >
            <Text style={{ color: "white" }}>Asdf</Text>
          </View>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
