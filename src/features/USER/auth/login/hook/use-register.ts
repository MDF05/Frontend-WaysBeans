import { SubmitHandler } from "react-hook-form";
import { useRegisterTypes } from "./types/use-register-types";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../stores/stores";
import { AuthState } from "../../../../../stores/auth/slice";
import { RegisterSchema } from "../../../../../schemas/register-schema";
import { registerAsync } from "../../../../../stores/auth/async";
import { RegisterResponseDTO } from "../../../../../DTO/register-response-DTO";

export default function useRegister(): useRegisterTypes {
  const dispatch: ThunkDispatch<{ auth: AuthState }, undefined, UnknownAction> & Dispatch<UnknownAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { loading } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const res: RegisterResponseDTO = await dispatch(registerAsync(data)).unwrap();
    if (res.succes) navigate("/login");
  };

  return { onSubmit, loading };
}
