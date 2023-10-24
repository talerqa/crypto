import logo from "@/assets/logo.png";
import s from './header.module.scss'
import {NavLink} from "react-router-dom";
import {TypeData} from "@/servicies/baseApi.type.ts";

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
                          className={s.itemCoin}>
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
      <div>PORTFEL</div>
    </div>
  </header>
}