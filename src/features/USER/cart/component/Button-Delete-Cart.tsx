import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../stores/stores";
import { deleteManyCartByCartsIdAndUserIdAsync, GetCartAsync } from "../../../../stores/cart/async-cart";
import React from "react";
import { cartCheckedDTO } from "../../../../DTO/cart-DTO";

export default function ButtonDeleteCart({ cart, children }: { cart: cartCheckedDTO[]; children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  async function deleteCart() {
    alert("delete cart");
    await dispatch(deleteManyCartByCartsIdAndUserIdAsync(cart.map((c) => c.product.id)));
    await dispatch(GetCartAsync());
  }

  return (
    <Button bg={"brand.danger"} _hover={{ bg: "gray.500" }} color={"white"} p={"2"} m={"2"} display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={deleteCart}>
      {children}
    </Button>
  );
}
