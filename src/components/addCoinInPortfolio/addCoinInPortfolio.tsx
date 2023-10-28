// @ts-ignore

import s from './addCoinInPortfolio.module.scss'
import {ChangeEvent, useState} from "react";
import {addCoinInPortfolio} from "@/servicies/coinPortfolio.ts";
import {useAppDispatch} from "@/hooks.ts";
import {TypeData} from "@/servicies/baseApi.type.ts";
import {CloseBtn} from "@/assets/closeBtn.tsx";

type Props = {
  data: any
  coin: any
  setActiveMenu: (menu: boolean) => void
}
export const AddCoinInPortfolio = (props: Props) => {
  const [value, setValue] = useState<number | string>('')
  const [error, setError] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = (e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
    setValue(inputNumber)
    setError('')
  }

  const dispatch = useAppDispatch()

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
