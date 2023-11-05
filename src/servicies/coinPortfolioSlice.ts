import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";

const initialState: Array<TypeDataInPortfolio> = JSON.parse(localStorage.getItem('value') || '{}').length ? JSON.parse(localStorage.getItem('value') || '{}') : []

const slice = createSlice({
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
      localStorage.setItem('value', JSON.stringify(state))
    },
    deleteCoin: (state, action: PayloadAction<{ id: any }>) => {
      return state.filter(item => item.id !== action.payload.id)
    }
  },
})

export const coinPortfiloAction = slice.actions
export const coinPortfolio = slice.reducer