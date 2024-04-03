import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: 0,
        cardList: [],
    },
    reducers: {
        addPizzaInCard: (state, action) => {
            state.cardList.push(action.payload);
        },
    },
});

export const {addPizzaInCard} = cartSlice.actions;
export const selectPrice = (state) => state.card.totalPrice;
export const selectCartList = (state) => state.cart.cardList;
export default cartSlice.reducer;
