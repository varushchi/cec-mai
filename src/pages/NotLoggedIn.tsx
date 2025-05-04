import Link from 'next/link'
import React from 'react'

export default function NotLoggedIn() {
  return (
    <div>
      <h1>сюда нельзя</h1>
      <button>Войти/Зарегистрироваться</button>
      <Link href={'/'}>Домашняя страницв</Link>
    </div>
  )
}
