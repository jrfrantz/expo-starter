import { Image, SafeAreaView, Text, View } from "react-native";
import { isNotCreated, useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import ImagesGrid from "../components/ImagesGrid";
export default function Page() {
  const { user, isReady } = usePrivy();
  const wallet = useEmbeddedWallet()
  const router = useRouter();
  console.log("page");

  useEffect(() => {
    console.log({ user, isReady });
    if (!user & isReady) {
      router.push('/modal')
    }
  }, [user, isReady]);

  useEffect(() => {
    if (isReady && user && isNotCreated(wallet)) {
      console.log("creating");
      wallet.create()
    }
  }, [user, wallet, isReady])

  return (
    <SafeAreaView>
    <View style={{ backgroundColor: "orange", height: "100%", width: "100%" }}>
      <Text>asdf</Text>
      <ImagesGrid />
      
    </View>
    </SafeAreaView>
  );
}
