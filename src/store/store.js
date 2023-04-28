import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfoSlice'

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice
  }
})