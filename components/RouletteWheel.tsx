import { type ReactNode } from "react";
import { View , Text} from "react-native";


export default function RouletteWheel({ panels }: { panels: ReactNode[] }) {
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
