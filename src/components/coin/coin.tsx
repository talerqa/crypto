import {NavLink, useParams} from "react-router-dom";
import {TypeData} from "@/servicies/baseApi.ts";

type Props = {
  data: any
}

export const Coin = (props: Props) => {


  const params = useParams();
  const coin = props.data.filter((item: TypeData) => item.id === params.id ? item : '')

  return <div>
    {coin.map((item: TypeData) => {
      return <>
        <p>{item.rank}</p>
        <a href={`https://coinmarketcap.com/currencies/${item.name.toLowerCase().replace(/ /g, '-')}/`}>
          {item.name} </a>
        <NavLink to={`/${item.id}`}>
          <img
            src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
            alt={`${item.name}-img`}/>
          <a
            href={`https://coinmarketcap.com/currencies/${item.id}/`}
            target='_blank'>
            <p>{item.name}</p>
          </a></NavLink>
        <p>{item.symbol}</p>

        <p>{Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>

        <p>{item.marketCapUsd}</p>
        <p>{item.supply}</p>
        <p>{item.volumeUsd24Hr}</p>
        <p>{item.changePercent24Hr}</p>
        <p>{item.vwap24Hr}</p></>
    })}
  </div>
}
