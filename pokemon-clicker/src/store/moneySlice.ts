import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MoneyState {
    balance: number;
}

const initialState: MoneyState = {
    balance: 0,
}

const moneySlice = createSlice({
    name: 'money',
    initialState,
    reducers: {
        addMoney: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
        },
        substractMoney: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload;
        },
    }
})

export const { addMoney, substractMoney } = moneySlice.actions;
export default moneySlice.reducer;