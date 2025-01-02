import { Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import CardProduct from "./Card-Product";
import ModalDetailProduct from "./Modal-Detail-Product";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";
import { ProductResponseDTO } from "../../../../DTO/product-DTO";

export default function Home(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<ProductResponseDTO | null>(null);

  useEffect(() => {
    (async () => {
      const response = await dispatch(GetProductAsync()).unwrap();
      setProducts(response);
    })();
  }, []);

  return (
    <VStack p={"50px"} height={"100%"}>
      <ModalDetailProduct isOpen={isOpen} onClose={onClose}></ModalDetailProduct>
      <HStack width={"100%"} rowGap={"40px"} columnGap={"20px"} wrap={"wrap"} height={"100%"} overflow={"auto"} display={"flex"} justifyContent={"center"} paddingBottom={"100px"}>
        {products && <CardProduct products={products} onOpen={onOpen}></CardProduct>}
      </HStack>
    </VStack>
  );
}
