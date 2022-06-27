import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "./ProductsData";
import { RootState } from "./Store";

export interface IBasketState {
  readonly products: IProduct[];
}

const initialState: IBasketState = {
  products: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addToBasket } = basketSlice.actions;

export const selectBasket = (state: RootState) => state.basket;

export default basketSlice.reducer;
