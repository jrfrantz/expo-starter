import { ReactNode, useMemo, useRef, useState } from "react";
import { Text, View, Animated, Easing, Image } from "react-native";
import Button from "../components/Button";
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
  const winningIndex = useMemo(
    () => Math.floor(Math.random() * 12),
    [],
  )

  const winningAngle = 360 / stirs.length * winningIndex

  

  const spinValue = useRef(new Animated.Value(0)).current;
  const spinTiming = Animated.timing(spinValue, {
    toValue: 1080,
    duration: 2000,
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
          You won a ... {finished ? `${winningIndex + 1}. The array index is that minus one though` : "spinning"}
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
              padding: 8,
              marginTop: 36,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  rotate: spinValue.interpolate({
                    inputRange: [0, 1080],
                    outputRange: ['0deg', `${1080 + -1*((winningAngle) + 90)}deg`],
                  }),
                },
              ],
            }}
          >
            <RouletteWheel
              panels={stirs.map((stirName) => (
                <View
                  key={stirName}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "flex-end",
                    backgroundColor: "red",
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

function RouletteWheel({ panels }: { panels: ReactNode[] }) {
  const radius = 300;
  return (
    <View
      style={{
        width: 2 * radius,
        height: 2 * radius,
        borderRadius: 99999,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden',
      }}
    >
      {panels.map((s, idx) => {
        return (
          <View
            key={idx}
            style={{
              width: "88%",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              transform: [{ rotateZ: `${(360 / panels.length) * idx}deg` }],
            }}
          >
            <Text
              key={`${s}-${idx}`}
              style={{
                position: "absolute",
                left: "50%",
                //top: '50%',
                width: radius,
                height: 20,
                marginTop: -10,
                textAlign: "center",
                backgroundColor: "gray",
              }}
            >
              {s}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
