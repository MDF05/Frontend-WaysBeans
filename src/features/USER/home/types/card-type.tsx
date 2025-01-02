import { ProductDTO, ProductResponseDTO } from "../../../../DTO/product-DTO";

export interface CardDetailTypes {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
}

export interface CardComponentTypes {
  products: ProductResponseDTO;
  onOpen: () => void;
}
