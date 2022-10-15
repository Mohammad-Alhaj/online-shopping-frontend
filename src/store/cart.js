import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import cookie from 'react-cookies';
import axios from 'axios'
import { getData } from './API';
const url = 'http://localhost:3008'

 // get fav list

 export const getAllCarts = createAsyncThunk(
    "carts/getAllCarts",
    async (data, thunkApi) => {
      const { rejectWithValue } = thunkApi;
      try {
        const req = await axios.get(`${url}/cart`,  {
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
    export const addCart = createAsyncThunk(
        "carts/addCart",
        async (data, thunkApi) => {
          const { rejectWithValue } = thunkApi;
          try {
            const req = await axios.post(`${url}/cart`, data , {
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
export const removeCartItem= createAsyncThunk(
    "carts/removeCartItem",
    async (id, thunkApi) => {
      const { rejectWithValue,dispatch } = thunkApi;
      try {
        await axios.delete(`${url}/cart/${id}`, {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        dispatch(getData())
        dispatch(getAllCarts())
        return id;
      } catch (error) {
        return rejectWithValue(error.request.response);
      }
    }
  );
  


const initialState = {
cartList: []

}

const cartsSlice =createSlice({
    name:'carts',
    initialState,
    extraReducers:{
         // get carts items
  [getAllCarts.fulfilled]: (state, action) => {
    state.cartList=action.payload
    state.isLoading = false;
   
  },
  [getAllCarts.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [getAllCarts.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },
         // add to cart
  [addCart.fulfilled]: (state, action) => {
    state.error=null;
    state.isLoading = false;
    toast.success(`Add to favorite list successfully`);
  },
  [addCart.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [addCart.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },

 //Delete from cart
    [removeCartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success(`Delete successfully`);
    },
    [removeCartItem.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeCartItem.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    }
}) 

export default cartsSlice.reducer
