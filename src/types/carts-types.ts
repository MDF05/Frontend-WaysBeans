import { ProductDTO } from "../DTO/product-DTO";

export interface CartTypes {
  product: ProductDTO;
  countItem: number;
  id: number;
}
