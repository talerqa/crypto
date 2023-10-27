import s from './addCoinInPortfolio.module.scss'
import {ChangeEvent, useState} from "react";
import {addCoinInPortfolio} from "@/servicies/coinPortfolio.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";

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

  // const initState = {
  //   minValue: Number(localStorage.getItem('valueMax')),
  //   maxValue: Number(localStorage.getItem('valueMin')),
  //   currentValue: Number(localStorage.getItem('valueCurrent'))
  // }
  //
  // export const getValueTC = () => async (dispatch: Dispatch, getState: () => RootReducer) => {
  //   const currentValue = getState().counterReducer.currentValue
  //   const maxValue = getState().counterReducer.maxValue
  //   const minValue = getState().counterReducer.minValue
  //
  //   await localStorage.setItem('valueMin', JSON.stringify(minValue))
  //   await localStorage.setItem('valueMax', JSON.stringify(maxValue))
  //   await localStorage.setItem('valueCurrent', JSON.stringify(currentValue))
  // }

  //
  // const incrementHandler = useCallback((id: number) => {
  //   setCount((count) => count + 1)
  //   dispatch(incrementCountCard({id, count}))
  // }, [count])
  //
  // const decrementHandler = useCallback((id: number) => {
  //   if (count === 1) {
  //     return
  //   }
  //   setCount((count) => count - 1)
  //   dispatch(decrementCountCard({id, count}))
  // }, [count])
  //
  // const addCardInShopCart = (data: CardType) => {
  //   setCount(1)
  //   dispatch(addCardInShop(data))
  //   dispatch(resetDefaultValueItem({id: data.id}))
  //   showModalHandler(true)
  // }
  //
  // const resetDefaultValue = useCallback((id: number) => {
  //   setCount(1)
  //   dispatch(resetDefaultValueItem({id}))
  // }, [count])
  const coinPortfolio = useAppSelector(state => state.coinPortfolio)
  const dispatch = useAppDispatch()

  const handler = (id: any, value: any) => {

    const filteredData = props.data.filter((item: any)=> item.id === id ? item : '')
    console.log(filteredData)


    dispatch(addCoinInPortfolio({coin: filteredData, valueOfCoin: value}))
  }
  localStorage.setItem('value', JSON.stringify(coinPortfolio))


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
