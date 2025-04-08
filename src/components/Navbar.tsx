import Link from "next/link"

const Navbar = async () => {

  const isLoggedIn = true
  const userid = 'vadimaty'

  return(
    <nav>
      <Link href={'/'}>Домашняя страница</Link>
      <Link href={'about'}>О проекте</Link>
      {isLoggedIn ? <Link href={`/profile/${userid}`}>profile pic</Link> : <Link href={`/login`}>Войти/Зарегистрироваться</Link>}
      <Link href={''}></Link>
    </nav>
  )
}

export default Navbar