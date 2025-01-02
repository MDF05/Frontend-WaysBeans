import { SubmitHandler } from "react-hook-form";
import { RegisterSchema } from "../../../../../../schemas/register-schema";

export interface useRegisterTypes {
  loading: boolean;
  onSubmit: SubmitHandler<RegisterSchema>;
}
