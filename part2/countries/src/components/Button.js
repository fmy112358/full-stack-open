import { useState } from "react"
import Country from "./Country"

const Button = ({country}) => {
  const [state, setState] = useState('show')

  const handleClick = () => {
    if (state === 'show') {
      setState('hide')
    } else {
      setState('show')
    }
  }

  if (state === 'show') {
    return (
      <button onClick={handleClick}>{state}</button>
    )
  }
  else {
    return (
      <>
      <button onClick={handleClick}>{state}</button>
      <div>
        <Country country={country}/>
      </div>
      </>
    )
  }
}

export default Button