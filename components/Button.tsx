import { FC, Ref, forwardRef } from "react";
import { Pressable, View, Text } from "react-native";
type ButtonProps = {
  onClick?: () => any;
  text: string;
};
const Button = forwardRef(({ onClick, text }: ButtonProps, ref : Ref<any>) => (
    <Pressable onPress={onClick} ref={ref}>
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
          {text}
        </Text>
      </View>
    </Pressable>
  ))

export default Button