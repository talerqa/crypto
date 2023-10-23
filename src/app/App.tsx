import s from './App.module.scss'
import {useGetAssetsQuery} from "@/servicies/baseApi.ts";
import {Header} from "@/components/header";
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {Assets} from "@/components/assets";
import {Coin} from "@/components/coin";
import {Loader} from "@/components/loader";
import {InputFindCoin} from "@/components/inputFindCoin";

function App() {

  const [name, setName] = useState('')

  const {data, isLoading} = useGetAssetsQuery({search: name})


  return (
    <div className={s.app}>

      <div className={s.appContainer}>
        <Header/>
        <InputFindCoin setName={setName}/>
        {isLoading && <Loader/>}
        <Routes>
          <Route path={'/'} element={<Assets data={data?.data}/>}/>
          <Route path={':id'} element={<Coin data={data?.data}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

