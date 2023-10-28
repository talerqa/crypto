// @ts-ignore

import s from './addCoinInPortfolio.module.scss'
import {ChangeEvent, useState} from "react";
import {addCoinInPortfolio} from "@/servicies/coinPortfolio.ts";
import {useAppDispatch} from "@/hooks.ts";
import {TypeData} from "@/servicies/baseApi.type.ts";

type Props = {
  data: any
  coin: any
  setActiveMenu: (menu: boolean) => void
  activeMenu: boolean
}
export const AddCoinInPortfolio = (props: Props) => {
  const [value, setValue] = useState<number | string>('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')))
  }

  const dispatch = useAppDispatch()

  const handler = (id: any, value: any) => {
    const filteredData = props.data.filter((item: TypeData) => item.id === id ? item : '')
    dispatch(addCoinInPortfolio({
      coin: filteredData,
      valueOfCoin: Number(value)
    }))
  }

  return (<div className={s.addCoinInPortfolio}>
    <div className={s.addCoinInPortfolioContainer}>
      <button onClick={() => props.setActiveMenu(false)}> close</button>
      <p className={s.title}>Input value of coin</p>
      <input
        value={value}
        onChange={(e) => onChange(e)}
      />
      <button onClick={() => handler(props.coin, value)}>add
      </button>
    </div>
  </div>)
}
