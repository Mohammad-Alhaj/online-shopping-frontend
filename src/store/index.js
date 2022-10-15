import { configureStore } from '@reduxjs/toolkit'

import items from './API'
import auth from './auth'
import cart from './cart'
import favorite from './favorite'
import comments from './comments'
import usersSlice from './users'
const store = configureStore({
    reducer:{
        items:items,
        auth:auth,
        cartSlice:cart,
        favoriteSlice:favorite,
        comments:comments,
        usersSlice:usersSlice
    }
})

export default store