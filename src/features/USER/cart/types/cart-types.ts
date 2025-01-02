import { Dispatch, SetStateAction } from "react";
import { cartCheckedDTO } from "../../../../DTO/cart-DTO";
import { CartTypes } from "../../../../types/carts-types";

export interface CartProps {
  cart: CartTypes;
  products: cartCheckedDTO[];
  index: number;
  setProducts: Dispatch<SetStateAction<cartCheckedDTO[]>>;
  initialProduct: cartCheckedDTO[];
}
