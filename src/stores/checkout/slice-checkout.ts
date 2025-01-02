import { createSlice } from "@reduxjs/toolkit";
import { PostMidtransPayment } from "./async-checkout";

export interface initialStateCheckout {
  loading: boolean;
  token: string;
}

const initialState: initialStateCheckout = {
  loading: false,
  token: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(PostMidtransPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.content.token;
    });
  },
});

export default checkoutSlice.reducer;
