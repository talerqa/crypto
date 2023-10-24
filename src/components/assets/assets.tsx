import {Table} from "@/components/table";
import {NavLink} from "react-router-dom";
import s from './assets.module.scss'
import {TypeData} from "@/servicies/baseApi.type.ts";
import {InputFindCoin} from "@/components/inputFindCoin";
import {useEffect, useState} from "react";
import {useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Loader} from "@/components/loader";

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

  const {Root, Head, Body, Row, Cell} = Table
  return <div className={s.assets}>
    <div className={s.assetsContainer}>
      {isLoading && <Loader/>}
      <InputFindCoin setName={setName}/>
      <Root>
        <Head>
          <Row>
            <Cell>Rank</Cell>
            <Cell className={s.nameHeadCoin}>Name</Cell>
            <Cell>Symbol</Cell>
            <Cell>Price, usd</Cell>
            <Cell>Market Cap, usd</Cell>
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
              <Cell><p>{item.symbol}</p></Cell>
              <Cell>
                <p>{Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
              </Cell>
              <Cell>
                <p>{(((Number(item.marketCapUsd) * 10) / 10) / 1000000000).toFixed(2)} b</p>
              </Cell>
              <Cell>
                <p>{(((Number(item.supply) * 10) / 10) / 1000000).toFixed(2)}m</p>
              </Cell>
              <Cell>
                <p>{(((Number(item.volumeUsd24Hr) * 10) / 10) / 1000000000).toFixed(2)} m</p>
              </Cell>
              <Cell><p>{Number(item.changePercent24Hr).toFixed(2)}</p></Cell>
              <Cell>
                <p>{Number(item.vwap24Hr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
              </Cell>
              <Cell>
                <button>+</button>
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
