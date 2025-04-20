'use client'
import NotLoggedIn from '@/pages/NotLoggedIn'
import { useParams } from 'next/navigation'
import styles from './page.module.css'

export default function Profile() {
  const params = useParams<{userid: string}>()
  const currentUserid = 'vadimaty'
  if (currentUserid !== params?.userid) {
    return <NotLoggedIn />
  }
  
  return (
    <div className={styles.main}>
      <section>
        <h1 className={styles.header}>Мои курсы</h1>
      </section>
      <section className={styles.table}>
        <div className={styles.column}>
          <p>В процессе</p>
        </div>
        <div className={styles.column}>
          <p>Доступные</p>
        </div>
        <div className={styles.column}>
          <p>Завершенные</p>
        </div>
      </section>
    </div>
  );
}