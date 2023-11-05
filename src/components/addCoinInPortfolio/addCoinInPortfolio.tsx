import s from './addCoinInPortfolio.module.scss'
import {ChangeEvent, useEffect, useState} from "react";
import {coinPortfiloAction} from "@/servicies/coinPortfolioSlice.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {TypeData, TypeDataInPortfolio} from "@/servicies/baseApi.type.ts";
import {CloseBtn} from "@/assets/closeBtn.tsx";
import {portfolioAction} from "@/servicies/portfolioSlice.ts";

type Props = {
  data: any
  coin: any
  setActiveMenu: (menu: boolean) => void
}
export const AddCoinInPortfolio = (props: Props) => {

  const {addCoinInPortfolio} = coinPortfiloAction

  const [value, setValue] = useState<number | string>('')
  const [error, setError] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = (e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
    setValue(inputNumber)
    setError('')
  }

  const dispatch = useAppDispatch()

  const coinPortfolio = useAppSelector(state => state.coinPortfolio)
  const coins = useAppSelector(state => state.portfolio)

  const {getCoin} = portfolioAction


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
    console.log(totalCoinInPortfolio)
    console.log(coins)

  }, [coinPortfolio, getCoin])

  console.log(coins)

  const addCoinInPortfolioHandler = (id: string, value: number) => {
    if (value === 0 || value === null) {
      setError('Input value more then 0')
      return
    } else {
      const filteredData = props.data.filter((item: TypeData) => item.id === id ? item : '')
      dispatch(addCoinInPortfolio({
        coin: filteredData,
        valueOfCoin: Number(value)
      }))
      setError('')
      setValue('')
    }
    // props.setActiveMenu(false)
  }

  return (<div className={s.addCoinInPortfolio}>
    <div className={s.addCoinInPortfolioContainer}>
      <button className={s.buttonClose}
              onClick={() => props.setActiveMenu(false)}>
        <CloseBtn/>
      </button>
      <p className={s.title}>Input value of coin</p>
      <input
        className={s.input}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <button
        className={s.buttonAddCoinPortfolio}
        onClick={() => addCoinInPortfolioHandler(props.coin, Number(value))}>
        <span
          className={s.textButtonAddCoinPortfolio}>Add coin in portfolio</span>
      </button>
      <span className={s.error}>{error}</span>
    </div>
  </div>)
}
