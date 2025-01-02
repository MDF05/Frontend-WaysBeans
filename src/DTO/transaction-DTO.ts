import { ProductDTO } from "./product-DTO";

export interface TransactionDTO {
  id?: string;
  transactionId: string;
  productId: number;
  countItem?: number;
  product?: ProductDTO;
  address: string;
  paymentType: string;
  createdAt?: string;
  updatedAt?: string;
}
