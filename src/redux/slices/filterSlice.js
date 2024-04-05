import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: 0,
  reducers: {
    chengeIndex: (state,action) => action.payload
  },
})


export const { chengeIndex } = filterSlice.actions
export const selectIndex = (state) => state.filter
export default filterSlice.reducer