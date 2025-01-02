import { ImageDTO } from "./image-DTO";

export interface ProductDTO {
  createdAt: string;
  description: string;
  id: number;
  images: ImageDTO[];
  name: string;
  price: string;
  profileId: null | number;
  quantity: string;
}

export interface ProductResponseDTO {
  succes: boolean;
  author: string;
  aplication: string;
  version: string | undefined;
  message: string;
  date: Date;
  status: number;
  images: ImageDTO[];
  content: ProductDTO[];
}
