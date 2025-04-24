'use client'
import Link from "next/link"
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';

const ProfilePic = ({name}: {name: string}) => {
  const initails = name.split(' ').map(word => word[0].toUpperCase()).join('')
  return(
    <div className={styles.profile}>{initails}</div>
  )
}

const Navbar = () => {
  const isLoggedIn = true
  const userid = 'vadimaty'
  const pathname = usePathname()

  return(
    <nav className={styles.nav}>
      <Link className={`${styles.navitem} ${pathname === '/' ? styles.active : ''}`} href={'/'}>Главная</Link>
      <Link className={`${styles.navitem} ${pathname === '/courses' ? styles.active : ''}`} href={'courses'}>Курсы</Link>
      {isLoggedIn ? 
      <Link href={`/profile/${userid}`}><ProfilePic name="Вадим Щиголев"/></Link> :
      <Link className={styles.navitem} href={`/login`}>Войти/Зарегистрироваться</Link>}
    </nav>
  )
}

export default Navbar