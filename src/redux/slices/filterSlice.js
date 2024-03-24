import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeIndex: 0,
  },
  reducers: {
    chengeIndex: (state,action) => {
      state.activeIndex = action.payload
    },
  },
})


export const { chengeIndex } = filterSlice.actions
export const selectIndex = (state) => state.filter.activeIndex
export default filterSlice.reducer