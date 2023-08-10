import { Card, Container, Divider, Flex, Heading } from "@chakra-ui/react"
import AdminRaffleStatus from "../components/adminRaffleStatus"
import AdminEntryCost from "../components/adminEntryCost"
import AdminWidthdrawBalance from "../components/withdrawBalance"

export default function Admin() {
  return (
    <Container maxW={"1440px"} py={8}>
      <Heading>Admin</Heading>
      <Flex flexDirection={"row"}>
        <AdminRaffleStatus />
        <Card p={4} mt={4} mr={10} w={"25%"}>
          <AdminEntryCost />
          <Divider mt={4} />
          <AdminWidthdrawBalance />
        </Card>
      </Flex>
    </Container>
  )
}