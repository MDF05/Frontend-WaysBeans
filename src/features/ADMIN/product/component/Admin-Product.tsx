import { Button, Grid, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import TableProduct from "./Table-Product";
import ModalPostProduct from "./Modal-Post-Product";
import { useAppDispatch } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";
export default function AdminProduct(): React.ReactNode {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();

  dispatch(GetProductAsync());

  return (
    <Grid gridTemplateColumns={"100%"} padding={"100px 50px"} height={"100vh"}>
      <ModalPostProduct isOpen={isOpen} onClose={onClose} />
      <VStack width={"100%"} alignItems={"start"} h={"100%"}>
        <HStack justifyContent={"space-between"} width={"100%"}>
          <Text color={"brand.default"} textAlign={"start"}>
            <b>List Product</b>
          </Text>
          <Button bg={"brand.default"} onClick={onOpen} color={"white"}>
            add new product
          </Button>
        </HStack>
        <TableProduct></TableProduct>
      </VStack>
    </Grid>
  );
}
