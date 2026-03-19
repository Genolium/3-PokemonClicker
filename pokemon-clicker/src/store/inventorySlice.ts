import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InventoryItem } from '../types/inventory';

const GRID_W = 5;
const GRID_H = 11;

interface InventoryState {
    items: InventoryItem[];
}

const initialState: InventoryState = {
    items: [],
};

export const canFit = (
    items: InventoryItem[],
    targetX: number,
    targetY: number,
    w: number,
    h: number,
    ignoreUid?: string
) => {
    if (targetX < 0 || targetY < 0 || targetX + w > GRID_W || targetY + h > GRID_H) {
        return false;
    }

    for (const item of items) {
        if (item.uid === ignoreUid) continue;

        const isIntersecting = !(
            targetX >= item.x + item.w ||
            targetX + w <= item.x ||
            targetY >= item.y + item.h ||
            targetY + h <= item.y
        );

        if (isIntersecting) return false;
    }

    return true;
};

export const findFirstFreeSpot = (items: InventoryItem[], w: number, h: number) => {
    for (let y = 0; y <= GRID_H - h; y++) {
        for (let x = 0; x <= GRID_W - w; x++) {
            if (canFit(items, x, y, w, h)) {
                return { x, y };
            }
        }
    }
    return null;
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<InventoryItem, 'x' | 'y' | 'uid'>>) => {
            const spot = findFirstFreeSpot(state.items, action.payload.w, action.payload.h);
            if (spot) {
                state.items.push({
                    ...action.payload,
                    uid: Date.now().toString() + Math.random().toString(),
                    x: spot.x,
                    y: spot.y,
                });
            }
        },
        moveItem: (state, action: PayloadAction<{ uid: string; newX: number; newY: number }>) => {
            const { uid, newX, newY } = action.payload;
            const itemIndex = state.items.findIndex(i => i.uid === uid);
            if (itemIndex === -1) return;

            const item = state.items[itemIndex];

            if (canFit(state.items, newX, newY, item.w, item.h, uid)) {
                state.items[itemIndex].x = newX;
                state.items[itemIndex].y = newY;
            }
        },
        setInventory: (state, action: PayloadAction<InventoryItem[]>) => {
            state.items = action.payload;
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.uid !== action.payload);
        }
    }
});

export const { addItem, moveItem, setInventory, removeItem } = inventorySlice.actions;
export default inventorySlice.reducer;