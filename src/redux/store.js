import { configureStore , getDefaultMiddleware} from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import sortSlice from './slices/sortSlice'
import searchSlice from './slices/searchSlice'
import pizzaListSlice from './slices/pizzaSliceAsync.js'
import logger from 'redux-logger'
import cardSlice from './slices/cardSlice.js'



export default configureStore({
  reducer: {
    filter : filterReducer,
    sort : sortSlice,
    search : searchSlice,
    pizzaList: pizzaListSlice,
    cart:cardSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

