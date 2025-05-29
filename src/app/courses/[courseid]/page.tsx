'use client'
import React, { useState, useEffect } from 'react'
import { CourseProps, ModulesProps, LessonsProps, TestsProps } from '@/types/types'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import Link from 'next/link';
import styles from './page.module.css'
import { useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';

const courseHolder: CourseProps = {
    id: '1',
    title: 'Основы Python',
    status: 'available'
  }

const modulesHolder: ModulesProps[] = [
  {
    id: 1,
    course_id: 1,
    title: 'Введение: переменные и типы данных'
  },
  {
    id: 2,
    course_id: 1,
    title: 'Структуры данных'
  }
]

const lessonsHolder: LessonsProps[][] = [
  [
    {
      id: 1,
      module_id: 1,
      title: 'Знакомство с переменными',
      order: 1
    },
    {
      id: 2,
      module_id: 1,
      title: 'Типы данных',
      order: 1
    },
    {
      id: 3,
      module_id: 1,
      title: 'Правила наименования',
      order: 1
    },
    {
      id: 4,
      module_id: 1,
      title: 'Преобразование типов данных',
      order: 1
    },
  ]
]

const testHolder: TestsProps[] = [
  {
    id: 1,
    course_id: 1,
    module_id: 1,
    title: 'Тест: знакомство с переменными'
  }
]

function Lesson({index, title, id, course_id, module_id}: {index: number, title: string, id: number, course_id: string, module_id: number}) {
  return(
    <Link className={styles.link} href={`/courses/${course_id}/modules/${module_id}/lessons/${id}`}>
      <p className={styles.index}>{index}</p>
      <p className={styles.title}>{title}</p>
    </Link>
  )
}

function Test({index, title, id, course_id}: {index: number, title: string, id: number, course_id: number}) {
  return(
    <Link className={styles.link} href={`/courses/${course_id}/tests/${id}`}>
      <p className={styles.index}>{index}</p>
      <p className={styles.title}>{title}</p>
    </Link>
  )
}

export default function Course() {

  const { user } = useAppSelector(state => state.user)
  const [modules, setModules] = useState<ModulesProps[]>(modulesHolder)
  const courseid = useParams<{courseid: string}>()
  const [course, setCourse] = useState<CourseProps>(courseHolder)
  const [lessons, setLessons] = useState<LessonsProps[][]>(lessonsHolder)
  const [tests, setTests] = useState<TestsProps[]>(testHolder)

  const getToken = (): string => localStorage.getItem('user_token') || ''

  useEffect(() => {

    if (!user || !course.id) return

    async function GetCourse() {
        const url = `http://localhost/ppproject/public/api/v1/courses/${course.id}`
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          }
        })
        if (res.ok){
          const data = await res.json()
          setCourse(data)
        }
      }

    GetCourse()

  }, [user, courseid])

  useEffect(() => {
    if (!user || !course?.id) return

    async function getModules(){
      const url = `http://localhost/ppproject/public/api/v1/courses/${course.id}/modules`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setModules(data.data)
    }

    getModules()

  }, [user, course?.id])

  useEffect(() => {
    if (!user || !course?.id) return

    async function getTests(){
      const url = `http://localhost/ppproject/public/api/v1/courses/${course.id}/tests`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setTests(data.data)
    }

    getTests()

  }, [user, course?.id])

  useEffect(() => {
    if (!user || !course?.id || modules.length === 0) return

    async function getLessons(module_id: number){
      const url = `http://localhost/ppproject/public/api/v1/modules/${module_id}/lessons`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setLessons((prev) => [...prev, data.data]);
    }

    modules.forEach(module => getLessons(module.id))

  }, [user, course?.id, modules])

  const lessonsElem = lessons.map(lessonsInModule => {
    return(
      lessonsInModule.map((lesson, index) => {
        return(
          <Lesson
            index={index+1}
            title={lesson.title}
            key={index}
            id={lesson.id}
            course_id={course.id}
            module_id={lesson.module_id}
          />
        )
      })
    )
  })

  const modulesElem = modules.map((module, index) => {
    const Lessonitems: CollapseProps['items'] = [
    {
      key: index + 1,
      label: `Модуль ${module?.title}`,
      children: lessonsElem[index],
      classNames: {header: styles.coolapseHeader, body: styles.collapseBody}
    },
  ]
    return(
      <Collapse items={Lessonitems} className={styles.collapse} key={index}/>
    )
  })

  const testElem = tests.map((test, index) => {
    return (
      <Test key={index} index={index+1} title={test.title} course_id={test.course_id} id={test.id}/>
    )
  })

   const Testitems: CollapseProps['items'] = [
    {
      key: 1,
      label: `Тесты по ${course?.title}`,
      children: testElem,
      classNames: {header: styles.coolapseHeader, body: styles.collapseBody}
    },
  ]

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1>Модули &quot;{course?.title}&quot;</h1>
        <p className={styles.description}>{course?.description}</p>
        <div className={styles.modules}>
          {modulesElem}
        </div>
      </section>
      <section className={styles.section}>
        <h1>Тесты	&quot;{course?.title}&quot;</h1>
        <div className={styles.tests}>
          <Collapse items={Testitems} className={styles.collapse}/>
        </div>
      </section>
    </main>
  )
}
