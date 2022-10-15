import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
const url = 'http://localhost:3008/api'

// get all users
export const getAllUser = createAsyncThunk("users/getAllUser", async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    let response = await axios.get(`${url}/users`, {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});



const initialState = {
  userInfo: [],
  isLoadingProviderInfo: false,
  errorProviderInfo: null,
  userInfoId: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    //Get all Users
    [getAllUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.isLoadingProviderInfo = false;
      state.errorProviderInfo = null;
    },
    [getAllUser.pending]: (state, action) => {
      state.isLoadingProviderInfo = true;
      state.errorProviderInfo = null;
    },
    [getAllUser.rejected]: (state, action) => {
      state.errorProviderInfo = action.payload;
      state.isLoadingProviderInfo = false;
    },

  },
});

export default usersSlice.reducer;