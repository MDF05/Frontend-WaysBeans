import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategorySchema } from "../../schemas/category-schema";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { apiV1 } from "../../lib/api-v1";
import { CategoryResponseDTO } from "./../../DTO/category-response-DTO";
import { CategoryDtO } from "../../DTO/category-DTO";

export const CreateCategoryAsync = createAsyncThunk<CategoryResponseDTO, CategorySchema>("category/create", async (data, thunkAPI) => {
  try {
    const res: AxiosResponse<CategoryResponseDTO> = await apiV1.post(`/category`, data);

    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const GetCategoryAsync = createAsyncThunk<CategoryResponseDTO, void>("category/get", async (_, thunkAPI) => {
  try {
    const res: AxiosResponse<CategoryResponseDTO> = await apiV1.get(`/category`);

    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("get data failed, please try again");
    return thunkAPI.rejectWithValue("failed get data");
  }
});

export const PutCategoryAsync = createAsyncThunk<CategoryResponseDTO, CategoryDtO>("category/put", async (data, thunkAPI) => {
  try {
    const res: AxiosResponse<CategoryResponseDTO> = await apiV1.put(`/category`, data);

    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("update data failed, please try again");
    return thunkAPI.rejectWithValue("failed update data");
  }
});

export const DeleteCategoryAsync = createAsyncThunk<CategoryResponseDTO, { id: number }>("category/delete", async (data, thunkAPI) => {
  try {
    const res: AxiosResponse<CategoryResponseDTO> = await apiV1.delete(`/category/${data.id}`);

    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("update data failed, please try again");
    return thunkAPI.rejectWithValue("failed update data");
  }
});
