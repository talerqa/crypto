import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Coin'],
  baseQuery: fetchBaseQuery(
    {
      baseUrl: 'https://api.coincap.io/v2/',
    }),
  endpoints: (builder) => ({
    getAssets:
      builder.query<ResponseData, TypeDataPick | void>({
        query: params => ({
          url: '/assets',
          params: params ?? {},
          method: "GET",

        }),
        providesTags: ['Coin'],
      }),
  }),
})

export const {useGetAssetsQuery} = baseApi


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