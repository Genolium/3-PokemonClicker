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

store.subscribe(() => {
    const currentEmail = localStorage.getItem('pokemon_user_email');

    if (currentEmail) {
        const state = store.getState();

        const saveToStore = {
            balance: state.money.balance,
            pokemons: state.pokemon.items,
        };

        localStorage.setItem(`save_${currentEmail}`, JSON.stringify(saveToStore));
    }
});