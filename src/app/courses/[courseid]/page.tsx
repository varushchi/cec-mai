import React from 'react'
import { CourseProps, ModulesProps } from '@/types/types'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import Link from 'next/link';

const course: CourseProps = {
  id: '1',
  title: 'python1',
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
    <Link href={`/courses/${course_id}/lessons/${id}`}>
      <p>{index}</p>
      <p>{title}</p>
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
      label: course.title,
      children: modulesElem
    }
  ]

  return (
    <div>
      <Collapse items={items} />;

    </div>
  )
}
