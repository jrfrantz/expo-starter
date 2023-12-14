import { useLoginWithSMS } from "@privy-io/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import Button from "../components/Button";

export default function Login() {
  const [phoneNum, setPhoneNum] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [formStep, setFormStep] = useState<"enter-phone" | "confirm-pin">(
    "enter-phone"
  );

  const sms = useLoginWithSMS();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {formStep === "enter-phone" && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            paddingBottom: 96,
            marginHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginVertical: 18,
            }}
          >
            Enter your phone number to get started
          </Text>
          <TextInput
            style={{
              backgroundColor: "#F1F2F9",
              marginBottom: 10,
              height: 50,
              borderRadius: 24,
              paddingHorizontal: 24,
            }}
            onChangeText={setPhoneNum}
            value={phoneNum}
            inputMode="tel"
          />
          <Pressable
            onPress={() => {
              sms.sendCode({ phone: phoneNum });
              setFormStep("confirm-pin");
            }}
          >
            <View
              style={{
                width: "100%",
                height: 60,
                borderRadius: 20,
                padding: 12,
                backgroundColor: "#081F1F",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 24,
                }}
              >
                Send code
              </Text>
            </View>
          </Pressable>
        </View>
      )}
      {formStep === "confirm-pin" && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            paddingBottom: 96,
            marginHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginVertical: 18,
            }}
          >
            Confirm the code you were sent
          </Text>
          <TextInput
            style={{
              backgroundColor: "#F1F2F9",
              marginBottom: 10,
              height: 50,
              borderRadius: 24,
              paddingHorizontal: 24,
            }}
            onChangeText={setSmsCode}
            value={smsCode}
            inputMode="numeric"
          />
          <Pressable
            onPress={() => {
              sms
                .loginWithCode({ code: smsCode })
                .then((user) => {
                  console.log({ user });
                  router.back(); // dismiss modal
                })
                .catch(console.error);
            }}
          >
            <View
              style={{
                width: "100%",
                height: 60,
                borderRadius: 20,
                padding: 12,
                backgroundColor: "#081F1F",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 24,
                }}
              >
                Confirm code
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}
