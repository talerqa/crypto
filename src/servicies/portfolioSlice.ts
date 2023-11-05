import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";

const initialState: TypeDataInPortfolio[] = JSON.parse(localStorage.getItem('value') || '[]');

const slice = createSlice({
  name: 'coinPortfolio',
  initialState,
  reducers: {
    getCoin: (_:any, action: PayloadAction<{ coin: any }>) => {
      return action.payload.coin;
    },
    deleteCoins: () => {
      return []
    }
  },
})

export const portfolioAction = slice.actions;
export const portfolioSlice = slice.reducer;