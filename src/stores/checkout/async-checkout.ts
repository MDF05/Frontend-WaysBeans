import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseDTO } from "../../DTO/response-DTO";
import { CheckOutSchema } from "../../schemas/checkout-schema";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { apiV1 } from "../../lib/api-v1";

export const PostMidtransPayment = createAsyncThunk<ResponseDTO<{ token: string }>, CheckOutSchema>("/payment/midtrans", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post(`/payment`, data);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});
