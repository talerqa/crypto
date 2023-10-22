import {TypeData} from "@/servicies/baseApi.ts";
import {Table} from "@/components/table";
import {NavLink} from "react-router-dom";

export const Assets = (props: { data?: TypeData[] }) => {

  const {data} = props

  const {Root, Head, Body, Row, Cell} = Table
  return <Root>
    <Head>
      <Row>
        <Cell>rank</Cell>
        <Cell>name</Cell>
        <Cell>symbol</Cell>
        <Cell>priceUsd</Cell>
        <Cell>marketCapUsd</Cell>
        <Cell>supply</Cell>
        <Cell>volumeUsd24Hr</Cell>
        <Cell>changePercent24Hr</Cell>
        <Cell>vwap24Hr</Cell>
      </Row>
    </Head>
    <Body>
      {data?.map((item: TypeData) => {
        return <Row key={item.id}>
          <Cell><p>{item.rank}</p></Cell>
          <Cell>
            <NavLink to={`/${item.id}`}>
              <img
                src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                alt={`${item.name}-img`}/>
              <a
                href={`https://coinmarketcap.com/currencies/${item.id}/`}
                target='_blank'>
                <p>{item.name}</p>
              </a></NavLink></Cell>
          <Cell><p>{item.symbol}</p></Cell>
          <Cell>
            <p>{Number(item.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
          </Cell>
          <Cell><p>{item.marketCapUsd}</p></Cell>
          <Cell><p>{item.supply}</p></Cell>
          <Cell><p>{item.volumeUsd24Hr}</p></Cell>
          <Cell><p>{item.changePercent24Hr}</p></Cell>
          <Cell><p>{item.vwap24Hr}</p></Cell>
        </Row>
      })}

    </Body>
  </Root>
}
