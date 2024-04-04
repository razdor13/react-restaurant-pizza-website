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
        types: [],
        sizes: [],
        settings: {},
        loading: false,
        error: null, 
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.data.currentPg = action.payload;
        },
        setPizzaType: (state, action) => {
            const { pizzaId, newType } = action.payload;
            state.settings[pizzaId].type = newType;
        },
        setPizzaSize: (state, action) => {
            const { pizzaId, newSize } = action.payload;
            
            state.settings[pizzaId].size = newSize;
        },
        increase : (state,action)=> {
            
            const id = action.payload;
            state.settings[id].count ++;
        },
        decrease : (state,action)=> {
            const id = action.payload;
            state.settings[id].count --;
        },
        remove : (state,action) => {
            Object.values(state.settings).forEach((setting) => setting.count = 0);
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
                state.types = action.payload.types
                state.sizes = action.payload.sizes
                action.payload.pizzas.forEach((pizza) => {
                    if (!state.settings[pizza.id]) {
                        state.settings[pizza.id] = {
                            type: action.payload.types[0],
                            size: action.payload.sizes[0],
                            count: 0,
                        };
                    }
                });
            })
            .addCase(fetchPizzaList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { setCurrentPage,setPizzaSize,setPizzaType,increase , remove} = pizzaListSlice.actions;
export const selectPizzas = (state) => state.pizzaList.data.pizzas;

export default pizzaListSlice.reducer;