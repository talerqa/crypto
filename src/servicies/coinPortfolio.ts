import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";

const initialState: Array<TypeDataInPortfolio> = JSON.parse(localStorage.getItem('value') || '{}').length ? JSON.parse(localStorage.getItem('value') || '{}') : []

export const slice = createSlice({
  name: 'coinPortfolio',
  initialState,
  reducers: {
    addCoinInPortfolio: (state, action: PayloadAction<any>) => {
      // {
      //   coin: TypeData[],
      //     valueOfCoin?: string | number | null
      // }
      state.push({
        ...action.payload.coin[0],
        valueOfCoin: Number(action.payload.valueOfCoin)
      })
    }
  },
  extraReducers: () => {
  },
})

export const {addCoinInPortfolio} = slice.actions
export const coinPortfolio = slice.reducer