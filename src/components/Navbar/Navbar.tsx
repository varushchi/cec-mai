'use client'
import Link from "next/link"
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";

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
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const userid = 'vadimaty'
  const username = 'Вадим Щиголев'
  const pathname = usePathname()

  return(
    <nav className={styles.nav}>
      <Link className={`${styles.navitem} ${pathname === '/' ? styles.active : ''}`} href={'/'}>Главная</Link>
      <Link className={`${styles.navitem} ${pathname === '/courses' ? styles.active : ''}`} href={'/courses'}>Курсы</Link>
      {isLoggedIn ? 
      <ProfilePic name={username} userid={userid} handleLog={() => setIsLoggedIn(prev => !prev)}/> :
      <LoginModal />}
      
    </nav>
  )
}

export default Navbar