import { Checkbox, Flex, FormLabel, Grid } from "@chakra-ui/react";

import useListCart from "../hooks/use-list-cart";
import Cart from "./Cart";
import ModalCheckout from "./ModalCheckout";

export default function ListCartUser(): React.ReactNode {
  const { onChangeAllCheckedBox, isAllChecked, isIndeterminate, state, products, setProducts, initialProduct } = useListCart();

  return (
    <Grid width={"100%"} pb={"100px"}>
      <Flex textAlign={"end"} position={"fixed"} top={"90px"} right={"350px"} zIndex={"1000000"} gap={"10px"} alignContent={"center"} h={"50px"}>
        <FormLabel htmlFor="checkbox-all" color={"white"} fontSize={"30px"}>
          Checkout All
        </FormLabel>
        <Checkbox
          colorScheme="green"
          isChecked={isAllChecked}
          isIndeterminate={isIndeterminate}
          onChange={onChangeAllCheckedBox}
          transform={"scale(2)"}
          id="checkbox-all"
        ></Checkbox>
      </Flex>
      {state?.carts?.map((cart, index) => {
        return <Cart cart={cart} index={index} products={products} setProducts={setProducts} initialProduct={initialProduct}></Cart>;
      })}
      <ModalCheckout
        products={products.filter((product) => {
          if (product.checked) return product;
        })}
      ></ModalCheckout>
    </Grid>
  );
}
