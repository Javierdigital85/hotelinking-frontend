import { createAction, createReducer } from "@reduxjs/toolkit";
export const setPromoCode = createAction<PromoCode[]>("SET_PROMO_CODE");

export interface PromoCode {
  id: number;
  offerId: number;
  userId: number;
  code: string;
  redeem: string;
}
//estado inicial, con tipo user
const initialState: PromoCode[] = [];

//Reducer para manejar las acciones
export const promoCodesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPromoCode, (_state, action) => {
    return action.payload;
  });
});
