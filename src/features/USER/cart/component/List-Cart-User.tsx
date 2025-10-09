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
      <Flex textAlign={"end"} position={"fixed"} top={"0px"} right={{ base: "10%", md: "10%", lg: "28%" }} zIndex={"1000000"} gap={"10px"} alignContent={"center"} h={"60px"} >
        {checkedCart.length > 0 && <ButtonDeleteCart cart={checkedCart}>delete cart</ButtonDeleteCart>}
        <Flex gap={"5px"} alignItems={"center"}>
          <FormLabel htmlFor="checkbox-all" _dark={{color : "white"}} color={"brand.default"} fontSize={"30px"}>
            All
          </FormLabel>
          <Checkbox
            colorScheme="orange"
            isChecked={isAllChecked}
            isIndeterminate={isIndeterminate}
            onChange={onChangeAllCheckedBox}
            transform={"scale(2)"}
            id="checkbox-all"
            sx={{
              "& .chakra-checkbox__control": {
                borderColor: "#5C4033", // warna border default
                _checked: {
                  bg: "#5C4033", // warna isi checkbox saat dicentang
                  borderColor: "#5C4033",
                  _hover: {
                    bg: "#704214", // warna hover
                    borderColor: "#704214",
                  },
                },
                _hover: {
                  borderColor: "#704214", // warna hover saat belum dicentang
                },
              },
            }}

            _dark={{
              "& .chakra-checkbox__control": {
                borderColor: "white", // versi gelap: coklat tua
                _checked: {
                  bg: "brand.latte",
                  borderColor: "brand.latte",
                  _hover: {
                    bg: "brand.latte",
                    borderColor: "white",
                  },
                },
                _hover: {
                  borderColor: "white",
                },
              },
            }}
            
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
