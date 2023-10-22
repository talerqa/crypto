import s from './App.module.scss'
import {TypeData, useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Header} from "@/components/header";
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {Assets} from "@/components/assets";
import {Coin} from "@/components/coin";

function App() {

  const [name, setName] = useState('')


  const {data, isLoading} = useGetAssetsQuery({search: name})

  const firstThreeCoin = data?.data.filter((item: TypeData) => item.rank === '1' || item.rank === '2' || item.rank === '3' ? item : '')


  if (isLoading) return <div>loading.......................................</div>
  return (
    <div className={s.app}>
      <div className={s.appContainer}>
        <Header data={firstThreeCoin}/>
        <input type="text" onChange={(e) => setName(e.currentTarget.value)}/>

        <Routes>
          <Route path={'/'} element={<Assets data={data?.data}/>}/>
          <Route path={':id'} element={<Coin data={data?.data}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

