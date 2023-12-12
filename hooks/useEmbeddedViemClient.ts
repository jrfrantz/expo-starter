import { isConnected, useEmbeddedWallet } from "@privy-io/expo";
import { useEffect, useState } from "react";
import { WalletClient, createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'


export default function useEmbeddedViemClient() {
  const [client, setClient] = useState<WalletClient | null>(null)
  const [userAddress, setUserAddress] = useState<`0x${string}` | null>(null)
  const wallet = useEmbeddedWallet()

  useEffect(() => {
    async function DesiredEffect() {
      if (isConnected(wallet) && wallet.status === 'connected') {
        await wallet.provider.request({
          method: 'wallet_switchEthereumChain',
          // Replace '0x1' with the chain ID of your desired network
          params: [{ chainId: '11155111' }]
        })
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(wallet.provider),
        })
        const addresses = await walletClient.getAddresses()
        const hoisted = createWalletClient({
          account: addresses[0],
          //chain: sepolia,
          transport: custom(wallet.provider),
        })
        setClient(hoisted)
        setUserAddress(addresses[0])
      }
    }
    DesiredEffect()
  }, [isConnected(wallet)])
  console.log({userAddress})
  return { client, userAddress }
}