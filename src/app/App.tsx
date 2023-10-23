import s from './App.module.scss'
import {useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Header} from "@/components/header";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {Assets} from "@/components/assets";
import {Coin} from "@/components/coin";
import {Loader} from "@/components/loader";


function App() {

  const {data, isLoading, refetch} = useGetAssetsQuery()

  useEffect(() => {
    const setId = setInterval(() => {
      refetch()
    }, 5000)
    return (() => {
      clearInterval(setId)
    })
  }, [data, refetch])

  return (
    <div className={s.app}>
      <div className={s.appContainer}>
        <Header data={data?.data}/>

        {isLoading && <Loader/>}
        <Routes>
          <Route path={'/'}
                 element={<Assets data1={data?.data}/>}/>
          <Route path={':id'} element={<Coin data={data?.data}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

