import s from './App.module.scss'
import {useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Header} from "@/components/header";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {Assets} from "@/components/assets";
import {Coin} from "@/components/coin";

function App() {

  const {data, refetch} = useGetAssetsQuery()

  useEffect(() => {
    const setId = setInterval(() => {
      refetch()
    }, 5000)
    return (() => {
      clearInterval(setId)
    })
  }, [refetch])

  return (
    <div className={s.app}>
      <div className={s.appContainer}>
        <Header data={data?.data}/>
        <Routes>
          <Route path={'/'} element={<Assets/>}/>
          <Route path={':id'} element={<Coin data={data?.data}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

