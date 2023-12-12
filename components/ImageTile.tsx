import { View, Text, Image } from "react-native";
import Button from "./Button";
import useEmbeddedViemClient from "../hooks/useEmbeddedViemClient";
import { createWalletClient, custom, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { isConnected, useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import useMintNft from "../hooks/useMintNft";

export default function ImageTile({ index, item } : { index: number, item: { id: number, url: number, img: any }}) {
  const { userAddress, client } = useEmbeddedViemClient()
  const rawPrivyWallet = useEmbeddedWallet()
  const {txHash, mint, isLoading, error} = useMintNft(item.id)

  console.log({txHash, isLoading, error})
  return (
    <View
      style={[{
        backgroundColor: "gray",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
      },]}
    >
      <Text style={{ color: "white" }}>
        {/* You own {item.wagmiResp?.result?.toString()} of token {item.id} */}
      </Text>
      <Image
        source={item.img}
        resizeMode="contain"
        style={{ width: "100%", height: 100 }}
      />
    </View>
  );
}
