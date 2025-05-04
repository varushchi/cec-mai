'use client'

import { Modal } from 'antd';
import { useState } from 'react';
import styles from './loginmodal.module.css'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal } from '@/store/slices/ModalSlice';
import { loginUser } from '@/store/slices/UserSlice';
import { LoginSchema, NameSchema } from '@/store/schemas/UserSchema';
import { ZodError } from 'zod';

interface formProps { 
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  inputValue: {email: string, password: string, confirmPassword: string, name: string, surname: string}
  hadleChange : (e: React.ChangeEvent<HTMLInputElement>) => void
  error: {message: string | null, type: string | number | null}
  handleSigntype: (type: string) => void
}

const SignIn = ({handleSubmit, inputValue, hadleChange, error, handleSigntype}: formProps) => {

  return(
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <label htmlFor='email'>Почта</label>
      <input
        className={`${styles.input} ${error.type === 'email' ? styles.error : ''}`}
        placeholder='johndoe@mai.education'
        id='email'
        type='email'
        name='email'
        value={inputValue.email}
        onChange={hadleChange}
      />
      {error.type === 'email' ? <p className={styles.errorMsg}>{error.message}</p> : null}
      <label htmlFor='password'>Пароль</label>
      <input
        className={`${styles.input} ${error.type === 'password' ? styles.error : ''}`}
        placeholder='••••••••'
        id='password'
        type='password'
        name='password'
        value={inputValue.password}
        onChange={hadleChange}
      />
      {error.type === 'password' ? <p className={styles.errorMsg}>{error.message}</p> : null}
      <button type='submit' className={styles.sign}>Войти</button>
      <button onClick={() => handleSigntype('SignUp')} className={styles.changeType}>У меня нет аккаунта</button>
    </form>
  )
}

const SignUp = ({handleSubmit, inputValue, hadleChange, error, handleSigntype}: formProps) => {

  return(
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <label htmlFor='name'>Имя</label>
      <input
        className={`${styles.input} ${error.type === 'name' ? styles.error : ''}`}
        placeholder='Джон'
        id='name'
        type='name'
        name='name'
        value={inputValue.name}
        onChange={hadleChange}
      />
      {error.type === 'name' ? <p className={styles.errorMsg}>{error.message}</p> : null}
      <label htmlFor='surname'>Фамилия</label>
      <input
        className={`${styles.input} ${error.type === 'surname' ? styles.error : ''}`}
        placeholder='Доу'
        id='surname'
        type='surname'
        name='surname'
        value={inputValue.surname}
        onChange={hadleChange}
      />
      {error.type === 'surname' ? <p className={styles.errorMsg}>{error.message}</p> : null}
      <label htmlFor='email'>Почта</label>
      <input
        className={`${styles.input} ${error.type === 'email' ? styles.error : ''}`}
        placeholder='johndoe@mai.education'
        id='email'
        type='email'
        name='email'
        value={inputValue.email}
        onChange={hadleChange}
      />
      {error.type === 'email' ? <p className={styles.errorMsg}>{error.message}</p> : null}
      <label htmlFor='password'>Пароль</label>
      <input
        className={`${styles.input} ${error.type === 'password' ? styles.error : ''}`}
        placeholder='••••••••'
        id='password'
        type='password'
        name='password'
        value={inputValue.password}
        onChange={hadleChange}
      />
      {error.type === 'password' ? <p className={styles.errorMsg}>{error.message}</p> : null}
      <label htmlFor='confirmPassword'>Подтвердить пароль</label>
      <input
        className={`${styles.input} ${error.type === 'password' ? styles.error : ''}`}
        placeholder='••••••••'
        id='confirmPassword'
        type='password'
        name='confirmPassword'
        value={inputValue.confirmPassword}
        onChange={hadleChange}
      />
      <button type='submit' className={styles.sign}>Зарегестрироваться</button>
      <button onClick={() => handleSigntype('SignIn')} className={styles.changeType}>У меня уже есть аккаунт</button>
    </form>
  )
}

export default function LoginModal() {

  const modal = useAppSelector(state => state.modal)
  const dispatch = useAppDispatch()
  const [signType, setSignType] = useState('SignIn')
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: ''
  })
  const [error, setError] = useState<{message: string | null, type: string | number | null}>({
    message: '',
    type: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    setInputValue(prev => {
      return(
        {
          ...prev,
          [name]: e.target.value
        }
      )
    })
    setError({message: null, type: null})
  }

  function handleSignUp(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try{
      LoginSchema.parse({email: inputValue.email, password: inputValue.password})
      NameSchema.parse({name: inputValue.name, surname: inputValue.surname})
    } catch (err){
      if (err instanceof ZodError){
        setError({message: err.errors[0]?.message || "Ошибка ввода", type: err.errors[0].path[0]})
      } else {
        setError({message: 'Непредвиденная ошибка ввода', type: null})
      }
      return
    }

    if (inputValue.password !== inputValue.confirmPassword){
      setError({message: 'Пароли не совпадают', type: 'password'})
      return
    }
    
    const user = {
      id: inputValue.email.length.toLocaleString(),
      name: 'vadim',
      surname: 'shigol',
      email: inputValue.email
    }
    dispatch(loginUser(user))
    dispatch(closeModal())
    setInputValue({email: '', password: '', confirmPassword: '', name: '', surname: ''})
    setError({message: null, type: null})
  }

  function handleSignIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try{
      LoginSchema.parse({email: inputValue.email, password: inputValue.password})
    } catch (err){
      if (err instanceof ZodError){
        setError({message: err.errors[0]?.message || "Ошибка ввода", type: err.errors[0].path[0]})
      } else {
        setError({message: 'Непредвиденная ошибка ввода', type: null})
      }
      return
    }
    
    const user = {
      id: inputValue.email.length.toLocaleString(),
      name: 'vadim',
      surname: 'shigol',
      email: inputValue.email
    }
    dispatch(loginUser(user))
    dispatch(closeModal())
    setInputValue({email: '', password: '', confirmPassword: '', name: '', surname: ''})
    setError({message: null, type: null})
  }
  
  return (
    <div>
      <Modal
        title={signType === 'SignIn' ? 'Войти' : 'Зарегестрироваться'}
        open={modal.isOpen}
        onCancel={() => dispatch(closeModal())}
        onClose={() => dispatch(closeModal())}
        width='min(80%, 600px)'
        style={{top: 20}}
        footer={[]}
      >
      <div>
        {signType === 'SignIn' ? 
        <SignIn
          handleSubmit={handleSignIn}
          inputValue={inputValue}
          hadleChange={handleChange}
          error={error}
          handleSigntype={(type: string) => setSignType(type)}
        /> :
        <SignUp
          handleSubmit={handleSignUp}
          inputValue={inputValue}
          hadleChange={handleChange}
          error={error}
          handleSigntype={(type: string) => setSignType(type)}
        />}
      </div>
      </Modal>
    </div>
  )
}
