import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {useEffect} from "react";
import {portfolioAction} from "@/servicies/portfolio.ts";
import {TypeData, TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";
import s from './portfolio.module.scss'

export const Portfolio = () => {

  const coinPortfolio = useAppSelector(state => state.coinPortfolio)
  const portfolio = useAppSelector(state => state.portfolio)

  const dispatch = useAppDispatch()
  const {getCoin, deleteCoin} = portfolioAction

  console.log(coinPortfolio)

  useEffect(() => {
    let a: TypeData[] = []
    let totalCoinInPortfolio: TypeData[] = []

    if (coinPortfolio.length) {
      coinPortfolio.map((item: TypeDataInPortfolio) => {
        const neObj = {
          ...item,
          valueOfCoin: Number(item.valueOfCoin),
          totalPrice: Number(item.valueOfCoin) * Number(item.priceUsd)
        }
        a.push(neObj)
      })

      totalCoinInPortfolio = a.reduce((acc: TypeDataInPortfolio[], obj: any) => {
        const foundIndex = acc.findIndex((item: TypeDataInPortfolio) => item.id === obj.id);
        if (foundIndex === -1) {
          acc.push(obj);
        } else {
          acc[foundIndex].valueOfCoin += obj.valueOfCoin
          acc[foundIndex].totalPrice += obj.totalPrice
        }
        return acc;
      }, [])
    }
    dispatch(getCoin({coin: totalCoinInPortfolio}))
    localStorage.setItem('value', JSON.stringify(totalCoinInPortfolio))

  }, [coinPortfolio, getCoin])

  return <div className={s.portfolio}>
    {portfolio?.map((item: TypeDataInPortfolio) => {
      return <div className={s.infoAboutCoin} key={item.id}>
        <p>{item.name}</p>
        <button onClick={() => {
          dispatch(deleteCoin())
          localStorage.removeItem("value")
        }}>delete
        </button>
        <p>{item.valueOfCoin}</p>
        <p>{Number(item.totalPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
      </div>
    })}
  </div>

}