import { createSlice } from "@reduxjs/toolkit";
import { CreateCategoryAsync, DeleteCategoryAsync, GetCategoryAsync, PutCategoryAsync } from "./async-category";
import { CategoryDtO } from "../../DTO/category-DTO";

export interface CategoryInitialState {
  categorys: CategoryDtO[];
  loading: boolean;
}

const initialState: CategoryInitialState = {
  categorys: [],
  loading: false,
};

const CategorySlice = createSlice({
  name: "categorys",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(CreateCategoryAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateCategoryAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CreateCategoryAsync.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(GetCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys = action.payload.content;
      })
      .addCase(GetCategoryAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetCategoryAsync.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(PutCategoryAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutCategoryAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(PutCategoryAsync.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(DeleteCategoryAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteCategoryAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteCategoryAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export default CategorySlice.reducer;
