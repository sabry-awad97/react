import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BundleState } from "./cell";
import bundle, { Bundle } from "../bundler";

export const bundleSlice = createSlice({
  name: "bundle",
  initialState: {} as BundleState,
  reducers: {
    bundleStart: (
      state,
      action: PayloadAction<{
        cellId: string;
      }>
    ) => {
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
    },
    bundleComplete: (
      state,
      action: PayloadAction<{
        cellId: string;
        bundle: {
          code: string;
          err: string;
        };
      }>
    ) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
    },
  },
});

const { bundleStart, bundleComplete } = bundleSlice.actions;

export const createBundle = createAsyncThunk<
  Bundle,
  { cellId: string; input: string }
>("bundle/createBundle", async ({ cellId, input }, { dispatch }) => {
  dispatch(bundleStart({ cellId }));
  const output = await bundle(input);
  const { code, err } = output;
  dispatch(bundleComplete({ cellId, bundle: { code, err } }));
  return output;
});
