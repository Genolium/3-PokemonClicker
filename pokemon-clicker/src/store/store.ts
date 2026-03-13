import { configureStore } from "@reduxjs/toolkit";
import moneyReducer from "./moneySlice";
import pokemonReducer from "./pokemonThunks";

export const store = configureStore({
    reducer: {
        money: moneyReducer,
        pokemon: pokemonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;