import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Coin'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery(
    {
      baseUrl: 'https://api.coincap.io/v2/',
    }),
  endpoints: (builder) => ({
    getAssets:
      builder.query<ResponseData, TypeDataPick | void>({
        query: params => ({
          url: 'assets',
          params: params ?? {},
          method: "GET",
        }),
        providesTags: ['Coin'],
      }),
    getHistoryCoin:
      builder.query<any, GetChart>({
        query: params => ({
          url: `assets/${params.id}/history`,
          params: params,
          method: 'GET',
        }),
        providesTags: ['Coin'],

      })
  }),
})

export const {
  useGetAssetsQuery,
  useGetHistoryCoinQuery,
} = baseApi


export type GetChart = {
  id?: string
  interval?: string
  start?: any,
  end?: any
}

export type ResponseData = {
  data: TypeData[];
}
export type TypeData = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

type TypeDataPick = Partial<TypeData> & { search: string }