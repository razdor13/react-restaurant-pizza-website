import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getPizzaBySort from '../../services/PizzaService';





export const fetchPizzaList = createAsyncThunk(
    'pizzaList/fetch',
    async (arg, thunkAPI) => {
        const { activeIndex } = thunkAPI.getState().filter;
        const { searchValue } = thunkAPI.getState().search;
        const { sortIndex } = thunkAPI.getState().sort; 
        const { currentPg } =thunkAPI.getState().pizzaList.data
        const response = await getPizzaBySort(sortIndex, activeIndex, searchValue,currentPg);
        const data = await response.json();
        return data;
    }
);



export const pizzaListSlice = createSlice({
    name: 'pizzaList',
    initialState: {
        data: {pizzas : [],totalPages :1,currentPg:0},
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.data.currentPg = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzaList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPizzaList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPizzaList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { setCurrentPage } = pizzaListSlice.actions;
export default pizzaListSlice.reducer;