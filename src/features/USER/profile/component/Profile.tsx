import { Grid, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";

import ModalEditProfile from "./Modal-Edit-Profile";
import ProfileComponentData from "./Profile-Component-View";
import useProfile from "../hooks/useProfile";
import ProfileTransaction from "./Profile-Transaction";

export default function Profile(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transactions } = useProfile();

  return (
    <Grid gridTemplateColumns={{ base: "100&", lg: "55% 45%" }} padding={{ base: "100px 10px", md: "100px 50px" }} h={"100%"} gap={{ base: "50px", md: "0px" }}>
      <ModalEditProfile isOpen={isOpen} onClose={onClose}></ModalEditProfile>
      <HStack>
        <VStack width={"100%"} alignItems={"start"} h={"100%"}>
          <Text color={"brand.whiteColor"} textAlign={"start"} mb={"20px"}>
            <b>My Profile</b>
          </Text>
          <ProfileComponentData onOpen={onOpen}></ProfileComponentData>
        </VStack>
      </HStack>
      <VStack alignItems={"start"} p={"20px"}>
        <Text color={"brand.whiteColor"} textAlign={"start"} mb={"20px"}>
          <b>My Transaction</b>
        </Text>
        <VStack overflow={{ base: "visible", lg: "auto" }} height={{ base: "max-content", lg: "70vh" }} width={"full"}>
          {transactions.length != 0 ? (
            [...transactions].reverse().map((trans) => {
              return <ProfileTransaction transaction={trans}></ProfileTransaction>;
            })
          ) : (
            <Text color={"white"}>nothing trasaction yet ,let's buy Coffe</Text>
          )}
        </VStack>
      </VStack>
    </Grid>
  );
}
