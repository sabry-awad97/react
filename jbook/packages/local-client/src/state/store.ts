import { configureStore } from "@reduxjs/toolkit";
import { cellsSlice } from "./cells-slice";
import { bundleSlice } from "./bundle-slice";
import { persistMiddlware } from "./middlewares"

export const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
    bundles: bundleSlice.reducer,
  },
  middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(persistMiddlware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
