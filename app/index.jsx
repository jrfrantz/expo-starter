import { Image, SafeAreaView, Text, View } from "react-native";
import { isNotCreated, useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import ImagesGrid from "../components/ImagesGrid";
import { LinearGradient } from "expo-linear-gradient";
export default function Page() {
  const { user, isReady } = usePrivy();
  const wallet = useEmbeddedWallet();
  const router = useRouter();
  console.log("page");

  useEffect(() => {
    console.log({ user, isReady });
    if (!user & isReady) {
      router.push("/modal");
    }
  }, [user, isReady]);

  useEffect(() => {
    if (isReady && user && isNotCreated(wallet)) {
      console.log("creating");
      wallet.create();
    }
  }, [user, wallet, isReady]);

  return (
    <SafeAreaView>
      <View
        style={{  height: "100%", width: "100%" }}
      >
        <LinearGradient 
          style={{
            height: '100%', 
            width: '100%', 
            paddingTop: 18,
          }} 
          colors={["#937DE530", "#50E2C830"]}
          start={{ x: .07, y: 0 }}
        >
          <ImagesGrid />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
