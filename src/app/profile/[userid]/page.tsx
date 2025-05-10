'use client'
import NotLoggedIn from '@/pages/NotLoggedIn'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import Link from 'next/link'
import CourseCard from '@/components/CourseCard/CourseCard'
import { useAppSelector } from '@/store/hooks'
import { CourseProps } from '@/types/types'

export default function Profile() {
  const params = useParams<{userid: string}>()
  const {user} = useAppSelector(state => state.user)
  console.log("user.user_id", user?.user_id)
  console.log("params?.userid", params?.userid)
  if (!user || user.user_id != params?.userid) {
    return <NotLoggedIn />
  }

  const courses: CourseProps[] = [
    {
      id: '1',
      title: 'python1',
      status: 'inprogress',
      progress: '85',
    },
    {
      id: '2',
      title: 'python2',
      status: 'inprogress',
      progress: '5',
    },
    {
      id: '3',
      title: 'python3',
      status: 'completed',
    },
  ]

  const completed = courses.filter(course => course.status === 'completed')
  const inprogress = courses.filter(course => course.status === 'inprogress')
  
  return (
    <div className={styles.main}>
      <section>
        <h1 className={styles.header}>Мои курсы</h1>
      </section>
      <section className={styles.table}>
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