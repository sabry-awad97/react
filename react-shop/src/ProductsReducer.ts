import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { IProduct } from "./ProductsData";
import { RootState } from "./Store";

import {
  getProduct as getProductFromAPI,
  getProducts as getProductsFromAPI,
} from "./ProductsData";

export interface IProductsState {
  readonly products: IProduct[];
  readonly productsLoading: boolean;
  readonly currentProduct: IProduct | null;
}

const initialState = {
  products: [],
  productsLoading: false,
  currentProduct: null,
} as IProductsState;

export const getProducts = createAsyncThunk<IProduct[], void>(
  "products/fetchAll",
  async () => {
    const products = await getProductsFromAPI();
    return products;
  }
);

export const getProduct = createAsyncThunk<IProduct | null, number>(
  "products/getSingle",
  async (id: number) => {
    const product = await getProductFromAPI(id);
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loading: state => {
      state.productsLoading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProducts.pending, state => {
      state.productsLoading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
        state.productsLoading = false;
      }
    );
    builder.addCase(getProduct.pending, state => {
      state.productsLoading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<IProduct | null>) => {
        state.currentProduct = action.payload;
        state.productsLoading = false;
      }
    );
  },
});

export const selectProducts = (state: RootState) => state.products;

export const { loading } = productSlice.actions;

export default productSlice.reducer;
