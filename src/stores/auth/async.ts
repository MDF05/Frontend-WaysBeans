import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiV1 } from "../../lib/api-v1";
import { RegisterSchema } from "../../schemas/register-schema";
import { isAxiosError } from "axios";
import { LoginSchema } from "../../schemas/login-schema";
import { LoginResponseDTO } from "../../DTO/login-response-DTO";
import { RegisterResponseDTO } from "../../DTO/register-response-DTO";
import { CheckTokenDTO } from "../../DTO/check-token-DTO";

export const registerAsync = createAsyncThunk<RegisterResponseDTO, RegisterSchema>("auth/register", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post("/register", data);

    toast.success("Register Success!, please login first");
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Register failed, please try again");
    return thunkAPI.rejectWithValue("failed registration");
  }
});

export const loginAsync = createAsyncThunk<LoginResponseDTO, LoginSchema>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post("/login", data);
    localStorage.setItem("token", res.data.content.token);
    toast.success("login successful,enjoy the app 🙂");
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("login failed, please try again");
    return thunkAPI.rejectWithValue("failed login, please try again");
  }
});

export const checkAuth = createAsyncThunk<CheckTokenDTO, void>("/checkAuth", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue("");
    }

    const res = await apiV1.get("/check");

    if (!res.data.content) {
      return thunkAPI.rejectWithValue("not authenticated");
    }
    return thunkAPI.fulfillWithValue(res.data.content);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error("you was logout, please login again!!!");
    } else toast.error("user invalid, please login again");
    thunkAPI.rejectWithValue({ token: "invalid", user: {} });
    return { token: "invalid", user: {} };
  }
});
