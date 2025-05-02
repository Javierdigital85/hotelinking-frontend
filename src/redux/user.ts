import { createAction, createReducer } from "@reduxjs/toolkit";
export const setUser = createAction<User>("SET_USERS");

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}
//estado inicial, con tipo user
const initialState: User = {
  id: 0,
  name: "",
  email: "",
  token: "",
};

//Reducer para manejar las acciones
export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (_state, action) => {
    return action.payload;
  });
});
