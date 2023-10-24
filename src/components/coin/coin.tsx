import {useParams} from "react-router-dom";
import {useGetHistoryCoinQuery} from "@/servicies/baseApi.ts";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {Loader} from "@/components/loader";
import {TypeData} from "@/servicies/baseApi.type.ts";
import s from './coin.module.scss'

type Props = {
  data?: TypeData[]
}

const timeNow = Date.now();
const MONTH_MILLISECONDS = 2_592_000_000;
const timeMonthAgo = timeNow - MONTH_MILLISECONDS;

export const Coin = (props: Props) => {

  const params = useParams();
  const coin = props.data?.filter((item: TypeData) => item.id === params.id ? item : '')

  const {data, isLoading} = useGetHistoryCoinQuery({
    id: params.id,
    interval: 'd1',
    start: timeMonthAgo,
    end: timeNow
  })

  return <div className={s.coinBlock}>
    {isLoading && <Loader/>}
    {coin?.map((item: TypeData) => {
      return <div key={item.id}>
        <a target={'_blank'}
           href={`https://coinmarketcap.com/currencies/${item.name.toLowerCase().replace(/ /g, '-')}/`}>
          {item.name} </a>
        <img
          src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
          alt={`${item.name}-img`}/>
        <p>{item.symbol}</p>
        <p>{Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
        <p>{(((Number(item.marketCapUsd) * 10) / 10) / 1000000000).toFixed(2)} b</p>
        <p>{(((Number(item.supply) * 10) / 10) / 1000000).toFixed(2)}m</p>
        <p>{(((Number(item.volumeUsd24Hr) * 10) / 10) / 1000000000).toFixed(2)} m</p>
        <p>{Number(item.changePercent24Hr).toFixed(2)}</p>
        <p>{Number(item.vwap24Hr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
      </div>
    })}

    <div className={s.table}>
      {data?.data && <ResponsiveContainer width="100%" height="100%">
          <LineChart
              data={data.data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis tickFormatter={(value) => value + 1} interval={1}/>
              <YAxis tickFormatter={(value) => `$${value}`}/>
              <Tooltip
                  separator={": "}
                  labelFormatter={(value) => `Day ${value + 1}`}
                  formatter={(value: string) => [
                    `${Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
                    "Price",
                  ]}
              />
              <Line type="monotone" dataKey="priceUsd" stroke="#e73919"
                    activeDot={{r: 8}}/>
          </LineChart>
      </ResponsiveContainer>}
    </div>
  </div>
}
