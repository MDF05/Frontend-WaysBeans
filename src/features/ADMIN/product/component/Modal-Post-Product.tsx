import { Box, Button, Flex, FormControl, FormLabel, Grid, Image, Input, Modal, ModalContent, ModalOverlay, Text, Textarea, useColorModeValue, VStack } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

import { Tooltip } from "react-tooltip";
import useModalPostProduct from "../hooks/use-modal-post-product";
import { ComponentModalPops } from "../../../../types/Component-Modal-Types";

export default function ModalPostProduct({ isOpen, onClose }: ComponentModalPops) {
  const { handleSubmit, image, onSubmitProduct, register, reset } = useModalPostProduct();

  return (
    <>
      <Modal blockScrollOnMount={false} size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("gray.300", "gray.900")}>
          <Flex width={"100%"} alignItems={"center"} my={"80px"} direction={"column"}>
            <Flex width={"80%"} justifyContent={"start"} mb={"10px"}>
              <Button
                onClick={() => {
                  onClose();
                  reset();
                }}
                border={"2px solid skyblue"}
                _hover={{ borderColor: "brand.active" }}
                data-tooltip-id="button-back-product"
                data-tooltip-place="right"
                data-tooltip-content="Back"
              >
                <IoMdArrowBack />
              </Button>
              <Box as={Tooltip} id="button-back-product" bgColor={"brand.active !"} />
            </Flex>
            <VStack
              width={"80%"}
              bg={"brand.blur.background"}
              blur={"brand.blur.webkit"}
              border={"brand.blur.border"}
              backdropFilter={"brand.blur.backdrop"}
              gridTemplateColumns={`45% 45%`}
              justifyContent={"space-between"}
              padding={"20px 50px"}
              as={"form"}
              onSubmit={handleSubmit((event) => onSubmitProduct(event))}
            >
              <Text w={"full"} mb={"20px"}>
                <b>Add Product</b>
              </Text>

              <Grid gridTemplateColumns={"50% 50%"} width={"100%"} gap={"30px"}>
                <Box display={"grid"} gap={"10px"}>
                  <FormControl>
                    <Input type="text" placeholder="name" bg={"brand.input"} color={"brand.active"} border={"1px solid"} borderColor={"brand.baseColor"} {...register("name")} />
                  </FormControl>
                  <FormControl>
                    <Textarea
                      placeholder="description"
                      bg={"brand.input"}
                      color={"brand.active"}
                      border={"1px solid"}
                      borderColor={"brand.baseColor"}
                      resize={"none"}
                      {...register("description")}
                    ></Textarea>
                  </FormControl>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="price"
                      bg={"brand.input"}
                      color={"brand.active"}
                      border={"1px solid"}
                      borderColor={"brand.baseColor"}
                      {...register("price")}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="quantity"
                      bg={"brand.input"}
                      color={"brand.active"}
                      border={"1px solid"}
                      borderColor={"brand.baseColor"}
                      {...register("quantity")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel display={"flex"} gap={"10px"} alignItems={"center"}>
                      <Box bg={"brand.input"} width={"max-content"} padding={"10px"} borderRadius={"5px"}>
                        Upload Image
                      </Box>
                    </FormLabel>
                    <Input type="file" hidden {...register("images")} multiple={true} />
                  </FormControl>
                  <Box w={"full"} mt={"40px"}>
                    <Button bg={"brand.default"} color={"brand.whiteColor"} w={"full"} border={"1px solid"} borderColor={"brand.baseColor"} type="submit">
                      add product
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Image src={image ?? ""} w={"90%"} height={"400px"}></Image>
                </Box>
              </Grid>
            </VStack>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
