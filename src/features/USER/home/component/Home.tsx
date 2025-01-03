import { HStack, useDisclosure, VStack } from "@chakra-ui/react";
import CardProduct from "./Card-Product";
import ModalDetailProduct from "./Modal-Detail-Product";
import { useAppDispatch } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";

export default function Home(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  dispatch(GetProductAsync()).unwrap();

  return (
    <VStack p={"50px"} height={"100%"}>
      <ModalDetailProduct isOpen={isOpen} onClose={onClose}></ModalDetailProduct>
      <HStack width={"100%"} rowGap={"40px"} columnGap={"20px"} wrap={"wrap"} height={"100%"} overflow={"auto"} display={"flex"} justifyContent={"center"} paddingBottom={"100px"}>
        <CardProduct onOpen={onOpen}></CardProduct>
      </HStack>
    </VStack>
  );
}
