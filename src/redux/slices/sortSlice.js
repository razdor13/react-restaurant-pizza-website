import { createSlice } from '@reduxjs/toolkit'

export const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    sortIndex: 0,
  },
  reducers: {
    changeIndex: (state,action) => {
      state.sortIndex = action.payload
    },
  },
})


export const { changeIndex } = sortSlice.actions
export const selectIndex = (state) => state.sort.sortIndex
export default sortSlice.reducer