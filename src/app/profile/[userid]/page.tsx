'use client'
import NotLoggedIn from '@/pages/NotLoggedIn'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'

export default function Profile() {
  const params = useParams<{userid: string}>()
  const {user} = useAppSelector(state => state.user)
  if (!user || user.user_id != params?.userid) {
    return <NotLoggedIn />
  }
  
  return (
    <main className={styles.main}>
      <h1>Мои данные</h1>
      <section className={styles.info}>
        <div className={styles.infoTab}>
          <p>Фамилия</p>
          <p className={styles.value}>{user?.surname}</p>
        </div>
        <div className={styles.infoTab}>
          <p>Имя</p>
          <p className={styles.value}>{user?.name}</p>
        </div>
        <div className={styles.infoTab}>
          <p>Почта</p>
          <p className={styles.value}>{user?.email}</p>
        </div>
        <div className={styles.infoTab}>
          <p>Кафедра</p>
          <p className={styles.value}>{user?.department}</p>
        </div>
      </section>
      {user.isAdmin ?
        <section className={styles.admin}>
          <Link href={'/adminpanel'} className={styles.link}>Админ панель</Link>
          <Link href={'/analitics'} className={styles.link}>Статистика</Link>
        </section> :
        <section>
          <Link href={'/adminpanel'} className={styles.link}>Импортировать курс</Link>
        </section>}
    </main>
  );
}