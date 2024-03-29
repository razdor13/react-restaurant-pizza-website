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
        loading: true,
        error: null,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.data.currentPg = action.payload;
        },
        setPizzaType: (state, action) => {
            state.data.settings.type = action.payload
        },
        setPizzaSize: (state, action) => {
            state.data.settings.size = action.payload
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
                state.settings = action.payload.pizzas.map(pizza => {
                    return {
                        [pizza.id] : {
                            type :pizza.types[0],
                            size :pizza.sizes[0],
                            count : 0
                        }
                    }
                })
            })
            .addCase(fetchPizzaList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { setCurrentPage } = pizzaListSlice.actions;
export const selectPizzas = (state) => state.pizzaList.data.pizzas;
export default pizzaListSlice.reducer;