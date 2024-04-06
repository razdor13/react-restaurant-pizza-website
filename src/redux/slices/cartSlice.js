import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: 0,
        totalCount: 0,
        cartList: [],
    },
    reducers: {
        addPizzaInCart: (state, action) => {
            const {id, typePizzaState, sizePizzaState, price} = action.payload;
            const sectionIdInCart = `${id}${typePizzaState}${sizePizzaState}`;

            const existingPizza = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdInCart
            );

            if (existingPizza) {
                // Якщо піца з відповідним sectionIdInCart вже є в кошику, збільшуємо лічильник
                existingPizza.count += 1;
                existingPizza.totalIndividualPrice =
                    existingPizza.count * existingPizza.price;
            } else {
                // Якщо піци з відповідним sectionIdInCart немає в кошику, додаємо нову піцу
                state.cartList.push({
                    ...action.payload,
                    sectionIdInCart,
                    count: 1,
                    totalIndividualPrice: price,
                });
            }
            state.totalCount = state.cartList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cartList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        removeAllPizzasFromCart: (state, action) => {
            state.cartList = [];
            state.totalCount = state.cartList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cartList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        decreaseCountPizzaSectionInCart: (state, action) => {
            const sectionIdToDecrease = action.payload;

            // Знаходимо піцу за sectionIdInCart
            const pizzaToDecrease = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdToDecrease
            );
            console.log(pizzaToDecrease.count);
            if (pizzaToDecrease && pizzaToDecrease.count > 1) {
                pizzaToDecrease.count -= 1; // Зменшуємо кількість на одиницю
                pizzaToDecrease.totalIndividualPrice =
                    pizzaToDecrease.count * pizzaToDecrease.price; // Оновлюємо ціну за кількість
            }
            state.totalCount = state.cartList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cartList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        increaseCountPizzaSectionInCart: (state, action) => {
            const sectionIdToIncrease = action.payload;

            // Знаходимо піцу за sectionIdInCart
            const pizzaToIncrease = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdToIncrease
            );

            // Перевіряємо чи знайшли піцу, щоб збільшити кількість на одиницю
            if (pizzaToIncrease) {
                pizzaToIncrease.count += 1; // Збільшуємо кількість на одиницю
                pizzaToIncrease.totalIndividualPrice =
                    pizzaToIncrease.count * pizzaToIncrease.price; // Оновлюємо ціну за кількість
            }

            // Перераховуємо загальну кількість та ціну всього кошика
            state.totalCount = state.cartList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cartList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
        removePizzaFromCart: (state, action) => {
            const sectionIdToRemove = action.payload;
        
            // Знаходимо піцу, яку потрібно видалити зі списку
            const pizzaToRemove = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdToRemove
            );
        
            // Перевіряємо чи знайшли піцу, щоб видалити її зі списку
            if (pizzaToRemove) {
                // Видаляємо піцу зі списку
                state.cartList = state.cartList.filter(
                    (pizza) => pizza.sectionIdInCart !== sectionIdToRemove
                );
            }
        
            // Перераховуємо загальну кількість та ціну всього кошика
            state.totalCount = state.cartList.reduce(
                (total, pizza) => total + pizza.count,
                0
            );
            state.totalPrice = state.cartList.reduce(
                (total, pizza) => total + pizza.price * pizza.count,
                0
            );
        },
    },
});

export const {
    addPizzaInCart,
    removeAllPizzasFromCart,
    increaseCountPizzaSectionInCart,
    decreaseCountPizzaSectionInCart,
    removePizzaFromCart
} = cartSlice.actions;
export const selectPrice = (state) => state.cart.totalPrice;
export const selectCartList = (state) => state.cart.cartList;
export default cartSlice.reducer;
