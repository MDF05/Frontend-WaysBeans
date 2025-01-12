import { Box, Button, Flex, Grid, Image, Modal, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import noImage from "../../../../assets/image/no-image-gallery.png";
import { IoMdArrowBack } from "react-icons/io";

interface ModalDetailProduct {
  isOpen: boolean;
  onClose: () => void;
}

import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { ProductSchema } from "../../../../schemas/product-schema";
import { ImageDTO } from "../../../../DTO/image-DTO";
import ButtonAddCart from "./Button-Add-Cart";
import { ProductDTO } from "../../../../DTO/product-DTO";
import ButtonCheckout from "./Button-Checkout";
import { useAppSelector } from "../../../../stores/stores";

export default function ModalDetailProduct({ isOpen, onClose }: ModalDetailProduct) {
  const { state } = useLocation();
  const { product }: { product: ProductDTO } = state ?? ({} as ProductSchema);
  const stateUser = useAppSelector((state) => state.auth);

  if (!product) onClose();

  return (
    <>
      <Modal blockScrollOnMount={false} size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#1A202C"}>
          <Flex width={"100%"} alignItems={"center"} my={"80px"} direction={"column"}>
            <Flex width={{ base: "95%", lg: "80%" }} justifyContent={"start"} mb={"10px"}>
              <Button
                onClick={onClose}
                border={"2px solid skyblue"}
                _hover={{ borderColor: "brand.default" }}
                data-tooltip-id="button-back-product"
                data-tooltip-place="right"
                data-tooltip-content="Back"
                color={"brand.bgYoung"}
              >
                <IoMdArrowBack />
              </Button>
              <Box as={Tooltip} id="button-back-product" bgColor={"brand.active !"} />
            </Flex>
            <Grid
              width={{ base: "100%", lg: "80%" }}
              bg={"brand.blur.background"}
              blur={"brand.blur.webkit"}
              border={"brand.blur.border"}
              backdropFilter={"brand.blur.backdrop"}
              gridTemplateColumns={{ base: "100%", lg: `45% 45%` }}
              justifyContent={"space-between"}
              padding={{ base: "20px 20px", md: "20px 50px" }}
              gap={{ base: "40px", md: "0px" }}
            >
              <Flex>
                <Box as={AwesomeSlider} width={"100%"} height={{ base: "50vh", md: "70vh", lg: "70vh" }}>
                  {product?.images?.map((image: ImageDTO, index: number) => {
                    return <Image data-src={image?.imageUrl ?? noImage} width={"100%"} key={index}></Image>;
                  })}
                </Box>
              </Flex>
              <VStack alignItems={"start"} textAlign={"justify"} justifyContent={"space-between"}>
                <Box>
                  <Text color={"brand.bgYoung"} fontSize={"2rem"}>
                    {product?.name}
                  </Text>
                  <Text color={"brand.bgYoung"}>Stock : {product?.quantity}</Text>
                  <Text mt={"20px"} color={"brand.bgYoung"}>{`${product?.description}`}</Text>
                </Box>

                <Text color={"brand.bgYoung"} textAlign={"end"} width={"100%"} my={"20px"}>
                  <b>{parseInt(product?.price).toLocaleString("ID-id", { style: "currency", currency: "IDR" })}</b>
                </Text>
                <Flex flexDirection={"column"} w={"full"} gap={"10px"}>
                  {stateUser.user?.role != "ADMIN" && (
                    <>
                      <ButtonCheckout onClose={onClose}></ButtonCheckout>
                      <ButtonAddCart productId={`${product?.id}`} />
                    </>
                  )}
                </Flex>
              </VStack>
            </Grid>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
