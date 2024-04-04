import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: 0,
        totalCount: 0,
        cardList: [],
    },
    reducers: {
        addPizzaInCard: (state, action) => {
            const {id, typePizzaState, sizePizzaState, price} = action.payload;
            const sectionIdInCart = `${id}${typePizzaState}${sizePizzaState}`;

            const existingPizza = state.cardList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdInCart
            );

            if (existingPizza) {
                // Якщо піца з відповідним sectionIdInCart вже є в кошику, збільшуємо лічильник
                existingPizza.count += 1;
                existingPizza.totalIndividualPrice =
                    existingPizza.count * existingPizza.price;
            } else {
                // Якщо піци з відповідним sectionIdInCart немає в кошику, додаємо нову піцу
                state.cardList.push({
                    ...action.payload,
                    sectionIdInCart,
                    count: 1,
                    totalIndividualPrice: price,
                });
            }
            state.totalCount = state.cardList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cardList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        removeAllPizzasFromCart: (state,action) => {
            state.cardList = []
            state.totalCount = state.cardList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cardList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        }
    },
});

export const {addPizzaInCard ,removeAllPizzasFromCart } = cartSlice.actions;
export const selectPrice = (state) => state.card.totalPrice;
export const selectCartList = (state) => state.cart.cardList;
export default cartSlice.reducer;
