'use client'

import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
  loading: boolean
}

const SignIn = ({handleSubmit, inputValue, hadleChange, error, handleSigntype, loading}: formProps) => {

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
      {error.type === 'email' 
      ? <p className={styles.errorMsg}>{error.message}</p>
      : null}
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
      {error.type === 'password'
        ? <p className={styles.errorMsg}>{error.message}</p>
        : null}
      <button
        type='submit'
        className={`${styles.sign}
        ${error.type === 'server' ? styles.errorButton : ''}`}>
          Войти 
          {loading ? <LoadingOutlined /> : null}
      </button>
      {error.message && (error.type === 'server' || !error.type)
        ? <p className={`${styles.errorMsg} ${styles.errButtonMsg}`}>{error.message}</p>
        : null}
      <button
        onClick={() => handleSigntype('SignUp')}
        className={styles.changeType}>
          У меня нет аккаунта
      </button>
    </form>
  )
}

const SignUp = ({handleSubmit, inputValue, hadleChange, error, handleSigntype, loading}: formProps) => {

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
      {error.type === 'name'
        ? <p className={styles.errorMsg}>{error.message}</p>
        : null}
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
      {error.type === 'surname'
        ? <p className={styles.errorMsg}>{error.message}</p>
        : null}
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
      {error.type === 'email'
        ? <p className={styles.errorMsg}>{error.message}</p>
        : null}
      <label htmlFor='password'>Пароль</label>
      <input
        className={`${styles.input} ${error.type === 'password' || error.type === 'confirmPassword' ? styles.error : ''}`}
        placeholder='••••••••'
        id='password'
        type='password'
        name='password'
        value={inputValue.password}
        onChange={hadleChange}
      />
      {error.type === 'password'
        ? <p className={styles.errorMsg}>{error.message}</p>
        : null}
      <label htmlFor='confirmPassword'>Подтвердить пароль</label>
      <input
        className={`${styles.input} ${error.type === 'confirmPassword' ? styles.error : ''}`}
        placeholder='••••••••'
        id='confirmPassword'
        type='password'
        name='confirmPassword'
        value={inputValue.confirmPassword}
        onChange={hadleChange}
      />
      {error.type === 'confirmPassword'
      ? <p className={styles.errorMsg}>{error.message}</p>
      : null}
      <button
        type='submit'
        className={`${styles.sign} ${error.type === 'server' ? styles.errorButton : ''}`}>
          Зарегестрироваться
          {loading ? <LoadingOutlined /> : null}
      </button>
      {error.message && (error.type === 'server' || !error.type)
        ? <p className={`${styles.errorMsg} ${styles.errButtonMsg}`}>{error.message}</p>
        : null}
      <button
        onClick={() => handleSigntype('SignIn')}
        className={styles.changeType}>
          У меня уже есть аккаунт
      </button>
    </form>
  )
}

export default function LoginModal() {

  const modalState = useAppSelector(state => state.modal)
  const userState = useAppSelector(state => state.user)
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
    message: null,
    type: null
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

  async function handleSign(e: React.FormEvent<HTMLFormElement>, type: 'SignIn' | 'SignUp'){
    e.preventDefault()
    setError({message: null, type: null})
    try{
      LoginSchema.parse({email: inputValue.email, password: inputValue.password})
      if (type === 'SignUp') {
        NameSchema.parse({name: inputValue.name, surname: inputValue.surname})
        if (inputValue.password !== inputValue.confirmPassword) {
          throw new ZodError([
            {
              code: 'custom',
              path: ['confirmPassword'],
              message: 'Пароли не совпадают'
            }
          ])
        }
      }
    } catch (err){
      if (err instanceof ZodError){
        setError({message: err.errors[0]?.message || "Ошибка ввода", type: err.errors[0].path[0]})
      } else {
        setError({message: 'Непредвиденная ошибка ввода', type: null})
      }
    }

    try{
      const userData = type === 'SignUp' 
      ? {
          email: inputValue.email,
          password: inputValue.password,
          name: inputValue.name,
          surname: inputValue.surname
        }
      : {
          email: inputValue.email,
          password: inputValue.password
        }

    await dispatch(loginUser(userData)).unwrap()

    dispatch(closeModal())
    setInputValue({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: ''
    })

    } catch(err) {
      setError({message: `Непредвиденная ошибка сервера: ${err}`, type: 'server'})
    }
  }
  
  return (
    <div>
      <Modal
        title={signType === 'SignIn' ? 'Войти' : 'Зарегестрироваться'}
        open={modalState.isOpen}
        onCancel={() => dispatch(closeModal())}
        onClose={() => dispatch(closeModal())}
        width='min(80%, 600px)'
        style={{top: 20}}
        footer={[]}
      >
      <div>
        {signType === 'SignIn' ? 
        <SignIn
          handleSubmit={(e) => handleSign(e, 'SignIn')}
          inputValue={inputValue}
          hadleChange={handleChange}
          error={error}
          handleSigntype={(type: string) => setSignType(type)}
          loading={userState.loading}
        /> :
        <SignUp
          handleSubmit={(e) => handleSign(e, 'SignUp')}
          inputValue={inputValue}
          hadleChange={handleChange}
          error={error}
          handleSigntype={(type: string) => setSignType(type)}
          loading={userState.loading}
        />}
      </div>
      </Modal>
    </div>
  )
}
