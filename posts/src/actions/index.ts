// import _ from "lodash";
import { createAsyncThunk } from "@reduxjs/toolkit";
import jsonPlaceholder from "../api/jsonPlaceholder";
import { Post } from "../typings/Post";
import { User } from "../typings/User";

export const fetchPosts = createAsyncThunk<Post[]>("FETCH_POSTS", async () => {
  const response = await jsonPlaceholder.get<Post[]>("/posts");
  return response.data;
});

export const fetchUser = createAsyncThunk<User, number>(
  "FETCH_USER",
  async id => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    return response.data;
  }
);

// export const fetchUser = createAsyncThunk<User, number>(
//   "FETCH_USER",
//   _.memoize(async id => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     return response.data;
//   })
// );
