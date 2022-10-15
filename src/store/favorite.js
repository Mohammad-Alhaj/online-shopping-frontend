import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import cookie from 'react-cookies';
import axios from 'axios'
import { getData } from './API';
const url = 'http://localhost:3008/api'

 // get fav list

 export const getFav = createAsyncThunk(
    "favorite/getFav",
    async (data, thunkApi) => {
      const { rejectWithValue } = thunkApi;
      try {
        const req = await axios.get(`${url}/favList`,  {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        return req.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

    // add to fav list
    export const addFav = createAsyncThunk(
        "favorite/addFav",
        async (data, thunkApi) => {
          const { rejectWithValue } = thunkApi;
          try {
            const req = await axios.post(`${url}/favList`, data , {
              headers: {
                authorization: `Bearer ${cookie.load("token")}`,
              },
            });
            return req.data;
          } catch (error) {
            return rejectWithValue(error.response.data);
          }
        }
      );

// remove favList
export const removeFavorite = createAsyncThunk(
    "favorite/removeFavorite",
    async (id, thunkApi) => {
      const { rejectWithValue,dispatch } = thunkApi;
      try {
        await axios.delete(`${url}/favList/${id}`, {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        dispatch(getData())
        dispatch(getFav())
        return id;
      } catch (error) {
        return rejectWithValue(error.request.response);
      }
    }
  );
  


const initialState = {
favoriteList: []

}

const favoriteSlice =createSlice({
    name:'favorite',
    initialState,
    extraReducers:{
         // get fav
  [getFav.fulfilled]: (state, action) => {
    state.favoriteList=action.payload
    state.isLoading = false;
   
  },
  [getFav.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [getFav.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },
         // add favorite
  [addFav.fulfilled]: (state, action) => {
    state.error=null;
    state.isLoading = false;
    toast.success(`Add to favorite list successfully`);
  },
  [addFav.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [addFav.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },

 //Delete fav....
    [removeFavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success(`Delete successfully`);
    },
    [removeFavorite.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeFavorite.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    }
}) 

export default favoriteSlice.reducer
