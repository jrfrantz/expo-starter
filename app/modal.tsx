import { isNotCreated, useEmbeddedWallet, useLoginWithSMS, usePrivy } from '@privy-io/expo'
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import Button from "../components/Button";


export default function Login() {
  const [phoneNum, setPhoneNum] = useState("");
  const [smsCode, setSmsCode] = useState("");

  const { isReady } = usePrivy()
  const wallet = useEmbeddedWallet()

  const sms = useLoginWithSMS();
  const router = useRouter()

  return (
    <View>
      <Text>Log in</Text>
      <TextInput
        style={{ backgroundColor: "orange", marginBottom: 10, height: 50 }}
        onChangeText={setPhoneNum}
        value={phoneNum}
        inputMode="tel"
      />
      <TextInput
        style={{ backgroundColor: "orange", height: 50 }}
        onChangeText={setSmsCode}
        value={smsCode}
        inputMode="numeric"
      />
      <Button
        text="get code"
        onClick={() => {
          sms.sendCode({ phone: phoneNum });
        }}
      />
      <Button
        text="submit code"
        onClick={() => {
          sms.loginWithCode({ code: smsCode })
            .then(user => {
              console.log({user})
              router.back() // dismiss modal
            }).catch(console.error)
        }}
      />
    </View>
  )
}