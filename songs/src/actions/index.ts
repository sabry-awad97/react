import { createAction } from "@reduxjs/toolkit";

export interface ISong {
  title: string;
  duration: string;
}

export const selectSong = createAction<ISong>("SONG_SELECTED");
