import s from './addCoinInPortfolio.module.scss'
import {ChangeEvent, useState} from "react";


export const AddCoinInPortfolio = () => {
  const [value, setValue] = useState<number | string>('')


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')))
  }

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



  return (<div className={s.addCoinInPortfolio}>
    <div className={s.addCoinInPortfolioContainer}>
      <input
        value={value}
        onChange={(e) => onChange(e)}
      />
      <button onClick={()=>{
        console.log(  value)}}>add </button>
    </div>
  </div>)
}
