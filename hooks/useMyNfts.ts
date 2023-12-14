import { useEffect, useState } from "react";
import useEmbeddedViemClient from "./useEmbeddedViemClient";
import { parseAbi } from "viem";

export default function useMyNfts() {
  const { userAddress, publicClient } = useEmbeddedViemClient()
  const [contractData, setContractData] = useState<readonly bigint[] | undefined>(undefined)

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

    fetchContractData().then(resp => setContractData(resp))
  }, [userAddress, publicClient])

  return { contractData }
}