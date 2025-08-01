import { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'

function Auth() {
  const [active, setActive] = useState(0)
  return (
    <div>
      {
        active === 0 ?(<Signup setActive ={setActive}/>) : (<Login setActive ={setActive}/>)
      }
    </div>
  )
}

export default Auth