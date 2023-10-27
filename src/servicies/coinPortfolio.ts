import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeData, TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";

const initialState: Array<TypeDataInPortfolio>  = []
console.log(initialState)
export const slice = createSlice({
  name: 'coinPortfolio',
  initialState,
  reducers: {
    addCoinInPortfolio: (state, action: PayloadAction<{ coin: TypeData[], valueOfCoin: string | number }>) => {


      state.push({...action.payload.coin[0], valueOfCoin: action.payload.valueOfCoin})
    }
  },
  extraReducers: () => {
  },
})

export const {addCoinInPortfolio} = slice.actions
export const coinPortfolio = slice.reducer