import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { Box, Button, Container, Flex, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { HERO_IMAGE_URL, RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import RaffleStatus from "../components/raffleStatus";
import { useState } from "react";

const Home: NextPage = () => {

  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS)
  const address = useAddress()

  const {
    data: entryCost,
    isLoading: isLoadingEntryCost
  } = useContractRead(contract, "entryCost")

  const entryCostInEther = entryCost ? ethers.utils.formatEther(entryCost) : "0";

  const {
    data: raffleStatus
  } = useContractRead(contract, "raffleStatus")

  const {
    data: totalEntries,
    isLoading: isLoadingTotalEntries
  } = useContractRead(contract, "totalEntries")

  const [entryAmount, setEntryAmount] = useState(0)
  const entryCostOnSubmit = parseFloat(entryCostInEther) * entryAmount

  function increaseAmount() {
    setEntryAmount(entryAmount + 1);
    console.log(entryAmount)
  }

  function decreaseAmount() {
    if (entryAmount > 0) {
      setEntryAmount(entryAmount - 1);
    }
  }

  return (
    <Container maxW={"1440px"} py={8}>
      <SimpleGrid columns={2} spacing={10} minH={"60vh"}>
        <Flex>
          <MediaRenderer
            src={HERO_IMAGE_URL}
            width="100%"
            height="100%"
          />
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} p={"5%"}>
          <Stack spacing={10}>
            <Box>
              <Text fontSize={"xl"}>Raffle App</Text>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                Buy a ticket to win the NFT prize!
              </Text>
            </Box>
            <Text fontSize={"xl"}>Buy entries for a chance to win the NFT! Winner will be selected and transferred the NFT. The more entries the higher chance you have of winning the prize.</Text>
          
            <RaffleStatus raffleStatus={raffleStatus }/>

            {!isLoadingEntryCost && (
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Cost per Entry: {entryCostInEther} MATIC
              </Text>
            )}

            {address ? (
              <Flex flexDirection={"row"} alignItems={"center"}>
                <Flex flexDirection={"row"} w={"25%"} mr={"40px"}>
                  <Button onClick={decreaseAmount}>-</Button>
                  <Input
                    type={"number"}
                    value={entryAmount}
                    onChange={(e) => setEntryAmount(parseInt(e.target.value))}
                    mx={2}
                    textColor={"black.200"}
                  />
                  <Input
                    type={"number"}
                    onChange={(e) => setEntryAmount(parseInt(e.target.value))}
                    textAlign={"center"}
                    mx={2}
                  />
                  {/* <input 
                    type="number"
                    value={entryAmount}
                    onChange={(e) => setEntryAmount(parseInt(e.target.value))}
                  /> */}
                  <Button onClick={increaseAmount}>+</Button>
                </Flex>
                <Web3Button
                   contractAddress={RAFFLE_CONTRACT_ADDRESS} 
                   action={(contract) => contract.call(
                    "buyEntry",
                    [
                      entryAmount
                    ],
                    {
                      value: ethers.utils.parseEther(entryCostOnSubmit.toString())
                    }
                  )}
                >
                  {`Buy Ticket(s)`}
                </Web3Button>
              </Flex>
            ) : (
              <Text fontSize={"xl "}>Connect your wallet to buy entries!</Text>
            )}

            {!isLoadingTotalEntries && (
              <Text>Total Entries: {totalEntries.toString()}</Text>
            )}
          </Stack>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
