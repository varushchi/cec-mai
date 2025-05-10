'use client'
import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { memo } from 'react'
import { CourseProps } from '@/types/types'
import CourseCard from '@/components/CourseCard/CourseCard'
import styles from './page.module.css'


let courses: CourseProps[]   = [
  {
    id: '1',
    title: 'python1',
    status: 'available',
    progress: '85',
  },
  {
    id: '2',
    title: 'python2',
    status: 'available',
    progress: '5',
  },
  {
    id: '3',
    title: 'python3',
    status: 'available',

  },
]


const CoursesWOUser = memo(function CoursesWOUser({ courses }: { courses: CourseProps[] }) {

  const coursesELem = courses.map(course => {
    return(
      <CourseCard {...course} key={course.id} />
    )
  })
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <p className={styles.sectionName}>Доступные</p>
        <div className={styles.courses}>
          {coursesELem.length > 0 ?
            coursesELem :
            <p className={styles.empty}>...Пусто...</p>}
        </div>
      </div>
    </div>
  )
})

const CoursesWUser = memo(function CoursesWUser({ courses }: { courses: CourseProps[] }) {
  const availableElem = courses.filter(course => course.status === 'available')
  const completedElem = courses.filter(course => course.status === 'completed')
  const inprogressElem = courses.filter(course => course.status === 'inprogress')
  return(
    <div className={styles.container}>
      <div className={styles.column}>
        <p className={styles.sectionName}>Доступные</p>
        <div className={styles.courses}>
          {availableElem.length > 0 ?
            availableElem.map(course => {
              return(
                <CourseCard {...course} key={course.id} />
              )
            }) :
            <p className={styles.empty}>...Пусто...</p>}
        </div>
      </div>
      <div className={styles.column}>
        <p className={styles.sectionName}>В процессе</p>
        <div className={styles.courses}>
          {inprogressElem.length > 0 ?
            inprogressElem.map(course => {
              return(
                <CourseCard {...course} key={course.id} />
              )
            }) :
            <p className={styles.empty}>...Пусто...</p>}
        </div>
      </div>
      <div className={styles.column}>
      <p className={styles.sectionName}>Завершенные</p>
      <div className={styles.courses}>
          {completedElem.length > 0 ?
            completedElem.map(course => {
              return(
                <CourseCard {...course} key={course.id} />
              )
            }) :
            <p className={styles.empty}>...Пусто...</p>}
        </div>
      </div>
    </div>
  )
})

export default function Courses() {

  const { user } = useAppSelector(state => state.user)

    return (
      <div className={styles.main}>
        <h1 className={styles.header}>Курсы Python</h1>
          {user ?
            <CoursesWUser courses={courses}/> :
            <CoursesWOUser courses={courses}/>
          }
      </div>
    )
}
