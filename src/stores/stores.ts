import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import authReducer from "./auth/slice";
import profileReducer from "./profile/slice.-profile";
import productReducer from "./product/slice-product";
import categoryReducer from "./category/slice-category";
import cartReducer from "./cart/slice-cart";
import checkoutReducer from "./checkout/slice-checkout";
import transactionReducer from "./transaction/slice-transaction";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    products: productReducer,
    categorys: categoryReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
