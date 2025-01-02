import { CategoryDtO } from "./category-DTO";

export interface CategoryResponseDTO {
  succes: boolean;
  author: string;
  aplication: string;
  version: string | undefined;
  message: string;
  date: Date;
  status: number;
  content: CategoryDtO[];
}
