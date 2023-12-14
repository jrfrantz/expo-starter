import { useEffect, useState } from "react";
import useEmbeddedViemClient from "./useEmbeddedViemClient";
import { parseAbi } from "viem";
import { usePathname, useRouter } from "expo-router";

export default function useMyNfts() {
  const { userAddress, publicClient } = useEmbeddedViemClient()
  const [contractData, setContractData] = useState<readonly bigint[] | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {

    async function fetchContractData() {
      if (!userAddress || !publicClient) return;

      const data = await publicClient.readContract({
        address: '0x5198ee1a0a0fead1fe4fcb65d0afdd8202b28210' as const,
        abi: parseAbi([
          'function balanceOfBatch(address[] memory accounts,uint256[] memory ids) public view returns (uint256[] memory)']),
        functionName: 'balanceOfBatch',
        args: [new Array(12).fill(userAddress), new Array(12).fill("").map((_, idx) => BigInt(idx))]
      })
      return data;
    }

    const intervalId = setInterval(() => {
      fetchContractData().then(resp => setContractData(resp))
    }, 1000 * 6)
    return () => clearInterval(intervalId);
  }, [userAddress, publicClient, pathname])

  return { contractData }
}