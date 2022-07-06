import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Cell, CellsState, CellType } from "./cell";
import { nanoid } from "nanoid";
import type { AppDispatch, RootState } from "./store";

import axios from "axios";

export const cellsSlice = createSlice({
  name: "cells",
  initialState: {
    data: {},
    loading: false,
    error: null,
    order: [],
  } as CellsState,
  reducers: {
    updateCell: (
      state,
      action: PayloadAction<{
        id: string;
        content: string;
      }>
    ) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      const cellId = action.payload;
      delete state.data[cellId];
      state.order = state.order.filter(id => id !== cellId);
    },
    moveCell: (
      state,
      action: PayloadAction<{
        id: string;
        direction: "up" | "down";
      }>
    ) => {
      const { direction, id } = action.payload;
      const index = state.order.findIndex(i => i === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.order.length) return;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
    insertCellAfter: (
      state,
      action: PayloadAction<{
        id: string | null;
        type: CellType;
      }>
    ) => {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: nanoid(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(id => id === action.payload.id);

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    },
    fetchCellsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCellsComplete: (state, action: PayloadAction<Cell[]>) => {
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((accumulator, cell) => {
        accumulator[cell.id] = cell;
        return accumulator;
      }, {} as CellsState['data']);
    },
    fetchCellsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveCellsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

type SliceActions<T> = {
  [K in keyof T]: {type: K; payload: T[K] extends (...args: infer P) => void ? P[0] : never};
}[keyof T];

// type SliceActions<T> = {
//     [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
// }[keyof T]

type ActionTypes = SliceActions<typeof cellsSlice.actions>

const { fetchCellsStart, fetchCellsComplete, fetchCellsError, saveCellsError } = cellsSlice.actions

export const fetchCells = createAsyncThunk("cells/fetchCells", async (_: void, { dispatch }) => {
  dispatch(fetchCellsStart());
  try {
    const { data } = await axios.get("/cells") as { data: Cell[] };
    dispatch(fetchCellsComplete(data));
  } catch (err: any) {
    dispatch(fetchCellsError(err.message));
  }
});

export const saveCells = createAsyncThunk("cells/saveCells", async (_: void, { dispatch, getState }) => {
  const { cells: { order, data } } = getState() as RootState;

  try {
    await axios.post("/cells", { cells: order.map((id) => data[id]) });
  } catch (err: any) {
    dispatch(saveCellsError(err.message));
  }
});
