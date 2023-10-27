
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

export type TypeDataPick = Partial<TypeData> & { search?: string, limit?: number, offset?: number }

export type TypeDataInPortfolio = TypeData & {valueOfCoin: string | number}