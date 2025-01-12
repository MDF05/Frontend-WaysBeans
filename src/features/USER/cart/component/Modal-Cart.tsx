import { Box, Button, Flex, Grid, Modal, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

import { Tooltip } from "react-tooltip";
import { ComponentModalPops } from "../../../../types/Component-Modal-Types";
import IconBadgeCart from "./Icon-Badge-Cart";
import ListCartUser from "./List-Cart-User";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { GetCartAsync } from "../../../../stores/cart/async-cart";

export default function CartModal({ isOpen, onClose }: ComponentModalPops) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  if (state?.user?.id) dispatch(GetCartAsync());

  return (
    <>
      <Modal blockScrollOnMount={false} size={"full"} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg={"brand.darkTheme"} color={"white"}>
          <Flex width={"100%"} alignItems={"left"} my={"80px"} direction={"column"}>
            <Flex width={"80%"} gap={"20px"} ps={"10px"} pb={{ base: "20px", md: "0px" }}>
              <Button
                onClick={onClose}
                border={"2px solid skyblue"}
                _hover={{ borderColor: "brand.active" }}
                data-tooltip-id="button-back-product"
                data-tooltip-place="right"
                data-tooltip-content="Back"
                color={"brand.default"}
              >
                <IoMdArrowBack />
              </Button>
              <Text w={"full"} display={{ base: "none", md: "flex" }} alignItems={"center"} gap={"10px"} height={"100%"}>
                <b>Your Cart</b>
                <IconBadgeCart bg="white"></IconBadgeCart>
              </Text>
              <Box as={Tooltip} id="button-back-product" bgColor={"brand.active !"} />
            </Flex>
            <VStack
              width={{ base: "100%", lg: "80%" }}
              bg={"brand.blur.background"}
              blur={"brand.blur.webkit"}
              border={"brand.blur.border"}
              backdropFilter={"brand.blur.backdrop"}
              justifyContent={"space-between"}
              padding={{ base: "0px 10px", md: "20px 50px" }}
              h={"100%"}
            >
              <Grid w={"100%"} overflowY={"scroll"} h={"calc(100vh - 100px)"}>
                <ListCartUser onClose={onClose}></ListCartUser>
              </Grid>
            </VStack>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
