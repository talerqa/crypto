import s from './loader.module.scss'

export const Loader = () => {
  return <div className={s.loaderBlock}>
    <span className={s.loader}></span>
  </div>

}