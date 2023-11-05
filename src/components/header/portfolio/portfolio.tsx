import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {portfolioAction} from "@/servicies/portfolioSlice.ts";
import {TypeData, TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";
import s from './portfolio.module.scss'
import {coinPortfiloAction} from "@/servicies/coinPortfolioSlice.ts";
import {useEffect} from "react";

type Props = {
  setShowPortfolio: (value: boolean) => void
  showPortfolio: boolean
}

export const Portfolio = (props: Props) => {

  const {setShowPortfolio} = props

  const coinPortfolio = useAppSelector(state => state.coinPortfolio)
  const portfolio = useAppSelector(state => state.portfolio)

  const dispatch = useAppDispatch()
  const {getCoin, deleteCoins} = portfolioAction
  const {deleteCoin} = coinPortfiloAction

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
    <button className={s.buttonClose}
            onClick={() => setShowPortfolio(false)}>x
    </button>
    {portfolio?.map((item: TypeDataInPortfolio) => {
      return <div className={s.infoAboutCoin} key={item.id}>
        <p>{item.name}</p>
        <button onClick={() => {

          dispatch(deleteCoin({id: item.id}))
          dispatch(deleteCoins())

          //    localStorage.removeItem('value')
          // localStorage.setItem('value', JSON.stringify(portfolioSlice))
        }}>delete
        </button>
        <p>{item.valueOfCoin}</p>
        <p>{Number(item.totalPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
      </div>
    })}
  </div>
}
