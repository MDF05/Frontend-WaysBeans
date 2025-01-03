import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseDTO } from "./../../DTO/response-DTO";
import { cartDTO, cartTypes } from "./../../DTO/cart-DTO";
import { apiV1 } from "../../lib/api-v1";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const GetCartAsync = createAsyncThunk<ResponseDTO<cartDTO>, void>("/get/cart", async (_, thunkAPI) => {
  try {
    const res = await apiV1.get(`/cart`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("failed get cart");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const PostCartAsync = createAsyncThunk<ResponseDTO<cartDTO>, { productId: string }>("/get/post", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post(`/cart/${data.productId}`);
    toast.success("successfully added to cart");
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error(" add cart data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const PutCartAsyncByCartId = createAsyncThunk<ResponseDTO<cartTypes>, { cartId: number; countItem: number }>("/get/put/cartId", async (data, thunkAPI) => {
  try {
    const res = await apiV1.put(`/cart/${data.cartId}?countItem=${data.countItem}`);
    toast.success("successfully updated cart");
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error(" add cart data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const deleteManyCartByCartsIdAndUserIdAsync = createAsyncThunk<ResponseDTO<cartTypes>, number[]>("/delete/many", async (data, thunkAPI) => {
  try {
    const res = await apiV1.delete(`/cart/many?productId=${data.toString()}`);
    // toast.success("successfully updated cart");
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error(" add cart data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});
