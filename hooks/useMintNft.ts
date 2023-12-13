import { useMutation } from "@tanstack/react-query";
import useEmbeddedViemClient from "./useEmbeddedViemClient";
import { useState } from "react";


const BASE_URL = 'https://turbo-echo-web.vercel.app/'

export default function useMintNft() {
  const [txHash, setTxHash] = useState(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { userAddress } = useEmbeddedViemClient()

  async function mint(tokenId: number) {
    setError(false)
    setIsLoading(true)
    try { 
      const response = await fetch(`${BASE_URL}/api/${tokenId}/mint/${userAddress}`)
      if (!response.ok) {
        setError(true)
        throw new Error('Network failure')
      }
      const data = await response.json()
      setTxHash(data.txHash)
    } finally {
      setIsLoading(false)
    }
  }
  return { txHash, isLoading, error, mint }
}