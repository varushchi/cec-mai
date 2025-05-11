'use client'
import React, { useEffect, useState } from 'react'
import { LessonsProps, PagesProps } from '@/types/types'
import styles from './page.module.css'
import { useAppSelector } from '@/store/hooks'
import { useParams } from 'next/navigation'

export default function Lesson() {

  const { user } = useAppSelector(state => state.user)
  const [lesson, setLesson] = useState<LessonsProps>()
  const [lessonPage, setLessonPage] = useState<PagesProps>()
  const [page, setPage] = useState(1)
  const params = useParams<{
    courseid: string;
    moduleid: string;
    lessonid: string;
  }>()



  useEffect(() => {
    if (!user) return
    async function getLesson() {
        const url = `http://localhost/ppproject/public/api/v1/lessons/${params?.lessonid}`
        const token = localStorage.getItem('user_token') || ''
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (res.ok){
          const data = await res.json()
          setLesson(data)
        }
      }

      getLesson()

  }, [user])

  useEffect(() => {
    if (!user || !lesson?.id) return
    async function getLessonContent() {
        const url = `http://localhost/ppproject/public/api/v1/lessons/${lesson?.id}/pages/${page}`
        const token = localStorage.getItem('user_token') || ''
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (res.ok){
          const data = await res.json()
          setLessonPage(data)
        }
      }

      getLessonContent()

  }, [lesson?.id, page])

  function hanldeBack() {
    if (page != 1) {
      setPage(prev => prev - 1)
    }
  }

  function hanldeForward() {
      setPage(prev => prev + 1)
  }



  return (
    <article className={styles.main}>
      <h1 className={styles.title}>{lesson?.title}</h1>
      <p className={styles.content}>{lessonPage?.content}</p>
      <div className={styles.navigation}>
        {page !== 1 ? 
          <button
            className={`${styles.navButton} ${styles.navButtonBack}`}
            onClick={hanldeBack}
          >
            Назад
          </button> : 
          null}
          <p className={styles.pageNumber}>{page}</p>
        <button
          className={`${styles.navButton} ${styles.navButtonForward}`}
           onClick={hanldeForward}
        >
          Вперед
        </button>
      </div>
    </article>
  )
}
