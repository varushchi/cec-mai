'use client'
import NotLoggedIn from '@/pages/NotLoggedIn'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import Link from 'next/link'
import CourseCard from '@/components/CourseCard/CourseCard'
import { useAppSelector } from '@/store/hooks'

export default function Profile() {
  const params = useParams<{userid: string}>()
  const {user} = useAppSelector(state => state.user)
  if (!user || user.id !== params?.userid) {
    return <NotLoggedIn />
  }

  const courses: {
    id: string,
    title: string,
    type:  "inprogress" | "completed"
    isImported: boolean | null
    progress: string | null
  }[] = [
    {
      id: '1',
      title: 'python1',
      type: 'inprogress',
      progress: '85',
      isImported: null
    },
    {
      id: '2',
      title: 'python2',
      type: 'inprogress',
      progress: '5',
      isImported: null
    },
    {
      id: '3',
      title: 'python3',
      type: 'completed',
      progress: null,
      isImported: null

    },
  ]

  const completed = courses.filter(course => course.type === 'completed')
  const inprogress = courses.filter(course => course.type === 'inprogress')
  
  return (
    <div className={styles.main}>
      <section>
        <h1 className={styles.header}>Мои курсы</h1>
      </section>
      <section className={styles.table}>
      <div className={styles.column}>
          <h3 className={styles.header3}>Доступные</h3>
          <Link className={styles.link} href={'/courses'}>Перейти к курсам</Link>
        </div>
        <div className={styles.column}>
          <h3 className={styles.header3}>В процессе</h3>
          <div className={styles.cards}>
            {inprogress.map(course => {
              return(
                <CourseCard {...course} key={course.id}/>
              )
            })}
          </div>
        </div>
        <div className={styles.column}>
          <h3 className={styles.header3}>Завершенные</h3>
          <div className={`${styles.cards} ${styles.completed}`} >
          {completed.map(course => {
            return(
              <CourseCard {...course} key={course.id}/>
            )
          })}
          </div>
          <Link className={`${styles.link}`} href={'/import'}>Импортировать курс</Link>
        </div>
      </section>
    </div>
  );
}