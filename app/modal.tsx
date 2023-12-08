import { useLoginWithSMS } from '@privy-io/expo'
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import Button from "../components/Button";


export default function Login() {
  const [phoneNum, setPhoneNum] = useState("");
  const [smsCode, setSmsCode] = useState("");

  const sms = useLoginWithSMS();
  const router = useRouter()

  useEffect( () => {
    if (sms.state.status === 'done') {
      router.replace('/')
    }
  }, [sms.state.status])
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