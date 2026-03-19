import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ShopItem } from '../types/shop';

const SHOP_CONFIG = [
  { name: 'poke-ball',    w: 1, h: 1, category: 'pokeballs' as const },
  { name: 'great-ball',   w: 1, h: 1, category: 'pokeballs' as const },
  { name: 'ultra-ball',   w: 1, h: 1, category: 'pokeballs' as const },
  { name: 'oran-berry',   w: 2, h: 2, category: 'berries' as const },
  { name: 'sitrus-berry', w: 2, h: 2, category: 'berries' as const },
];

export const fetchShopItems = createAsyncThunk<ShopItem[], void>(
  'shop/fetchItems',
  async () => {
    const itemPromises = SHOP_CONFIG.map(async (itemMeta) => {
      const response = await fetch(`https://pokeapi.co/api/v2/item/${itemMeta.name}`);
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        cost: 1000,
        sprite: data.sprites.default,
        category: itemMeta.category,
        w: itemMeta.w,
        h: itemMeta.h,
      };
    });

    const items = await Promise.all(itemPromises);
    return items;
  }
);

interface ShopState {
  items: ShopItem[];
  loading: boolean;
}

const initialState: ShopState = {
  items:[],
  loading: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default shopSlice.reducer;
