import { Button, Flex, Table, TableCaption, Link, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ModalEditProduct from "./Modal-Edit-Product";
import { useAppSelector } from "../../../../stores/stores";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import ButtonDeleteProduct from "./Button-Delete-Product";
// import { Link as ReactRouterLink } from "react-router-dom";
// import ButtonDeleteProduct from "./Button-Delete-Product";

export default function TableProduct(): React.ReactNode {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const state = useAppSelector((state) => state.products);

  return (
    <TableContainer bg={"brand.darkTheme"} width={"100%"}>
      <ModalEditProduct isOpen={isOpen} onClose={onClose}></ModalEditProduct>
      <Table color={"white"}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead borderBottom={"1.5px solid"} borderColor={"brand.baseColor"}>
          <Tr textTransform={"capitalize"}>
            <Th textAlign={"start"}>no</Th>
            <Th>photo</Th>
            <Th>Product Name</Th>
            <Th>Product Desc</Th>
            <Th>Price</Th>
            <Th>qty</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state?.products?.content?.map((product, key) => {
            return (
              <Tr borderBottom={"1.5px solid"} borderColor={"brand.baseColor"} key={key}>
                <Td>{key + 1}</Td>
                <Td>
                  <Link href={product.images[0]?.imageUrl} textDecoration={"underline"}>
                    {product.name}
                  </Link>
                </Td>
                <Td>{product.name}</Td>
                <Td overflow={"hidden"} maxW={"200px"}>
                  {product.description}
                </Td>
                <Td>{product.price}</Td>
                <Td isNumeric>{product.quantity}</Td>
                <Td>
                  <Flex gap={"10px"}>
                    <ChakraLinkExtendReactRouterLink to={""} state={{ product }} onClick={onOpen}>
                      <Button bg={"brand.succes"}>Edit</Button>
                    </ChakraLinkExtendReactRouterLink>
                    <ButtonDeleteProduct productId={`${product.id}`} key={key}></ButtonDeleteProduct>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
