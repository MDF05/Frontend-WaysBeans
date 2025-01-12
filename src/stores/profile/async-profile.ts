import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { apiV1 } from "../../lib/api-v1";
import { ProfileResponseDTO } from "../../DTO/profile-DTO";

export const getProfileByIdUserLogin = createAsyncThunk<Omit<ProfileResponseDTO, "transaction">, void>("profile/create", async (_, thunkAPI) => {
  try {
    const res = await apiV1.get("/profile");

    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("get data failed, please try again");
    return thunkAPI.rejectWithValue("failed get data");
  }
});

export const getProfileById = createAsyncThunk<ProfileResponseDTO, { profileId: string }>("profile/getById", async (profileId, thunkAPI) => {
  try {
    const res = await apiV1.get(`/profile/${profileId}`);

    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error("not authenticated, please login first");
    } else toast.error("get data failed, please try again");
    return thunkAPI.rejectWithValue("failed get data");
  }
});

export const putProfileUpdate = createAsyncThunk<ProfileResponseDTO, { form: FormData; profileId: number }>("profile/putProfile", async (data, thunkAPI) => {
  try {
    const res: AxiosResponse<ProfileResponseDTO> = await apiV1.put(`/profile/${data.profileId}`, data.form, { headers: { "Content-Type": "multipart/form-data" } });

    toast.success("Profile updated successfully");
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("update data failed, please try again");
    return thunkAPI.rejectWithValue("failed get data");
  }
});
