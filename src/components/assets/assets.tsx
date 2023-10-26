import {Table} from "@/components/table";
import {NavLink} from "react-router-dom";
import s from './assets.module.scss'
import {TypeData} from "@/servicies/baseApi.type.ts";
import {InputFindCoin} from "@/components/inputFindCoin";
import {useEffect, useState} from "react";
import {useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Loader} from "@/components/loader";
import {ArrowDown} from "@/assets/arrowDown.tsx";
import {ArrowUp} from "@/assets/arrowUp.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {addCoinInPortfolio} from "@/servicies/coinPortfolio.ts";
import {AddCoinInPortfolio} from "@/components/addCoinInPortfolio";

export const Assets = (props: any) => {

  const {data1} = props
  const [name, setName] = useState('')

  let a: any | null = null
  if (name.length > 0) {
    a = {
      search: name,
    }
  }

  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)

  const AddCoin = () => {
    setLimit(limit => limit + 10)
    setOffset((offset) => offset + offset)
  }

  const {data, isLoading, refetch} = useGetAssetsQuery({
    ...a, limit: limit,
    offset: offset,
  })

  useEffect(() => {
    const setId = setInterval(() => {
      refetch()
    }, 5000)
    return (() => {
      clearInterval(setId)
    })
  }, [data1, refetch])


  const coinPortfolio = useAppSelector(state => state.coinPortfolio)
  const dispatch = useAppDispatch()
  console.log(coinPortfolio)
  const handler = (data: TypeData) => {
    dispatch(addCoinInPortfolio({coin: data}))
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

  localStorage.setItem('value', JSON.stringify(coinPortfolio))


  const {Root, Head, Body, Row, Cell} = Table
  return <div className={s.assets}>
    <div className={s.assetsContainer}>
      {isLoading && <Loader/>}
      <AddCoinInPortfolio/>
      <InputFindCoin setName={setName}/>
      <Root className={data?.data.length !== 0 ? s.root : ""}>
        <Head>
          <Row>
            <Cell>Rank</Cell>
            <Cell className={s.nameHeadCoin}>Name</Cell>
            <Cell>Symbol</Cell>
            <Cell>Price, usd</Cell>
            <Cell>Market Cap, $</Cell>
            <Cell> Circulating Supply</Cell>
            <Cell>Volume (24h), usd</Cell>
            <Cell>24h %</Cell>
            <Cell>Volume WA (24Hr)</Cell>
            <Cell></Cell>
          </Row>
        </Head>
        <Body>
          {data?.data.map((item: TypeData) => {
            return <Row key={item.id}>
              <Cell><p>{item.rank}</p></Cell>
              <Cell>
                <NavLink to={`/${item.id}`} className={s.nameImgBlockCoin}>
                  <img
                    className={s.imgCoin}
                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                    alt={`${item.name}-img`}/>
                  <p className={s.nameCoin}>{item.name}</p>
                </NavLink>
              </Cell>
              <Cell>
                {item.symbol}</Cell>
              <Cell>
                {Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Cell>
              <Cell>
                {(((Number(item.marketCapUsd) * 10) / 10) / 1000000000).toFixed(2)} b
              </Cell>
              <Cell>
                {(((Number(item.supply) * 10) / 10) / 1000000).toFixed(2)} m
              </Cell>
              <Cell>
                {(((Number(item.volumeUsd24Hr) * 10) / 10) / 1000000000).toFixed(2)} m
              </Cell>
              <Cell>
                <p
                  className={Number(item.changePercent24Hr) > 0 ? s.changePercent24HrUp + ' ' + s.changePercent24Hr : s.changePercent24HrDown + ' ' + s.changePercent24Hr}>
                  {Number(item.changePercent24Hr).toFixed(2)}
                  <>
                    {Number(item.changePercent24Hr) > 0
                      ? <ArrowUp/>
                      : <ArrowDown/>}
                  </>
                </p>
              </Cell>
              <Cell>
                {Number(item.vwap24Hr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Cell>
              <Cell>
                <button onClick={() => {
                  handler(item)
                }}>+
                </button>
              </Cell>
            </Row>
          })}
        </Body>
      </Root>
      <button onClick={() => AddCoin()} className={s.buttonAddCoins}>view more
      </button>
    </div>
  </div>
}


