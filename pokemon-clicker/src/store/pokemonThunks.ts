import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
    reducers: {
        setPokemons: (state, action) => { state.items = action.payload; },
        feedPokemon: (state, action: PayloadAction<{ id: number, weightIncrease: number }>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index].weight += action.payload.weightIncrease;
            }
        },
        renamePokemon: (state, action: PayloadAction<{ id: number, name: string }>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index].nickname = action.payload.name;
            }
        },
        removePokemon: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(p => p.id !== action.payload);
        },
        tickPokemonsIncome: (state) => {
            state.items.forEach(p => {
                if (!p.totalEarned) p.totalEarned = 0;
                p.totalEarned += (p.weight || 0);
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomPokemon.pending, (state) => {
            state.loading = true;
        }).addCase(fetchRandomPokemon.fulfilled, (state, action) => {
            state.loading = false;
            state.items.push({
                ...action.payload,
                nickname: action.payload.name,
                caughtAt: Date.now(),
                totalEarned: 0
            });
        }).addCase(fetchRandomPokemon.rejected, (state) => {
            state.loading = false;
        });
    }
})

export const { setPokemons, feedPokemon, renamePokemon, removePokemon, tickPokemonsIncome } = pokemonSlice.actions;
export default pokemonSlice.reducer