import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react"
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses"
import { Box, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";

export default function AdminWidthdrawBalance() {
  
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const {
    data: contractBalance,
    isLoading: isLoadingContractBalance
  } = useContractRead(contract, "getBalance")

  return (
    <Stack spacing={4}>
      <Box>
        <Text fontSize={"xl"} fontWeight={"bold"}>Contract Balance:</Text>
        {!isLoadingContractBalance && (
            <Text>{ethers.utils.formatEther(contractBalance)} MATIC</Text>
        )}
      </Box>

      <Web3Button
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={(contract) => contract.call(
            "withdrawBalance"
        )}
      >
        Withdraw Balance
      </Web3Button>
    </Stack>
  )
}