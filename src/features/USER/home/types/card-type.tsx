export interface CardDetailTypes {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
}

export interface CardComponentTypes {
  onOpen: () => void;
}
