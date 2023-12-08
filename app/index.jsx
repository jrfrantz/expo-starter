import { Image, Text, View } from "react-native";
import { usePrivy } from "@privy-io/expo";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import ImagesGrid from "../components/ImagesGrid";
export default function Page() {
  const { user, isReady } = usePrivy();
  const router = useRouter();
  console.log("page");

  useEffect(() => {
    console.log({ user, isReady });
    if (!user & isReady) {
      router.push('/modal')
    }
  }, [user, isReady]);


  return (
    <View style={{ backgroundColor: "orange", height: "100%", width: "100%" }}>
      <Text>asdf</Text>
      <ImagesGrid />
      
    </View>
  );
}
