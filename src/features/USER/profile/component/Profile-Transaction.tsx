import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import noImage from "../../../../assets/image/no-image-gallery.png";
import { ProfileTransactionTypes } from "../types/profile-transaction-types";
import detailDatePost from "../../../../utils/detail-date-post";

export default function ProfileTransaction({ transaction }: ProfileTransactionTypes): React.ReactNode {
  const item = transaction?.countItem ?? 0;
  const price = Number(transaction?.product?.price).toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  const subTotal = (item * Number(transaction?.product?.price)).toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <HStack width={"100%"} display={"flex"} justify={"space-between"} bg={"brand.bgYoung"} p={"10px 10px 10px 10px"} color={"white"} rounded={"10px"} alignItems={"center"}>
      <HStack gap={"15px"} w={"100%"} display={"flex"} flexDirection={{ base: "column", md: "row" }}>
        <Image src={transaction?.product?.images[0]?.imageUrl ?? noImage} width={{ base: "100%", md: "300px" }} height={{ base: "70vw", md: "200px" }}></Image>
        <VStack w={"full"}>
          <Box w={"full"}>
            <Text color={"brand.active"} textTransform={"capitalize"}>
              {transaction?.product?.name}
            </Text>
            <Text color={"brand.active"}>{detailDatePost(`${transaction?.product?.createdAt}`)}</Text>
            <Text color={"brand.darkColor"}>Price : {price} </Text>
            <Text color={"brand.darkColor"}>Qty : {item}</Text>
            <Box mt={"20px"}>
              <Text>
                {item} x {price}
              </Text>
              <Text fontWeight={"bold"}>Sub Total : {subTotal} </Text>
            </Box>
          </Box>
        </VStack>
      </HStack>
    </HStack>
  );
}
