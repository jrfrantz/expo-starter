import { View, Text, Image } from "react-native";
import Button from "./Button";
import useEmbeddedViemClient from "../hooks/useEmbeddedViemClient";
import { parseEther } from "viem";
import { sepolia } from "viem/chains";
import { usePrivy } from "@privy-io/expo";

export default function ImageTile({ index, item } : { index: number, item: { id: number, url: number, img: any }}) {
  const { userAddress, client } = useEmbeddedViemClient()
  
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
      <Button text="Mint one" onClick={async () => {
        console.log("pressed ", index)
        if (client && userAddress) {
          const thing = await client.signMessage({
            account: userAddress,
            message: 'Hey what is up'
          })
          console.log({thing})
          
          const tx = await client.sendTransaction({
            account: userAddress,
            to: "0xC42A0d847d825CC164769Fd577Ee19955eE08C54",
            value: 0n,
            chain: sepolia,
          })
          console.log({tx})
        }
      }} />
    </View>
  );
}
