'use client'

import { Modal } from 'antd';
import { useState } from 'react';
import styles from './loginmodal.module.css'

const SignIn = () => {

  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  })

  return(
    <form>
      <input type='email' value={inputValue.email} onChange={(e) => setInputValue({...inputValue, email: e.target.value})}/>
      <input type='password' value={inputValue.password} onChange={(e) => setInputValue({...inputValue, password: e.target.value})}/>
    </form>
  )
}

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  return(
    <form>
      <input type='email' value={inputValue.email} onChange={(e) => setInputValue({...inputValue, email: e.target.value})}/>
      <input type='password' value={inputValue.password} onChange={(e) => setInputValue({...inputValue, password: e.target.value})}/>
      <input type='password' value={inputValue.confirmPassword} onChange={(e) => setInputValue({...inputValue, confirmPassword: e.target.value})}/>
    </form>
  )
}

export default function LoginModal() {

  const [open, setOpen] = useState(false)
  const [signType, setSignType] = useState('SignIn')
  return (
    <div>
      <button onClick={() => setOpen(prev => !prev)} className={styles.navitem}>Войти/Зарегистрироваться</button>
      <Modal
        title={signType === 'SignIn' ? 'Войти' : 'Зарегестрироваться'}
        open={open}
      >
      <div>
        <button onClick={() => setSignType('SignIn')}>Войти</button>
        <button onClick={() => setSignType('SignUp')}>Зарегестрироваться</button>
        {signType === 'SignIn' ? <SignIn /> : <SignUp />}
      </div>
      </Modal>
    </div>
  )
}
