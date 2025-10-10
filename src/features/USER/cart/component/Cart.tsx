import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CartProps } from "../types/cart-types";
import detailDatePost from "../../../../utils/detail-date-post";
import noImage from "../../../../assets/image/no-image-gallery.png";
import useCart from "../hooks/use-cart";
import { ButtonChangeItem } from "./Button-Change-Item";

export default function Cart({ cart, products, index, setProducts, initialProduct }: CartProps) {
  const { onChangeCheckedBox, onChangeFieldNumber, onDecreaseItem, onIncreaseItem } = useCart({ products, setProducts });

  return (
    <VStack width={"100%"} display={"flex"} justify={"space-between"} bg={"rgba(244, 228, 188, 0.5)"} p={"10px 10px 10px 10px"} key={index} mb={"20px"} rounded={"10px"} 
      _dark={{bg : "rgba(255,255,255,0.3)", boxShadow : "4px 4px 5px rgba(255,255,255, .5)" }} boxShadow={"2px 2px 5px 2px rgba(0,0,0,.3)"} border={"2px solid grey"}
    >
      <HStack width={"100%"} flexDirection={{ base: "column", md: "row" }} >
        <Image src={cart.product?.images[0]?.imageUrl ?? noImage} width={{ base: "100%", md: "300px" }} height={{ base: "70vw", md: "200px" }}></Image>
        <VStack width={"100%"} alignItems={"start"} ms={"20px"}>
          <Text color={"brand.default"} _dark={{color : "brand.bgYoung"}}  fontSize={"xx-large"} textTransform={"capitalize"} fontWeight={"bold"} w={"full"} display={"flex"} position={"relative"}>
            {cart.product.name}
          </Text>
          <HStack w={"100%"} justifyContent={"space-between"} pe={"30px"}>
            <Box>
              <Text color={"brand.active"}>{detailDatePost(cart.product.createdAt)}</Text>
              <Text color={"brand.darkColor"}>Price : {parseInt(cart.product.price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</Text>
              <Text color={"brand.darkColor"}>stock : {parseInt(cart.product.quantity).toLocaleString("id-ID")}</Text>
            </Box>
            <Box textAlign={"end"}>
            <Checkbox colorScheme="green" size={"lg"} isChecked={products[index].checked} onChange={() => onChangeCheckedBox(cart.product.id)} transform={"scale(2)"}
               sx={{
                "& .chakra-checkbox__control": {
                    boxShadow : "1px 1px 2px black ",
                    borderColor: "red",
      
                  _checked: {
                    bg: "#166534", // hijau tua (setara dengan tailwind's green-800)
                    borderColor: "#166534",
                    _hover: {
                      bg: "#14532d", // sedikit lebih gelap saat hover
                      borderColor: "#14532d",
                    },
                  },
                  _hover: {
                    borderColor: "#166534",
                  },
                },
              }}
              
              ></Checkbox>
            </Box>
          </HStack>
          <Flex width={"100%"} mt={"20px"} gap={"10px"} justifyContent={"space-between"}>
            <Flex gap={"10px"} alignItems={"end"}>
              <FormControl color={"green"} _dark={{color : "lightGreen"}}>
                <FormLabel color="brand.default" _dark={{color : "white"}}>Quantity</FormLabel>
                <NumberInput max={Number(products[index].product.quantity)} min={1} w={"100px"} value={products[index].countItem} borderColor={"brand.default"} _dark={{borderColor : "brand.latte"}}>
                  <NumberInputField onChange={(event) => onChangeFieldNumber(event, index)} />
                  <NumberInputStepper>
                    <NumberIncrementStepper color={"lightgreen"} onClick={() => onIncreaseItem(index)} />
                    <NumberDecrementStepper
                      color={"red"}
                      onClick={() => {
                        onDecreaseItem(index);
                      }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <ButtonChangeItem cartId={cart.id} countItem={products[index].countItem} initialCountItem={initialProduct[index].countItem}></ButtonChangeItem>
            </Flex>
            <Box mt={"20px"} w={"100%"} justifyItems={"end"}>
              <Box>
                <Text fontWeight={"bold"}>
                  total : {cart.countItem.toLocaleString("id-ID")} X {parseInt(cart.product.price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                </Text>
                <Text fontWeight={"bold"}>Sub Total : {(+cart.product.price * cart.countItem).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</Text>
              </Box>
            </Box>
          </Flex>
        </VStack>
      </HStack>
    </VStack>
  );
}
