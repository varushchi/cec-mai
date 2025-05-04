'use client'
import Link from "next/link"
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { openModal } from "@/store/slices/ModalSlice";
import { logout } from "@/store/slices/UserSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const items = (userid: string, handleLog: () => void): MenuProps['items'] => {
  return (
    [
      {
        key: '1',
        label: (
          <Link href={`/profile/${userid}`}>Перейти к профилю</Link>
        ),
      },
      {
        key: '2',
        label: (
          <button onClick={handleLog}>Выйти</button>
        ),
      },
    ]
      
  )
}
  

const ProfilePic = ({name, userid, handleLog}: {name: string, userid: string, handleLog: () => void}) => {
  const initails = name.split(' ').map(word => word[0].toUpperCase()).join('')
  return(
    <div className={styles.profile}>
      <Dropdown menu={{ items: items(userid, handleLog) }}>
        <Space>
          {initails}
        </Space>
      </Dropdown>
    </div>
  )
}

const Navbar = () => {
  const { user } = useAppSelector(state => state.user)
  const username = user ? `${user.name} ${user.surname}` : ''
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const router = useRouter()

  function handleLog() {
    dispatch(logout())
    router.push('/')
  }

  return(
    <nav className={styles.nav}>
      <Link className={`${styles.navitem} ${pathname === '/' ? styles.active : ''}`} href={'/'}>Главная</Link>
      <Link className={`${styles.navitem} ${pathname === '/courses' ? styles.active : ''}`} href={'/courses'}>Курсы</Link>
      {user ? 
      <ProfilePic name={username} userid={user.id} handleLog={handleLog}/> :
      <button className={styles.navitem} onClick={() => dispatch(openModal({modalType: 'login'}))}>Войти/Зарегистрироваться</button>}
      
    </nav>
  )
}

export default Navbar