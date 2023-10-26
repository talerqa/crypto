import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeData} from "@/servicies/baseApi.type.ts";

const initialState: TypeData[] = []
console.log(initialState)
export const slice = createSlice({
  name: 'coinPortfolio',
  initialState,
  reducers: {
    addCoinInPortfolio: (state, action: PayloadAction<{ coin: TypeData }>) => {
      state.push(action.payload.coin)
    }
  },
  extraReducers: () => {
  },
})

export const {addCoinInPortfolio} = slice.actions
export const coinPortfolio = slice.reducer