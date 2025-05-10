import React from 'react'
import { CourseProps, ModulesProps } from '@/types/types'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import Link from 'next/link';
import styles from './page.module.css'

const course: CourseProps = {
  id: '1',
  title: 'python1',
  description: 'description for python 1'
}

const modules: ModulesProps[] = [
  {
    id: 1,
    course_id: 1,
    title: 'python 1 module 1'
  },
  {
    id: 2,
    course_id: 1,
    title: 'python 1 module 2'
  },
  {
    id: 3,
    course_id: 1,
    title: 'python 1 module 3'
  },
]

function Module({index, title, id, course_id}: {index: number, title: string, id: number, course_id: number}) {
  return(
    <Link className={styles.link} href={`/courses/${course_id}/lessons/${id}`}>
      <p className={styles.index}>{index}</p>
      <p className={styles.title}>{title}</p>
    </Link>
  )
}

export default function Course() {

  const modulesElem = modules.map((module, index) => {
    return(
      <Module
        index={index+1}
        title={module.title}
        key={index}
        id={module.id}
        course_id={module.course_id}
      />
    )
  })

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: `Модули ${course.title}`,
      children: modulesElem,
      classNames: {header: styles.coolapseHeader, body: styles.collapseBody}
    },
  ]

  return (
    <div className={styles.main}>
      <h1>Модули {course.title}</h1>
      <p className={styles.description}>{course.description}</p>
      <Collapse items={items} className={styles.collapse}/>
    </div>
  )
}
