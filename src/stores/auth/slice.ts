import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginAsync, registerAsync } from "./async";
import { UserDTO } from "./../../DTO/user.DTO";

export interface AuthState {
  token: string;
  user?: UserDTO;
  loading: boolean;
}

const initialState: AuthState = {
  token: "",
  user: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGOUT(state) {
      state.token = "";
      state.user = undefined;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.content.token;
        state.user = action.payload.content.user;
      })
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { LOGOUT } = authSlice.actions;
export default authSlice.reducer;
