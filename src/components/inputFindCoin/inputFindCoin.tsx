export const InputFindCoin = (props: any) => {
  return <div style={{margin: '0 auto'}}>
    <input  style={{display: 'block', margin: '0 auto'}}  type="text"  onChange={(e) => props.setName(e.currentTarget.value)}/>
  </div>
}