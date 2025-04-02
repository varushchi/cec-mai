'use client'

import { useState } from "react"

function Login() {

  const [loginInput, setLoginInput] = useState({
    login: '',
    password: ''
  })

  return (
    <div>
      <form>
        <input
        value={loginInput.login}
        type="email"
        onChange={(e) => setLoginInput((prev) => {
          return({
            ...prev,
            login: e.target.value
          })
        })}/>
        <input
        value={loginInput.password}
        type="password"
        onChange={(e) => setLoginInput((prev) => {
          return({
            ...prev,
            password: e.target.value
          })
        })}/>
      </form>
    </div>
  )
}

export default Login