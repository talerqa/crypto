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
import {AddCoinInPortfolio} from "@/components/addCoinInPortfolio";

export const Assets = () => {

  const {Root, Head, Body, Row, Cell} = Table

  const [name, setName] = useState('')
  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [activeMenu, setActiveMenu] = useState(false)
  const [item, setItem] = useState<any>(null)

  let searchName: { search: string } | null = null

  if (name.length > 0) {
    searchName = {
      search: name,
    }
  }

  const {data, isLoading, refetch} = useGetAssetsQuery({
    ...searchName,
    limit: limit,
    offset: offset,
  })

  useEffect(() => {
    const setId = setInterval(() => {
      refetch()
    }, 5000)
    return (() => {
      clearInterval(setId)
    })
  }, [refetch])

  const AddCoin = () => {
    setLimit(limit => limit + 10)
    setOffset((offset) => offset + offset)
  }

  const showModalForAddCoin = (itemId: string) => {
    setItem(itemId)
  }

  return <div className={s.assets}>
    <div className={s.assetsContainer}>
      {isLoading && <Loader/>}
      {activeMenu &&
          <AddCoinInPortfolio coin={item} setActiveMenu={setActiveMenu}
                              data={data?.data}/>}
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
                <button
                  className={s.buttonAddCoins}
                  onClick={() => {
                    showModalForAddCoin(item.id)
                    setActiveMenu(!activeMenu)
                  }}>
                  <p className={s.textButtonAdd}>+</p>
                </button>
              </Cell>
            </Row>
          })}
        </Body>
      </Root>
      <button
        onClick={() => AddCoin()}
        className={s.buttonViewMore}>View More
      </button>
    </div>
  </div>
}


