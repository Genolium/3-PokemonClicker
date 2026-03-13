import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Pokemon } from "../types/pokemon";

export const fetchRandomPokemon = createAsyncThunk<Pokemon, void>("pokemon/fetchRandomPokemon", async () => {
    const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50000');
    const listData = await listResponse.json();

    const randomPokemon = listData.results[Math.floor(Math.random() * listData.results.length)];

    const pokemonResponse = await fetch(randomPokemon.url);
    const pokemonData = await pokemonResponse.json();

    return pokemonData;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        items: [] as Pokemon[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRandomPokemon.pending, (state) => {
            state.loading = true;
        }).addCase(fetchRandomPokemon.fulfilled, (state, action) => {
            state.loading = false;
            state.items = [action.payload];
        }).addCase(fetchRandomPokemon.rejected, (state) => {
            state.loading = false;
        });
    }
})

export default pokemonSlice.reducer