import { ProductDTO } from "./product-DTO";

export interface TransactionDTO {
  id?: string;
  profileId: number;
  productId: number;
  product?: ProductDTO;
  countItem?: number;
  fraud_status: string;
  gross_amount: string;
  order_id: string;
  payment_type: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
  createdAt?: string;
  updatedAt?: string;
  address: string;
}
