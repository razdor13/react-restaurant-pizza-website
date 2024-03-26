import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: 'г',
  },
  reducers: {
    changeSearch: (state,action) => {
      state.searchValue = action.payload
    },
  },
})


export const { changeSearch } = searchSlice.actions
export const selectSearch = (state) => state.search.searchValue
export default searchSlice.reducer