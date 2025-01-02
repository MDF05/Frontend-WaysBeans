import { UserDTO } from "./user.DTO";

export interface CheckTokenDTO {
  user: UserDTO;
  token: string;
}
