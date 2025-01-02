import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCartAsync, PostCartAsync, PutCartAsyncByCartId } from "./async-cart";
import { CartTypes } from "../../types/carts-types";

interface initialStateCart {
  countCartUser: number;
  carts: CartTypes[];
  loading: boolean;
}

const initialState: initialStateCart = {} as initialStateCart;

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<initialStateCart>) {
      state.countCartUser = action.payload.countCartUser;
      state.carts = action.payload.carts;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(PostCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.countCartUser = action?.payload?.content?._count?.cart;
      })
      .addCase(PostCartAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(PostCartAsync.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(GetCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.content.cart.reverse();
        state.countCartUser = action.payload.content._count.cart;
      })
      .addCase(GetCartAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetCartAsync.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(PutCartAsyncByCartId.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = state.carts.map((data) => {
          if (data.id === action.payload.content.id) {
            return {
              ...data,
              countItem: action.payload.content.countItem,
            };
          }
          return data;
        });
      })
      .addCase(PutCartAsyncByCartId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(PutCartAsyncByCartId.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setCart } = CartSlice.actions;

export default CartSlice.reducer;
