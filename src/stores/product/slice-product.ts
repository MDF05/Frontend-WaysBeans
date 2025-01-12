import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponseDTO } from "../../DTO/product-DTO";
import { DeleteProduct, GetProductAsync, PostProductAsync, PutProductAsync } from "./async-product";
import { ProductDTO } from "./../../DTO/product-DTO";

interface ProductState {
  loading: boolean;
  products: ProductResponseDTO;
  filterProduct?: ProductDTO[] | null;
}

const initialState: ProductState = {
  loading: false,
  products: {} as ProductResponseDTO,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductDTO[]>) {
      state.products.content = action.payload;
    },
    setFilterProduct(state, action: PayloadAction<string | null>) {
      let products;
      if (action?.payload) {
        products = (state.products.content ?? []).filter((product) => {
          return product.name.toLowerCase().includes((action.payload ?? "").toLowerCase());
        });
      } else products = null;

      state.filterProduct = products;
    },
    setMostStock(state) {
      const data = state.products.content.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));

      state.filterProduct = data;
    },
    setSmallestStock(state) {
      const data = state.products.content.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));

      state.filterProduct = data.reverse();
    },
    setNewsProduct(state) {
      const data = state.products.content.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      state.filterProduct = data;
    },
    setOldestProduct(state) {
      const data = state.products.content.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      state.filterProduct = data.reverse();
    },
    setHighestPrice(state) {
      const data = state.products.content.sort((a, b) => parseInt(a.price) - parseInt(b.price));

      state.filterProduct = data;
    },
    setLowestPrice(state) {
      const data = state.products.content.sort((a, b) => parseInt(a.price) - parseInt(b.price));

      state.filterProduct = data.reverse();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(PostProductAsync.fulfilled, (state) => {
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

export const { setProducts, setFilterProduct, setMostStock, setSmallestStock, setNewsProduct, setOldestProduct, setHighestPrice, setLowestPrice } = productSlice.actions;
export default productSlice.reducer;
