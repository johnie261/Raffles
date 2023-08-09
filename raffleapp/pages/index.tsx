import { ConnectWallet, MediaRenderer } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { HERO_IMAGE_URL } from "../const/addresses";

const Home: NextPage = () => {
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
        <Flex></Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
