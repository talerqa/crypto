import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {useEffect} from "react";
import {portfolioAction} from "@/servicies/portfolio.ts";

export const Portfolio = () => {

  const coinPortfolio = useAppSelector(state => state.coinPortfolio)
  const portfolio = useAppSelector(state => state.portfolio)

  const dispatch = useAppDispatch()
  const {getCoin} = portfolioAction

  useEffect(() => {
      let a: any = []
      let totalCoinInPortfolio: any = []

      if (coinPortfolio.length) {

        coinPortfolio.map((item: any) => {
          debugger
          const neObj = {
            ...item,
            valueOfCoin: Number(item.valueOfCoin),
            totalPrice: Number(item.valueOfCoin) * Number(item.priceUsd)
          }
          a.push(neObj)
        })

        totalCoinInPortfolio = a.reduce((acc: any, obj: any) => {
          debugger
          const foundIndex = acc.findIndex((item: any) => item.id === obj.id);
          if (foundIndex === -1) {
            acc.push(obj);
          } else {

            acc[foundIndex].valueOfCoin += Number(obj.valueOfCoin)
            acc[foundIndex].totalPrice += Number(obj.totalPrice)

          }
          return acc;
        }, [])

      }
    debugger
      dispatch(getCoin({coin: totalCoinInPortfolio}))
      localStorage.setItem('value', JSON.stringify(totalCoinInPortfolio))
    },    [coinPortfolio])

  console.log(portfolio[0]?.priceUsd)
  return <div>
    {portfolio?.map((item: any) => {
      return <div style={{display: 'flex'}} key={item.id}>
        <p>{item.id}</p>
        <p>{item.name}</p>
        <p>{item.symbol}</p>
        <p>{item.valueOfCoin}</p>
        <p>{item.totalPrice}</p>
      </div>
    })}
  </div>

}