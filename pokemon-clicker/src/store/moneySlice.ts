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
        subtractMoney: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload;
        },
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        }
    }
})

export const { addMoney, subtractMoney, setBalance } = moneySlice.actions;
export default moneySlice.reducer;