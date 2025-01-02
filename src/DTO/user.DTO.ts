import { ProductDTO } from "./product-DTO";
import { ProfileDTO } from "./profile-DTO";

export interface UserDTO {
  id: number;
  email: string;
  role: string;
  cart: ProductDTO[];
  profile: ProfileDTO;
  _count: {
    cart: number;
  };
}
