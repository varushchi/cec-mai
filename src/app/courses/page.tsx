'use client'
import { useAppSelector } from '@/store/hooks'
import React, { useState, useEffect } from 'react'
import { memo } from 'react'
import { CourseProps } from '@/types/types'
import CourseCard from '@/components/CourseCard/CourseCard'
import styles from './page.module.css'

const CoursesWOUser = memo(function CoursesWOUser({ courses }: { courses: CourseProps[] }) {

  const coursesELem = courses.map(course => {
    return(
      <CourseCard courses={course} key={course.id} />
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
                <CourseCard courses={course} key={course.id} />
              )
            }) :
            <p className={styles.empty}>...Пусто...</p>}
        </div>
      </div>
      {inprogressElem.length > 0 ? <div className={styles.column}>
      <p className={styles.sectionName}>В процессе</p>
      <div className={styles.courses}>
          {inprogressElem.map(course => {
            return(
              <CourseCard courses={course} key={course.id} />
            )
            })}
        </div>
      </div>: null}
      {completedElem.length > 0 ? <div className={styles.column}>
      <p className={styles.sectionName}>Завершенные</p>
      <div className={styles.courses}>
          {completedElem.map(course => {
            return(
              <CourseCard courses={course} key={course.id} />
            )
            })}
        </div>
      </div>: null}
    </div>
  )
})

export default function Courses() {

   const [courses, setCourses] = useState<CourseProps[]>([])
   const { user } = useAppSelector(state => state.user)
  
    useEffect(() => {
      async function getCourses(){
        const url = user ? 'http://localhost/ppproject/public/api/v1/courses' : 'http://localhost/ppproject/public/api/v1/pcourses'
        const token = user ? localStorage.getItem('user_token') : ''
        console.log(token)
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        console.log(data)
        setCourses(data.data)
      }
  
      getCourses()
    }, [user])

  

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
