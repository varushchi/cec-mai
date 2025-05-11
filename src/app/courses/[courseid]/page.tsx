'use client'
import React, { useState, useEffect } from 'react'
import { CourseProps, ModulesProps, LessonsProps } from '@/types/types'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import Link from 'next/link';
import styles from './page.module.css'
import { useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';

function Module({index, title, id, course_id}: {index: number, title: string, id: number, course_id: number}) {
  return(
    <Link className={styles.link} href={`/courses/${course_id}/lessons/${id}`}>
      <p className={styles.index}>{index}</p>
      <p className={styles.title}>{title}</p>
    </Link>
  )
}

function Lesson({index, title, id, course_id, module_id}: {index: number, title: string, id: number, course_id: string, module_id: number}) {
  return(
    <Link className={styles.link} href={`/courses/${course_id}/modules/${module_id}/lessons/${id}`}>
      <p className={styles.index}>{index}</p>
      <p className={styles.title}>{title}</p>
    </Link>
  )
}

export default function Course() {

  const { user } = useAppSelector(state => state.user)
  const [modules, setModules] = useState<ModulesProps[]>([])
  const courseid = useParams<{courseid: string}>()
  const [course, setCourse] = useState<CourseProps>({
  id: courseid?.courseid || '',
  title: '',
  description: ''
  })
  const [lessons, setLessons] = useState<LessonsProps[][]>([])

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
    const items: CollapseProps['items'] = [
    {
      key: index + 1,
      label: `Модуль ${module?.title}`,
      children: lessonsElem[index],
      classNames: {header: styles.coolapseHeader, body: styles.collapseBody}
    },
  ]
    return(
      <Collapse items={items} className={styles.collapse}/>
    )
  })

  

  return (
    <div className={styles.main}>
      <h1>Модули {course?.title}</h1>
      <p className={styles.description}>{course?.description}</p>
      <div className={styles.modules}>
        {modulesElem}
      </div>

      
    </div>
  )
}
