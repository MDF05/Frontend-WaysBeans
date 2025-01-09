import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalContent, ModalOverlay, Text, Textarea, VStack } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

import { Tooltip } from "react-tooltip";
import { useForm } from "react-hook-form";
import { productSchema, ProductSchema } from "../../../../schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../stores/stores";
import { PutProductAsync } from "../../../../stores/product/async-product";
import { ComponentModalPops } from "../../../../types/Component-Modal-Types";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ModalEditProduct({ isOpen, onClose }: ComponentModalPops) {
  const { register, handleSubmit, setValue } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) });

  const { state: stateProduct } = useLocation();

  useEffect(() => {
    setValue("name", stateProduct?.product.name);
    setValue("description", stateProduct?.product.description);
    setValue("price", stateProduct?.product.price);
    setValue("quantity", stateProduct?.product.quantity);
  }, [stateProduct?.product]);

  const dispatch = useAppDispatch();

  async function onSubmitProduct(event: ProductSchema) {
    try {
      const formData = new FormData();
      formData.append("name", event.name);
      formData.append("price", event.price);
      formData.append("description", event.description);
      formData.append("quantity", event.quantity);

      if (event.images.length !== 0) {
        for (const i of event.images) {
          formData.append("image", i);
        }
      }

      await dispatch(PutProductAsync({ formData, productId: stateProduct.product.id })).unwrap();
    } catch (err) {
      return err;
    }
  }

  return (
    <>
      <Modal blockScrollOnMount={false} size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"brand.darkTheme"} color={"white"}>
          <Flex width={"100%"} alignItems={"center"} my={"80px"} direction={"column"}>
            <Flex width={"80%"} justifyContent={"start"} mb={"10px"}>
              <Button
                onClick={onClose}
                border={"2px solid skyblue"}
                _hover={{ borderColor: "brand.active" }}
                data-tooltip-id="button-back-product"
                data-tooltip-place="right"
                data-tooltip-content="Back"
              >
                <IoMdArrowBack />
              </Button>
              <Box as={Tooltip} id="button-back-product" bgColor={"brand.active!"} />
            </Flex>
            <VStack
              width={"80%"}
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
                <b>edit Product</b>
              </Text>

              <FormControl>
                <FormLabel display={"flex"} gap={"10px"} alignItems={"center"}>
                  <Box bg={"brand.default"} width={"max-content"} padding={"10px"} borderRadius={"5px"}>
                    Upload Image
                  </Box>
                  {/* <Text as="a" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFRkIBHWK24Vjrw7a8q7NAsy8p8uZKKHEZQ&s">
                    Mouse.jpg
                  </Text> */}
                </FormLabel>
                <Input type="file" hidden {...register("images")} multiple={true} />
              </FormControl>
              <FormControl>
                <Input type="text" placeholder="name" bg={"brand.default"} color={"white"} border={"1px solid"} borderColor={"white"} {...register("name")} />
              </FormControl>
              <FormControl>
                <Textarea
                  placeholder="description"
                  bg={"brand.default"}
                  color={"white"}
                  border={"1px solid"}
                  borderColor={"white"}
                  resize={"none"}
                  {...register("description")}
                ></Textarea>
              </FormControl>
              <FormControl>
                <Input type="number" placeholder="price" bg={"brand.default"} color={"white"} border={"1px solid"} borderColor={"white"} {...register("price")} />
              </FormControl>
              <FormControl>
                <Input type="number" placeholder="quantity" bg={"brand.default"} color={"white"} border={"1px solid"} borderColor={"white"} {...register("quantity")} />
              </FormControl>

              <Box w={"full"} mt={"40px"}>
                <Button bg={"brand.succes"} w={"full"} border={"1px solid"} borderColor={"white"} type="submit">
                  update
                </Button>
              </Box>
            </VStack>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
