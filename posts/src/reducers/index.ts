import { createReducer } from "@reduxjs/toolkit";
import { fetchPosts, fetchUser } from "../actions";
import { Post } from "../typings/Post";
import { User } from "../typings/User";

export const postsReducer = createReducer([] as Post[], builder => {
  builder.addCase(fetchPosts.fulfilled, (state, action) => action.payload);
});

export const usersReducer = createReducer([] as User[], builder => {
  builder.addCase(fetchUser.fulfilled, (state, action) => {
    state.push(action.payload);
    return state;
  });
});
