import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
import { toast } from "react-toastify";

const url = "https://online-shopoing-mohammad.herokuapp.com/api";

// get items form API
export const getData = createAsyncThunk(
  "item/getData",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      let response = await axios.get(`${url}/items`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// get dataBYid form API
export const getDataById = createAsyncThunk(
  "item/getDataById",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.get(
        `${url}/items/${id}`,

        {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      );
      return req.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Post card
export const postData = createAsyncThunk(
  "item/postData",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.post(`${url}/items`, arg, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return req.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update card
export const updateData = createAsyncThunk(
  "item/updateData",
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
       await axios.put(`${url}/items/${data.id}`, data, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });

      dispatch(getData());
      return data;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);
// Delete card
export const deleteCard = createAsyncThunk(
  "item/deleteCard",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(`${url}/items/${id}`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.request.response);
    }
  }
);

const itemsSlice = createSlice({
  name: "item",
  initialState: { items: [], isLoading: false, error: null, oneItem: [] },
  extraReducers: {
    // get data
    [getData.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.oneItem = [];
      state.error = null;
    },
    [getData.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getData.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.items = [];
    },
    // get data by id
    [getDataById.fulfilled]: (state, action) => {
      state.oneItem = action.payload;
      state.isLoading = false;
    },
    [getDataById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDataById.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //.......post..........................
    [postData.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      toast.success(`Added ${action.payload.name} successfully`);
    },
    [postData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postData.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;

    },
    // update ............
    [updateData.fulfilled]: (state, action) => {
    
      state.isLoading = false;
      toast.success(`Update successfully`);
    },
    [updateData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateData.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //Delete card....
    [deleteCard.fulfilled]: (state, action) => {
      state.items = state.items.filter((ele) => ele.id !== action.payload);

      state.isLoading = false;
      toast.success(`Delete successfully`);
    },
    [deleteCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCard.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default itemsSlice.reducer;
