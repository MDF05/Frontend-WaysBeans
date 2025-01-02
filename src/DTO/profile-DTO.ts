export interface ProfileDTO {
  id: number;
  userId: number;
  name: string;
  address: string | null;
  gender: string | null;
  phone: string | null;
  imageUrl: string | null;
  Transaction: [];
  user?: {
    email: string;
  };
}

export interface ProfileResponseDTO {
  succes: boolean;
  author: string;
  aplication: string;
  version: string | undefined;
  message: string;
  date: Date;
  status: number;
  content: {
    profile: ProfileDTO;
  };
}
