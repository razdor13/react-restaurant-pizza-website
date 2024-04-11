import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import getPizzaBySort from "../../services/PizzaService";

export const fetchPizzaList = createAsyncThunk(
    "pizzaList/fetch",
    async (arg, thunkAPI) => {
        const activeIndex = thunkAPI.getState().filter;
        const {searchValue} = thunkAPI.getState().search;
        const {sortIndex} = thunkAPI.getState().sort;
        const {currentPg} = thunkAPI.getState().pizzaList.data;
        const response = await getPizzaBySort(
            sortIndex,
            activeIndex,
            searchValue,
            currentPg
        );
        const data = await response.json();
        return data;
    }
);

export const pizzaListSlice = createSlice({
    name: "pizzaList",
    initialState: {
        data: {pizzas: [], totalPages: 1, currentPg: 0},
        types: [],
        sizes: [],
        settings: [],
        loading: false,
        error: null,
        totalPrice: 0,
        totalCount: 0,
        cartList: [],
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.data.currentPg = action.payload;
        },
        setPizzaType: (state, action) => {
            const {pizzaId, newType} = action.payload;
            state.settings[pizzaId].type = newType;
        },
        setPizzaSize: (state, action) => {
            const {pizzaId, newSize} = action.payload;

            state.settings[pizzaId].size = newSize;
        },
        increasePizzaInMenu: (state, action) => {
            console.log(action.payload);
            const {total, id} = action.payload;
            state.settings[id].count = total;
        },
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
            state.settings.forEach((item) => {
                item.count = 0;
            });
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
            const {sectionIdInCart, id} = action.payload;
            console.log(sectionIdInCart, id);
            // Знаходимо піцу, яку потрібно видалити зі списку
            const pizzaToRemove = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdInCart
            );

            // Перевіряємо чи знайшли піцу, щоб видалити її зі списку
            if (pizzaToRemove) {
                // Видаляємо піцу зі списку
                state.cartList = state.cartList.filter(
                    (pizza) => pizza.sectionIdInCart !== sectionIdInCart
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

            // state.settings[id].count = state.cartList.
            const totalCountForId = state.cartList
                .filter((pizza) => pizza.id === id)
                .reduce((total, pizza) => total + pizza.count, 0);
            state.settings[id].count = totalCountForId;
            console.log(totalCountForId)
        },
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
                state.types = action.payload.types;
                state.sizes = action.payload.sizes;
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

export const {
    setCurrentPage,
    setPizzaSize,
    setPizzaType,
    increasePizzaInMenu,
    decreasePizzaInMenu,
    addPizzaInCart,
    removeAllPizzasFromCart,
    increaseCountPizzaSectionInCart,
    decreaseCountPizzaSectionInCart,
    removePizzaFromCart,
} = pizzaListSlice.actions;
export const selectPizzas = (state) => state.pizzaList.data.pizzas;
export const selectPrice = (state) => state.pizzaList.totalPrice;
export const selectCartList = (state) => state.pizzaList.cartList;
export default pizzaListSlice.reducer;
