import { Button, Grid, Image, Text, VStack } from "@chakra-ui/react";
import profileImage from "../../../../assets/image/profile.png";
import useProfileComponentData from "../hooks/use-profile-component-data";
import { ProfileComponentDataTypes } from "../types/profile-component-data-types";

export default function ProfileComponentData({ onOpen }: ProfileComponentDataTypes) {
  const { state } = useProfileComponentData();

  return (
    <Grid gap={"20px"} width={"100%"} h={"100%"} templateColumns={"50% 50%"}>
      <Grid width={"100%"} h={"100%"}>
        <Image src={state?.profile?.content?.profile?.imageUrl ?? profileImage} width={"100%"} h={"100%"}></Image>
      </Grid>
      <Grid h={"100%"} alignContent={"space-between"} w={"100%"} p={"20px"}>
        <VStack alignItems={"start"} color={"brand.bgYoung"}>
          <VStack alignItems={"start"}>
            <Text>Name</Text>
            <Text color={"white"}>{state?.profile?.content?.profile?.name}</Text>
          </VStack>
          <VStack alignItems={"start"}>
            <Text>Email</Text>
            <Text color={"white"}>{state?.profile?.content?.profile?.user?.email}</Text>
          </VStack>
          <VStack alignItems={"start"}>
            <Text>Phone</Text>
            <Text color={"white"}>{state?.profile?.content?.profile?.phone}</Text>
          </VStack>
          <VStack alignItems={"start"}>
            <Text>Gender</Text>
            <Text color={"white"}>{state?.profile?.content?.profile?.gender}</Text>
          </VStack>
          <VStack alignItems={"start"} height={"120px"} overflow={"auto"}>
            <Text>Address</Text>
            <Text color={"white"}>{state?.profile?.content?.profile?.address}</Text>
          </VStack>
        </VStack>
        <Button onClick={onOpen}>edit profile</Button>
      </Grid>
    </Grid>
  );
}
