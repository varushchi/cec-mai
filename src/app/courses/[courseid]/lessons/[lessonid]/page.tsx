import React from 'react'
import { LessonsProps } from '@/types/types'

const lesson: LessonsProps = {
  id: 1,
  lesson_id: 1,
  title: 'python 1 module 1 lesson 1',
  content: 'bla bla bla',
  order: 1

}

export default function Lesson() {

  return (
    <article>
      <h1>{lesson.title}</h1>
      <p>{lesson.content}</p>
    </article>
  )
}
