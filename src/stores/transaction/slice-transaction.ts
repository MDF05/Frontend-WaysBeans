import { createSlice } from "@reduxjs/toolkit";
import { TransactionDTO } from "../../DTO/transaction-DTO";
import transactionBuilder from "./builder/transaction-builder";

export interface initialTrasaction {
  loading: boolean;
  transactions: TransactionDTO[];
}

const initialState: initialTrasaction = {} as initialTrasaction;

const trasactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    transactionBuilder(builder);
  },
});

export default trasactionSlice.reducer;
