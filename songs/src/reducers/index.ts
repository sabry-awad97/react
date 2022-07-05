import { createReducer } from "@reduxjs/toolkit";
import { ISong, selectSong } from "../actions";

export const songsReducer: () => ISong[] = () => {
  return [
    { title: "No Scrubs", duration: "4:05" },
    { title: "Macarena", duration: "2:30" },
    { title: "All Star", duration: "3:15" },
    { title: "I Want it That Way", duration: "1:45" },
  ];
};

export const selectedSongReducer = createReducer<ISong | null>(
  null,
  builder => {
    builder
      .addCase(selectSong, (state, action) => {
        return action.payload;
      })
      .addDefaultCase((state, action) => {});
  }
);
