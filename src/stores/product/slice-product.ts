import { createSlice } from "@reduxjs/toolkit";
import { ProductResponseDTO } from "../../DTO/product-DTO";
import { DeleteProduct, GetProductAsync, PostProductAsync, PutProductAsync } from "./async-product";

interface ProductState {
  loading: boolean;
  products: ProductResponseDTO;
}

const initialState: ProductState = {
  loading: false,
  products: {} as ProductResponseDTO,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(PostProductAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(PostProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostProductAsync.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(GetProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(GetProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProductAsync.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(PutProductAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutProductAsync.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(DeleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
