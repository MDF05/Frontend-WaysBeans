import { Box, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import CardProduct from "./Card-Product";
import ModalDetailProduct from "./Modal-Detail-Product";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";
import InputSearch from "./Input-Search";

import InputFilterProduct from "./Input-Filter-Product";

export default function Home(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);
  if (state?.user?.id) dispatch(GetProductAsync()).unwrap();

  return (
    <VStack p={{ base: "20px", lg: "20px 50px" }} height={"100%"} width={"100%"}>
      <ModalDetailProduct isOpen={isOpen} onClose={onClose}></ModalDetailProduct>
      <InputSearch></InputSearch>
      <HStack w={{ base: "100%", md: "95%", lg: "85%" }} mb={"20px"} justifyContent={"end"}>
        <Box>
          <Text color={"white"}>Filter By :</Text>
        </Box>
        <InputFilterProduct></InputFilterProduct>
      </HStack>
      <HStack
        width={"100%"}
        rowGap={{ base: "20px", lg: "40px" }}
        columnGap={"20px"}
        wrap={"wrap"}
        height={"100%"}
        overflow={"auto"}
        display={"flex"}
        justifyContent={"center"}
        paddingBottom={"100px"}
      >
        <CardProduct onOpen={onOpen}></CardProduct>
      </HStack>
    </VStack>
  );
}
