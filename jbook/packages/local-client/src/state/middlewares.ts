import { AnyAction, isAnyOf, Dispatch } from "@reduxjs/toolkit";
import { cellsSlice, saveCells } from './cells-slice';
import type { RootState, AppDispatch } from './store';

const { moveCell, updateCell, insertCellAfter, deleteCell } = cellsSlice.actions;

export const persistMiddlware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<AnyAction>;
  getState: () => any;
}) => {
  let timer: any;

  return (next: (action: AnyAction) => void) => {
    return (action: AnyAction) => {
      next(action);

      const matches = isAnyOf(moveCell, updateCell, insertCellAfter, deleteCell);

      if (matches(action)) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState, undefined);
        }, 250);
      }
    };
  };
};
