import { ThirdwebNftMedia, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react"
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses"
import { Box, Card, Heading, Stack, Text } from "@chakra-ui/react"

export default function PrizeNFT() {
  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS)

  const {
    data: prizeNFTContractAddress
  } = useContractRead(raffleContract, "nftAddress")

  const {
    data: prizeNFTTokenId
  } = useContractRead(raffleContract, "nftId")

  const { contract: prizeNFTContract } = useContract(prizeNFTContractAddress)

  const {
    data: prizeNFTContractMetadata,
    isLoading: isLoadingPrizeNFTContractMetadata
  } = useContractMetadata(prizeNFTContract);

  const {
    data: nft,
    isLoading: isLoadingNFT
  } = useNFT(prizeNFTContract, prizeNFTTokenId)

  return (
    <Card p={"5%"}>
      <Heading>Prize NFT</Heading>

      {!isLoadingPrizeNFTContractMetadata && !isLoadingNFT && (
        <Stack spacing={"20%"} textAlign={"center"}>
          <Box>
            <ThirdwebNftMedia 
              metadata={nft?.metadata!}
              height="85%"
              width="85%"
            />
          </Box>
          <Box>
            <Text fontWeight={"bold"} fontSize={"2xl"}>{prizeNFTContractMetadata.name}</Text>
            <Text fontWeight={"bold"}>{nft?.metadata.name}</Text>
          </Box>
        </Stack>
      )}

    </Card>
  )
}