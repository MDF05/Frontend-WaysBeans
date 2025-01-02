import { Grid, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";

import ModalEditProfile from "./Modal-Edit-Profile";
import ProfileComponentData from "./Profile-Component-View";
import useProfile from "../hooks/useProfile";
import ProfileTransaction from "./Profile-Transaction";

export default function Profile(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transactions } = useProfile();

  return (
    <Grid gridTemplateColumns={"55% 45%"} padding={"100px 50px"}>
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
        {transactions.length != 0 ? (
          transactions.map((trans) => {
            return <ProfileTransaction transaction={trans}></ProfileTransaction>;
          })
        ) : (
          <Text color={"white"}>nothing trasaction yet ,let's buy Coffe</Text>
        )}
      </VStack>
    </Grid>
  );
}
