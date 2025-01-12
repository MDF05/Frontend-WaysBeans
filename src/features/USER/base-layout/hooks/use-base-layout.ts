import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserDTO } from "./../../../../DTO/user.DTO";
import { checkAuth } from "./../../../../stores/auth/async";
import { CheckTokenDTO } from "./../../../../DTO/check-token-DTO";
import { useAppDispatch, useAppSelector } from "./../../../../stores/stores";
import { AuthState } from "./../../../../stores/auth/slice";

import { GetCartAsync } from "../../../../stores/cart/async-cart";
import { getProfileByIdUserLogin } from "../../../../stores/profile/async-profile";

export default function useBaseLayout() {
  const state = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.profile);

  const dispatch: ThunkDispatch<{ auth: AuthState }, undefined, UnknownAction> & Dispatch<UnknownAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      if (!token) return navigate("/login");
      else {
        const info: CheckTokenDTO = await dispatch(checkAuth()).unwrap();

        if (info.token == "invalid") return navigate("/login");
        else if (info.token) {
          await dispatch(GetCartAsync()).unwrap();
          await dispatch(getProfileByIdUserLogin());
        }
      }
      if (state.user?.role === "ADMIN") return navigate("/admin");
    })();
  }, []);

  return { pathname, user: state.user as UserDTO, profile };
}
