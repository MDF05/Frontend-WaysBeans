import { Checkbox, Flex, FormLabel, Grid } from "@chakra-ui/react";

import useListCart from "../hooks/use-list-cart";
import Cart from "./Cart";
import ModalCheckout from "./ModalCheckout";
import ButtonDeleteCart from "./Button-Delete-Cart";

export default function ListCartUser({ onClose }: { onClose?: () => void }): React.ReactNode {
  const { onChangeAllCheckedBox, isAllChecked, isIndeterminate, state, products, setProducts, initialProduct } = useListCart();
  const checkedCart = products.filter((product) => {
    if (product.checked) return product;
  });
  return (
    <Grid width={"100%"} pb={"500px"} height={"100%"}>
      <Flex textAlign={"end"} position={"fixed"} top={"80px"} right={{ base: "10%", md: "10%", lg: "28%" }} zIndex={"1000000"} gap={"10px"} alignContent={"center"} h={"50px"}>
        {checkedCart.length > 0 && <ButtonDeleteCart cart={checkedCart}>delete cart</ButtonDeleteCart>}
        <Flex gap={"5px"}>
          <FormLabel htmlFor="checkbox-all" color={"white"} fontSize={"30px"}>
            All
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
      </Flex>
      {state?.carts?.map((cart, index) => {
        return <Cart cart={cart} index={index} products={products} setProducts={setProducts} initialProduct={initialProduct}></Cart>;
      })}
      <ModalCheckout products={checkedCart} onClose={onClose}></ModalCheckout>
    </Grid>
  );
}
