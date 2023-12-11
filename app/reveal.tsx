import { ReactNode, useRef } from "react";
import { Text, View, Animated, Easing, Image } from "react-native";
import Button from "../components/Button";

export default function Reveal() {
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

  const spinValue = useRef(new Animated.Value(0)).current;
  const spinTiming = Animated.timing(spinValue, {
    toValue: 1080,
    duration: 2000,
    useNativeDriver: true,
  });
  return (
    <>
      <Animated.View
        style={{
          padding: 8,
          width: "auto",
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1080],
                outputRange: ["0deg", "1080deg"],
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
                width: '100%',
                justifyContent: 'flex-end',
                backgroundColor: 'red',
              }}
            >
              {/* <Text>{stirName} asdf</Text> */}
              <Image
                source={require("../assets/synthwave/synthwave_image-0.png")}
                resizeMode="contain"
                style={{ height: 40, width: 20 ,}}
              />
            </View>
          ))}
        />
      </Animated.View>
      <Button
        text="asdf"
        onClick={() => {
          console.log("asdf clicked spin starting");
          spinTiming.reset();
          spinTiming.start();
        }}
      />
    </>
  );
}

function RouletteWheel({ panels }: { panels: ReactNode[] }) {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderRadius: 99999, //100?
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
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
                width: 100,
                height: 20,
                zIndex: -10,
                marginTop: -10,
                textAlign: "center",
                backgroundColor: "gray",
                //transform: [{ rotateZ: `${(360 / panels.length) * idx}deg` }],
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
