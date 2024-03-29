import { createSelector, createSlice  } from '@reduxjs/toolkit'
import { selectPizzas } from './pizzaSliceAsync'






export const pizzasSettings = createSlice({
  name: 'pizzasSettings',
  initialState: {
    activeIndex: 0,
  },
  reducers: {
    chengeIndex: (state,action) => {
      state.activeIndex = action.payload
    },
  },
})



export default pizzasSettings.reducer