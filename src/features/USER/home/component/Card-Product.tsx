import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { CardComponentTypes } from "../types/card-type";
import nothingImage from "../../../../assets/image/no-image-gallery.png";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";

export default function CardProduct({ products, onOpen }: CardComponentTypes): React.ReactNode {
  return products.content.map((product, index: number) => {
    return (
      <VStack bg={"brand.bgYoung"} alignItems={"start"} width={"20%"} height={"360px"} boxSizing="content-box" key={index}>
        <ChakraLinkExtendReactRouterLink onClick={onOpen} to={"/"} state={{ product }} width={"100%"} flexDirection={"column"}>
          <Flex width={"100%"}>
            <Image src={product?.images[0]?.imageUrl ?? nothingImage} height={"250px"} width={"100%"}></Image>
          </Flex>
          <VStack px={"10px"} alignItems={"start"} w={"100%"} color={"black"} fontWeight={"bold"} justifyContent={"space-between"}>
            <Text color={"brand.fontProduct"} textTransform={"capitalize"} mt={"10px"} fontWeight={"bold"} fontSize={"large"}>
              <b>{product.name}</b>
            </Text>
            <Flex flexDir={"column"} mt={"10px"}>
              <Text fontWeight={"thin"}>{parseInt(product.price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</Text>
              <Text fontWeight={"thin"}>Stock : {product.quantity}</Text>
            </Flex>
          </VStack>
        </ChakraLinkExtendReactRouterLink>
      </VStack>
    );
  });
}
