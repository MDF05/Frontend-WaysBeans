import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseDTO } from "../../DTO/response-DTO";
import { TransactionDTO } from "../../DTO/transaction-DTO";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { apiV1 } from "../../lib/api-v1";

export const getTransactionAsync = createAsyncThunk<ResponseDTO<TransactionDTO[]>, void>("/getTransaction/byUserId", async (_, thunkApi) => {
  try {
    const res = await apiV1.get("/transaction");
    return thunkApi.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("failed get cart");
    return thunkApi.rejectWithValue("failed post data");
  }
});

export const postTransactionAsync = createAsyncThunk<ResponseDTO<TransactionDTO>, TransactionDTO>("/postTransaction/byUserId", async (data, thunkApi) => {
  try {
    const res = await apiV1.post("/transaction", data);
    toast.success("Transaction is successfully, thank you for your transaction ");
    return thunkApi.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("failed get cart");
    return thunkApi.rejectWithValue("failed post data");
  }
});
