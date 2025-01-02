import { ProductDTO } from "./product-DTO";

export interface cartTypes {
  countItem: number;
  product: ProductDTO;
  id: number;
}

export interface cartDTO {
  cart: cartTypes[];
  _count: {
    cart: number;
  };
}

export interface cartCheckedDTO {
  product: ProductDTO;
  countItem: number;
  checked: boolean;
}
