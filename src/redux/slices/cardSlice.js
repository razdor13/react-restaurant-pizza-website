import {createSlice} from "@reduxjs/toolkit";
import {increase} from "./pizzaSliceAsync";

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
        removeAllPizzasFromCart: (state, action) => {
            state.cardList = [];
            state.totalCount = state.cardList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cardList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        decreaseCountPizzaSectionInCart: (state, action) => {
            const sectionIdToDecrease = action.payload;

            // Знаходимо піцу за sectionIdInCart
            const pizzaToDecrease = state.cardList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdToDecrease
            );
            console.log(pizzaToDecrease.count);
            if (pizzaToDecrease && pizzaToDecrease.count > 1) {
                pizzaToDecrease.count -= 1; // Зменшуємо кількість на одиницю
                pizzaToDecrease.totalIndividualPrice =
                    pizzaToDecrease.count * pizzaToDecrease.price; // Оновлюємо ціну за кількість
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
        increaseCountPizzaSectionInCart: (state, action) => {
            const sectionIdToIncrease = action.payload;

            // Знаходимо піцу за sectionIdInCart
            const pizzaToIncrease = state.cardList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdToIncrease
            );

            // Перевіряємо чи знайшли піцу, щоб збільшити кількість на одиницю
            if (pizzaToIncrease) {
                pizzaToIncrease.count += 1; // Збільшуємо кількість на одиницю
                pizzaToIncrease.totalIndividualPrice =
                    pizzaToIncrease.count * pizzaToIncrease.price; // Оновлюємо ціну за кількість
            }

            // Перераховуємо загальну кількість та ціну всього кошика
            state.totalCount = state.cardList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cardList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        removePizzaFromCart: (state, action) => {
            const sectionIdToRemove = action.payload;
        
            // Знаходимо піцу, яку потрібно видалити зі списку
            const pizzaToRemove = state.cardList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdToRemove
            );
        
            // Перевіряємо чи знайшли піцу, щоб видалити її зі списку
            if (pizzaToRemove) {
                // Видаляємо піцу зі списку
                state.cardList = state.cardList.filter(
                    (pizza) => pizza.sectionIdInCart !== sectionIdToRemove
                );
            }
        
            // Перераховуємо загальну кількість та ціну всього кошика
            state.totalCount = state.cardList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cardList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
    },
});

export const {
    addPizzaInCard,
    removeAllPizzasFromCart,
    increaseCountPizzaSectionInCart,
    decreaseCountPizzaSectionInCart,
    removePizzaFromCart
} = cartSlice.actions;
export const selectPrice = (state) => state.card.totalPrice;
export const selectCartList = (state) => state.cart.cardList;
export default cartSlice.reducer;
