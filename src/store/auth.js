import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base64 from "base-64";
import cookie from "react-cookies";
const url = "http://localhost:3008";

export const signin = createAsyncThunk(
  "auth/signin",
  async (info, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const request = await axios.post(
        `${url}/signin`,
        {},
        {
          headers: {
            authorization: `Basic ${base64.encode(
              `${info.username}:${info.password}`
            )}`,
          },
        }
      );
      return request.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (info, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const request = await axios.post(`${url}/signup`, info);
      return request.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isSignin: cookie.load("token") ? true : false,
  isLoading: false,
  errorSignin: null,
  errorSignup: null,
  actions: cookie.load("actions") || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    isSinginRed(state, action) {
      state.isSignin = action.payload;
    },
  },
  extraReducers: {
    // singin
    [signin.fulfilled]: (state, action) => {
      state.isSignin = true;
      cookie.save("token", action.payload.token);
      cookie.save("userID", action.payload.id);
      state.isLoading = false;
      state.errorSignin = null;
    },
    [signin.pending]: (state, action) => {
      state.isLoading = true;
      state.errorSignin = null;
    },
    [signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorSignin = action.payload;
    },

    // signup
    [signup.fulfilled]: (state, action) => {
      window.location.reload();
      state.isLoading = false;
      state.errorSignup = null;
    },
    [signup.pending]: (state, action) => {
      state.isLoading = true;
      state.errorSignup = null;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorSignup = action.payload;
    },
  },
});

export const { isSinginRed } = authSlice.actions;
export default authSlice.reducer;
