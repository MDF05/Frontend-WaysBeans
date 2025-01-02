import { Dispatch, SetStateAction } from "react";
import { cartCheckedDTO } from "../../../../DTO/cart-DTO";

export interface UseCartTypes {
  setProducts: Dispatch<SetStateAction<cartCheckedDTO[]>>;
  products: cartCheckedDTO[];
}
