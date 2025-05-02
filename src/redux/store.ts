import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { promoCodesReducer } from "./promoCode";

const store = configureStore({
  reducer: {
    user: userReducer,
    promoCodes: promoCodesReducer,
  },
});

export default store;
