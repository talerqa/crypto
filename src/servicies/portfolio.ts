import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";

const initialState: Array<TypeDataInPortfolio> = JSON.parse(localStorage.getItem('value') || '{}')?.length ? JSON.parse(localStorage.getItem('value') || '{}') : []


export const slice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    getCoin: (_: any, action: PayloadAction<{ coin: any }>) => {
      return action.payload.coin
    },
    deleteCoin: () => {
      return []
    }
  },
  extraReducers: () => {
  },
})

export const portfolioAction = slice.actions
export const portfolio = slice.reducer