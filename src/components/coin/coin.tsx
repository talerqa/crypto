import {useParams} from "react-router-dom";
import { useGetHistoryCoinQuery} from "@/servicies/baseApi.ts";
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


type Props = {
  data: any
}


const timeNow = Date.now();
const MONTH_MILLISECONDS = 2_592_000_000;
const timeMonthAgo = timeNow - MONTH_MILLISECONDS;


// export const formatNumber = (number: number): string => {
//   const match = number.toString().match(/^[+-]?0\.(0*)/);
//   if (match === null) {
//     const expMatch = number.toString().match(/(^[+-]?[1-9]\.[0-9]*)([eE][-+][0-9]*)/);
//     if (expMatch === null) {
//       const abbreviations = ['', 'k', 'm', 'b', 't'];
//       const index = Math.floor(Math.log10(Math.abs(number) === 0 ? 1 : Math.abs(number)) / 3);
//       const abbreviation = abbreviations[index];
//       const value = (number / (10 ** (index * 3))).toFixed(2);
//       return `${value}${abbreviation}`;
//     } else {
//       return `${parseFloat(expMatch[1]).toFixed(2)}${expMatch[2]}`;
//     }
//   }
//   return number.toFixed(2 + match[1].length);
// }

export const Coin = (props: Props) => {

  const params = useParams();
  const coin = props.data.filter((item: TypeData) => item.id === params.id ? item : '')

  const {data, isLoading} = useGetHistoryCoinQuery({
    id: coin[0].id,
    interval: 'd1',
    start: timeMonthAgo,
    end: timeNow
  })

  return <div style={{width: '1000px', height: '700px'}}>
    {isLoading && <Loader/>}
    {coin.map((item: TypeData) => {
      return <div key={item.id}>
        <p>{item.rank}</p>
        <a target={'_blank'}
          href={`https://coinmarketcap.com/currencies/${item.name.toLowerCase().replace(/ /g, '-')}/`}>
          {item.name} </a>
        {/*<NavLink to={`/${item.id}`}>*/}
        {/*  <img*/}
        {/*    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}*/}
        {/*    alt={`${item.name}-img`}/>*/}
        {/*  <a*/}
        {/*    href={`https://coinmarketcap.com/currencies/${item.id}/`}*/}
        {/*    target='_blank'>*/}
        {/*    {item.name}*/}
        {/*  </a></NavLink>*/}
        <p>{item.symbol}</p>
        <p>{Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
        <p>{item.marketCapUsd}</p>
        <p>{item.supply}</p>
        <p>{item.volumeUsd24Hr}</p>
        <p>{item.changePercent24Hr}</p>
        <p>{item.vwap24Hr}</p></div>
    })}


    <div style={{
      width: '100%',
      height: '100%'
    }}>
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
                    `${value}`,
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
