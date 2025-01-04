import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { cartCheckedDTO } from "../../../../DTO/cart-DTO";
import ButtonMultipleCheckout from "./../../home/component/Button-Multiple-Checkout";

export default function ModalCheckout({ products, onClose }: { products: cartCheckedDTO[]; onClose?: () => void }) {
  const totalPrice = products.reduce((acc, cur) => acc + cur.countItem * parseInt(cur.product.price), 0);

  return (
    <Flex
      position={"fixed"}
      width={"250px"}
      h={{ lg: "calc(100% - 100px)" }}
      bg={"brand.navbar"}
      right={{ base: "10px", md: "30px" }}
      bottom={{ base: "20px", md: "40px", lg: "0" }}
      px={"10px"}
      py={"10px"}
      flexDir={"column"}
      alignItems={"end"}
      justifyContent={"space-between"}
      gap={"20px"}
      color={"brand.default"}
      zIndex={10000000}
      rounded={"10px"}
    >
      <Box w={"full"}>
        <VStack gap={"0pc"}>
          {products.map((product) => {
            return (
              <VStack w={"full"}>
                <HStack w={"full"} justifyContent={"end"}>
                  <Text> {(product.countItem * parseInt(product.product.price)).toLocaleString("ID-id", { style: "currency", currency: "IDR" })}</Text>
                </HStack>
              </VStack>
            );
          })}
        </VStack>
        <Box borderBottom={"2px solid"} borderColor={"brand.default"}>
          {" "}
          +
        </Box>
        <Flex textAlign={"end"} justifyContent={"space-between"}>
          <Text>Total : </Text>
          <Text size={"md"}>{totalPrice.toLocaleString("ID-id", { style: "currency", currency: "IDR" })}</Text>
        </Flex>
      </Box>
      <ButtonMultipleCheckout Product={products} onClose={onClose}></ButtonMultipleCheckout>
    </Flex>
  );
}
