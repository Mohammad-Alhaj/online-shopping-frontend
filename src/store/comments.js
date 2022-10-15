import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

const url = 'http://localhost:3008/api'
 
 
 
 
 
 // get all comments

 export const getComments = createAsyncThunk(
    "comments/getComments",
    async (data, thunkApi) => {
      const { rejectWithValue } = thunkApi;
      try {
        const req = await axios.get(`${url}/comments`,  {
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

  // add comments
  export const addComments = createAsyncThunk(
    "comments/addComments",
    async (data, thunkApi) => {
      const { rejectWithValue,dispatch } = thunkApi;
      try {
        const req = await axios.post(`${url}/comments`, data , {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        dispatch(getComments())
        return req.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // update comments
  export const updateComments = createAsyncThunk(
    "comments/updateComments",
    async (data, thunkApi) => {
      const { rejectWithValue,dispatch } = thunkApi;
      try {
        const req = await axios.put(`${url}/comments/${data.id}`, data , {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        dispatch(getComments())
        return req.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // delete comments
  export const deleteComments = createAsyncThunk(
    "comments/addComments",
    async (id, thunkApi) => {
      const { rejectWithValue,dispatch } = thunkApi;
      try {
        const req = await axios.delete(`${url}/comments/${id}` , {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        dispatch(getComments())
        return req.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );



  const initialState = {
    commentsList:[],
    isLoading:false,
    error:null,
    }
    const comments = createSlice({
        name:'comments',
        initialState,
        reducers:{},
        extraReducers:{
    //****************post****************

  // get comments
  [getComments.fulfilled]: (state, action) => {
    state.commentsList=action.payload
    state.isLoading = false;
   
  },
  [getComments.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [getComments.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },
  // Post comments
  [addComments.fulfilled]: (state, action) => {
    state.isLoading = false;
  },
  [addComments.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [addComments.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },
  // Update comments
  [updateComments.fulfilled]: (state, action) => {
    state.isLoading = false;
   
  },
  [updateComments.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [updateComments.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },
  // Delete comments
  [deleteComments.fulfilled]: (state, action) => {
    state.isLoading = false;
  },
  [deleteComments.pending]: (state, action) => {
    state.isLoading = true;
    state.error=null;
  },
  [deleteComments.rejected]: (state, action) => {
  
    toast.error(`${action.payload}`)
    state.isLoading = false;
    state.error = action.payload;
  },

        }
    })
    export default comments.reducer