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
        addPizzaInCart: (state, action) => {
            const { id, typePizzaState, sizePizzaState, price } = action.payload;
            const sectionIdInCart = `${id}${typePizzaState}${sizePizzaState}`;
        
            const existingPizza = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdInCart
            );
        
            if (existingPizza) {
                // Якщо піца з відповідним sectionIdInCart вже є в кошику, збільшуємо лічильник
                state.cartList = state.cartList.map((pizza) =>
                    pizza.sectionIdInCart === sectionIdInCart
                        ? {
                            ...pizza,
                            count: pizza.count + 1,
                            totalIndividualPrice: (pizza.count + 1) * pizza.price,
                        }
                        : pizza
                );
                state.totalCount += 1;
                state.totalPrice += price;
                state.settings[id].count += 1;
            } else {
                // Якщо піци з відповідним sectionIdInCart немає в кошику, додаємо нову піцу
                state.cartList.push({
                    ...action.payload,
                    sectionIdInCart,
                    count: 1,
                    totalIndividualPrice: price,
                });
                state.totalCount += 1;
                state.totalPrice += price;
                state.settings[id].count += 1;
            }
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
            const {sectionIdInCart, id} = action.payload;
        
            // Знаходимо піцу за sectionIdInCart
            const pizzaToDecrease = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdInCart
            );
        
            // Якщо знайдено піцу і її кількість більше одиниці, зменшуємо кількість на одиницю
            if (pizzaToDecrease && pizzaToDecrease.count > 1) {
                pizzaToDecrease.count--; 
                pizzaToDecrease.totalIndividualPrice = pizzaToDecrease.count * pizzaToDecrease.price;
            }
        
            // Обчислюємо загальну кількість піц та їхня загальна ціна в кошику
            state.totalCount = state.cartList.reduce((total, pizza) => total + pizza.count, 0);
            state.totalPrice = state.cartList.reduce((total, pizza) => total + pizza.price * pizza.count, 0);
        
            // Обчислюємо кількість піц за певним id
            const countById = state.cartList.filter((pizza) => pizza.id === id).length;
            // Якщо кількість піц за певним id у стані більше, ніж в кошику, зменшуємо кількість на одиницю
            state.settings[id].count > countById && state.settings[id].count--;
        },
        increaseCountPizzaSectionInCart: (state, action) => {
            const {sectionIdInCart, id} = action.payload;

            // Знаходимо піцу за sectionIdInCart
            const pizzaToIncrease = state.cartList.find(
                (pizza) => pizza.sectionIdInCart === sectionIdInCart
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
            state.settings[id].count++;
        },
        removePizzaFromCart: (state, action) => {
            const {sectionIdInCart, id} = action.payload;
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
