import {SearchIcon} from "@/assets/searchSvg.tsx";
import s from './inputFindCoin.module.scss'

type Props = {
  setName: (name: string) => void
}

export const InputFindCoin = (props: Props) => {
  return <div className={s.inputFindCoin}>
    <p className={s.titleFindCoin}>
      Find cryptocurrency
    </p>
    <div className={s.inputBlock}>
      <SearchIcon className={s.searchIcon}/>
      <input className={s.input}
             type="text"
             onChange={(e) => props.setName(e.currentTarget.value)}/>
    </div>
  </div>
}