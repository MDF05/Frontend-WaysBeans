import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface detailInputForm {
  placeHolder?: string;
  type: string;
  inputName: string;
}

export interface InputFormTypes {
  ElementDetails: detailInputForm[];
  registerHook: UseFormRegister<any>;
  errors: FieldErrors<FieldErrors> | any;
}
