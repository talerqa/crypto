import logo from "@/assets/logo.png";
import s from './header.module.scss'
import {NavLink} from "react-router-dom";
import {TypeData, TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";
import {useAppSelector} from "@/hooks.ts";

export const Header = (props: any) => {
  const {data} = props

  const firstThreeCoin = data?.filter((item: TypeData) => item.rank ===
  '1' || item.rank === '2' || item.rank === '3' ? item : '')


  return <header className={s.header}>
    <div className={s.headerContanier}>
      <NavLink to={'/'} className={s.logoBlock}>
        <img src={logo} alt="LOGO" className={s.logoImg}/>
        <span className={s.logoTitle}>Crypto</span>
      </NavLink>
      <div className={s.firstThreeCoin}>
        {firstThreeCoin?.map((item: TypeData) => {
          return <NavLink to={`/${item.id}`} key={item.id}
                          className={s.itemCoin} >
            <img className={s.logoCoin}
                 src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                 alt={`${item.id}-logo`}/>
            <div className={s.namePriceBlock}>
              <p className={s.itemNameCoin}>{item.name}
                <span>({item.symbol})</span></p>
              <p className={s.price}>
                {Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                <span> $</span>
              </p>
            </div>
          </NavLink>
        })}

      </div>
      <Portfolio/>
    </div>
  </header>
}


export const Portfolio = () => {
  const coinPortfolio = useAppSelector(state => state.coinPortfolio)

  let a = []
  coinPortfolio.map((item: TypeDataInPortfolio) => {
    const neObj = {
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      valueOfCoin: Number(item.valueOfCoin),
      totalPrice: Number(item.valueOfCoin) * Number(item.priceUsd)
    }
    a.push(neObj)
  })
  let totalCoinInPortfolio = a.reduce((acc: any, obj) => {
    const foundIndex = acc.findIndex((item: any) => item.id === obj.id);
    if (foundIndex === -1) {
      acc.push(obj);
    } else {
      acc[foundIndex].valueOfCoin += obj.valueOfCoin
      acc[foundIndex].totalPrice += obj.totalPrice;
    }
    return acc;
  }, [])
  localStorage.setItem('value', JSON.stringify(totalCoinInPortfolio))


  return <div>
    {totalCoinInPortfolio.map((item: {
      id: string,
      symbol: string,
      name: string,
      valueOfCoin: number,
      totalPrice: number
    }) => {
      return <div>
        <p> {item.id}</p>
        <p>{item.name}</p>
        <p>{item.symbol}</p>
        <p> {item.valueOfCoin}</p>
        <p>{item.totalPrice}</p>
      </div>
    })}
  </div>

}