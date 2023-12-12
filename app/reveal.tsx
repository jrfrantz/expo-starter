import Fontisto from "@expo/vector-icons/Fontisto";
import { FontAwesome5 } from '@expo/vector-icons';
import { ReactNode, useMemo, useRef, useState } from "react";
import { Text, View, Animated, Easing, Image } from "react-native";
import Button from "../components/Button";
import RouletteWheel from "../components/RouletteWheel";
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
  const [finished, setIsFinished] = useState(false);
  const winningIndex = useMemo(() => Math.floor(Math.random() * 12), []);

  const winningAngle = (360 / stirs.length) * winningIndex;

  const spinValue = useRef(new Animated.Value(0)).current;
  const spinTiming = Animated.timing(spinValue, {
    toValue: 1080,
    duration: 2000,
    easing: Easing.out(Easing.circle),
    useNativeDriver: true,
  });
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <View
        style={{
          backgroundColor: "orange",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>
          You won a ...{" "}
          {finished
            ? `${winningIndex + 1}. The array index is that minus one though`
            : "spinning"}
        </Text>
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
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              top: 70,
              zIndex: 100,
              transform: [
                {
                  rotate: Animated.modulo(spinValue, 360 / stirs.length).interpolate({
                    inputRange: [0, 360/stirs.length],
                    outputRange: ["0deg", "20deg"],
                  }),
                }
              ]
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
              panels={stirs.map((stirName, idx) => (
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
                    source={require("../assets/synthwave/synthwave_image-0.png")}
                    resizeMode="contain"
                    style={{ height: 100, width: 100 }}
                  />
                </View>
              ))}
            />
          </Animated.View>
        </View>
      </View>
      <Button
        text="asdf"
        onClick={() => {
          console.log("asdf clicked spin starting");
          spinTiming.reset();
          spinTiming.start(({ finished }) => finished && setIsFinished(true));
        }}
      />
    </View>
  );
}
