import { View, Text, Image } from "react-native";
import Button from "./Button";
import useEmbeddedViemClient from "../hooks/useEmbeddedViemClient";
import { createWalletClient, custom, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { isConnected, useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import useMintNft from "../hooks/useMintNft";

export default function ImageTile({ index, item, ownershipCount } : { index: number, item: { id: number, url: number, img: any, title: string, }, ownershipCount: number | undefined}) {
  const { userAddress, client } = useEmbeddedViemClient()
  const rawPrivyWallet = useEmbeddedWallet()

  return (
    <View
      style={[{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        marginBottom: 15,
        overflow: 'hidden',
      },]}
    >
      <Image
        source={item.img}
        resizeMode="cover"
        style={{ 
          width: 100, 
          height: 100,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      />
      <Text>{item.title}</Text>
    </View>
  );
}
