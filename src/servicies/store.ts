import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {baseApi} from "@/servicies/baseApi.ts";
import {coinPortfolio} from "@/servicies/coinPortfolio.ts";
import {portfolio} from "@/servicies/portfolio.ts";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    coinPortfolio: coinPortfolio,
    portfolio: portfolio
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch