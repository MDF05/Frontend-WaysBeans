import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfileByIdUserLogin, putProfileUpdate } from "./async-profile";
import { ProfileResponseDTO } from "../../DTO/profile-DTO";

export interface ProfileState {
  profile: ProfileResponseDTO;
  loading: boolean;
  error: boolean;
}

const initialState: ProfileState = {
  profile: {} as ProfileResponseDTO,
  loading: false,
  error: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, payload: PayloadAction<ProfileResponseDTO>) {
      state.loading = false;
      state.error = false;
      state.profile = payload.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfileByIdUserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileByIdUserLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProfileByIdUserLogin.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      });
    builder
      .addCase(putProfileUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(putProfileUpdate.rejected, (state) => {
        state.loading = false;
      })
      .addCase(putProfileUpdate.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
