import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import { images } from "./ImagesGrid";
const rouletteWheel = require("../assets/lottery.png");
export default function DemoRouletteWheel() {
  const radius = 400;
  const imageLength = radius / 4;
  const numImages = 12;
  const paddingTop = 16;
  return (
    <View
      style={{
        flex: 1,
        height: 2 * radius,
      }}
    >
      <ImageBackground
        source={rouletteWheel}
        style={{
          width: 2 * radius,
          height: 2 * radius,
        }}
      >
        {new Array(12).fill("").map((_, idx) => (
          <Image
            key={idx}
            source={images[idx]?.img ?? ""}
            style={{
              width: imageLength,
              height: imageLength,
              position: "absolute",
              borderRadius: 20,
              overflow: 'hidden',
              // center it
              top: radius - imageLength / 2,
              left: radius - imageLength / 2,
              transform: [
                { rotateZ: `${(360 / numImages) * idx}deg` },
                { translateY: -1 * (radius - imageLength - paddingTop) },
              ],
            }}
          />
        ))}
      </ImageBackground>
    </View>
  );
}
