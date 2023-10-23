import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
  GetChart,
  ResponseData,
  TypeDataPick
} from "@/servicies/baseApi.type.ts";


export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Coin'],
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery(
    {
      baseUrl: 'https://api.coincap.io/v2/',
    }),
  endpoints: (builder) => ({
    getAssets:
      builder.query<ResponseData, TypeDataPick | void | null>({
        query: params => ({
          url: 'assets',
          params: params ?? {},
          method: "GET",
        }),
        providesTags: ['Coin'],
      }),
    getAssetsMu:
      builder.mutation<ResponseData, TypeDataPick | void>({
        query: params => ({
          url: 'assets',
          params: params ?? {},
          method: "GET",
        }),
        invalidatesTags: ['Coin'],
      }),
    getHistoryCoin:
      builder.query<any, GetChart>({
        query: params => ({
          url: `assets/${params.id}/history`,
          params: params,
          method: 'GET',
        }),
        providesTags: ['Coin']
      })
  }),
})

export const {
  useGetAssetsQuery,
  useGetHistoryCoinQuery,
  useGetAssetsMuMutation
} = baseApi

