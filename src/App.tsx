import './App.module.scss'
import {TypeData, useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Table} from "@/table.tsx";


function App() {

  const {data} = useGetAssetsQuery()


  const {Root, Head, Body, Row, Cell} = Table

  return (
    <>
      <Root>
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


          {data?.data.map((item: TypeData) => {
            return <Row>
              <Cell><p>{item.rank}</p></Cell>
              <Cell><img
                src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                alt=""/>
                <a
                  href={`https://coinmarketcap.com/currencies/${item.id}/`}
                  target='_blank'>

                  <p>{item.name}</p>
                </a></Cell>
              <Cell><p>{item.symbol}</p></Cell>
              <Cell><p>{item.priceUsd}</p></Cell>
              <Cell><p>{item.marketCapUsd}</p></Cell>
              <Cell><p>{item.supply}</p></Cell>
              <Cell><p>{item.volumeUsd24Hr}</p></Cell>
              <Cell><p>{item.changePercent24Hr}</p></Cell>
              <Cell><p>{item.vwap24Hr}</p></Cell>
            </Row>
          })}

        </Body>
      </Root>
    </>
  )
}

export default App
