import { SubmitHandler } from "react-hook-form";
import { LoginSchema } from "./../../../../../../schemas/login-schema";

export interface UseLoginTypes {
  loading: boolean;
  onSubmit: SubmitHandler<LoginSchema>;
}
