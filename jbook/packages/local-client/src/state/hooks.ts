import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";
import { cellsSlice, fetchCells, saveCells } from "./cells-slice";
import { createBundle } from "./bundle-slice";
import { useMemo } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();
  const actions = { ...cellsSlice.actions, createBundle, fetchCells, saveCells };
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
