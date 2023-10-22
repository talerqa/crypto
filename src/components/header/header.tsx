import logo from "@/assets/logo.png";
import {TypeData} from "@/servicies/baseApi.ts";
import s from './header.module.scss'
import {NavLink} from "react-router-dom";

type HeaderProps = {
  data: TypeData[] | undefined
}

export const Header = (props: HeaderProps) => {
  return <header className={s.header}>
    <div className={s.headerContanier}>
      <NavLink to={'/'} className={s.logoBlock}>
        <img src={logo} alt="LOGO" className={s.logoImg}/>
        <a href='#' className={s.logoTitle}>Crypto Market</a>
      </NavLink>
      <div className={s.firstThreeCoin}>
        {props.data?.map((item: TypeData) => {
          return <NavLink to={`/${item.id}`} key={item.id} className={s.itemCoin}>
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