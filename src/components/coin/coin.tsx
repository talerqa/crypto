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
import {ArrowUp} from "@/assets/arrowUp.tsx";
import {ArrowDown} from "@/assets/arrowDown.tsx";

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
      return <div key={item.id} className={s.coinInformation}>
        <div className={s.coinSymbolImg}>
          <img className={s.imgCoin}
               src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
               alt={`${item.name}-img`}/>
          <p className={s.symbol}>{item.symbol}</p>
        </div>
        <a target={'_blank'}
           className={s.name}
           href={`https://coinmarketcap.com/currencies/${item.name.toLowerCase().replace(/ /g, '-')}/`}>
          {item.name} </a>
        <p className={s.price}>
          Price:
          <span> {Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
          $
        </p>
        <div className={s.infoSecond}>
          <p className={s.marketCup}>
            Market Cap:
            <span> {(((Number(item.marketCapUsd) * 10) / 10) / 1000000000).toFixed(2)} </span>
            b, $</p>
          <p className={s.circulatingSupply}>
            Circulating Supply:
            <span> {(((Number(item.supply) * 10) / 10) / 1000000).toFixed(2)} </span>
            m
          </p>
          <p className={s.volumeUsd}>
            Volume (24h) $
            <span> {(((Number(item.volumeUsd24Hr) * 10) / 10) / 1000000000).toFixed(2)} </span>
            m
          </p>
          <p className={s.volumeData}>
            Volume:
            <span
              className={Number(item.changePercent24Hr) > 0 ? s.up : s.down}>
            {Number(item.changePercent24Hr).toFixed(2)}
          </span>
            {Number(item.changePercent24Hr) > 0
              ? <ArrowUp/>
              : <ArrowDown/>
            } (24h %)
          </p>
          <p className={s.volumeWA}>
            Volume WA
            <span>
            {Number(item.vwap24Hr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
          </span>
            (24Hr)
          </p>
        </div>
      </div>
    })}
    <div className={s.table}>
      <h4 className={s.titleStatTable}>Statistics for the last month</h4>
      {data?.data && <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.data}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="6 6"/>
              <XAxis tickFormatter={(value) => value + 1} interval={1}/>
              <YAxis tickFormatter={(value) => `$${value}`}/>
              <Tooltip
                  separator={": "}
                  labelFormatter={(value) => `Day ${value + 1}`}
                  formatter={(value: string) => [
                    `${Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
                    "Price"]}/>
              <Line type="monotone" dataKey="priceUsd" stroke="#e73919"
                    activeDot={{r: 8}}/>
          </LineChart>
      </ResponsiveContainer>}
    </div>
  </div>
}
