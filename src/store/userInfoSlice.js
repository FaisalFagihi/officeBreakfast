import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: { name: '' },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
  }
})

export const { setUserName } = userInfoSlice.actions
export default userInfoSlice.reducer


