import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { initialTrasaction } from "../slice-transaction";
import { getTransactionAsync, postTransactionAsync } from "../async-transaction";

export default function transactionBuilder(builder: ActionReducerMapBuilder<initialTrasaction>) {
  return builder
    .addCase(getTransactionAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTransactionAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload.content;
    })
    .addCase(getTransactionAsync.rejected, (state) => {
      state.loading = false;
    })
    .addCase(postTransactionAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(postTransactionAsync.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(postTransactionAsync.rejected, (state) => {
      state.loading = false;
    });
}
