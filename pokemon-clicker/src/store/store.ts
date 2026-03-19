import { configureStore } from "@reduxjs/toolkit";
import moneyReducer from "./moneySlice";
import pokemonReducer from "./pokemonThunks";
import inventoryReducer from "./inventorySlice";
import shopReducer from "./shopSlice";

export const store = configureStore({
    reducer: {
        money: moneyReducer,
        pokemon: pokemonReducer,
        inventory: inventoryReducer,
        shop: shopReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
