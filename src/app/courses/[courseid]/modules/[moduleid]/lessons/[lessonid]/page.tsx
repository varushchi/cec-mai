'use client'
import React, { useEffect, useState } from 'react'
import { LessonsProps, PagesProps } from '@/types/types'
import styles from './page.module.css'
import { useAppSelector } from '@/store/hooks'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const lessonHolder: LessonsProps = {
  id: 1,
  module_id: 1,
  title: 'Знакомство с переменными',
  order: 1
}

const PagesHolder: PagesProps[] = [
  {
    id: 1,
    lesson_id: 1,
    content: `Что такое Python?
    Python — это высокоуровневый, интерпретируемый язык программирования, созданный Гвидо ван Россумом в начале 1990-х годов.

    Он популярен благодаря:
    - Простому синтаксису (читается как английский язык)
    - Большому количеству библиотек
    - Кроссплатформенности (работает на Windows, macOS, Linux)

    Python широко используется:
    
    Анализе данных
    
    `
  },
  {
    id: 2,
    lesson_id: 1,
    content: ''
  }
]



export default function Lesson() {

  const { user } = useAppSelector(state => state.user)
  const [lesson, setLesson] = useState<LessonsProps>(lessonHolder)
  const [lessonPage, setLessonPage] = useState<PagesProps[]>(PagesHolder)
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
        const url = `http://localhost/ppproject/public/api/v1/lessons/${lesson?.id}/pages`
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

  }, [lesson?.id])

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
      <p className={styles.content}>{lessonPage[page - 1]?.content}</p>
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
        {page < lessonPage.length ? <button
          className={`${styles.navButton} ${styles.navButtonForward}`}
          onClick={hanldeForward}
        >
          Вперед
        </button> : null}
      </div>
      {page >= lessonPage.length ?
        <Link
          href={`/courses/${params?.courseid}`}
          className={styles.link}
        >
          Вы прошли урок. Вернуться обратно к курсу
          </Link> :
          null}
    </article>
  )
}
