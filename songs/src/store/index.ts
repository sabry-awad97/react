import { configureStore } from "@reduxjs/toolkit";
import { selectedSongReducer, songsReducer } from "../reducers";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    selectedSong: selectedSongReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  console.log(store.getState());
});
