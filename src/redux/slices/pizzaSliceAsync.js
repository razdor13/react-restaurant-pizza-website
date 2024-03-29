import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'






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

const getPizzaBySort = async (sort,filterByCatgr,filterBySearch,numberPage) => {
    const _apiBase = `${location.protocol}//${location.host}/pizzas/sorted`
    const limitItemOnPage = 8
    const pathOfPagination = `&numberPage=${numberPage}&limitItemOnPage=${limitItemOnPage}`
    const path=`${_apiBase}?sortBy=${sort}&filterByCategory=${filterByCatgr}&filterBySearch=${filterBySearch}${pathOfPagination}`
    const res = await fetch(path)
    console.log(res)
    return res
}

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