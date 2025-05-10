import React from 'react'
import { LessonsProps } from '@/types/types'
import styles from './page.module.css'

const lesson: LessonsProps = {
  id: 1,
  module_id: 1,
  title: 'python 1 module 1 lesson 1',
  content: 'bla bla bla',
  order: 1

}

export default function Lesson() {

  return (
    <article className={styles.main}>
      <h1 className={styles.title}>{lesson.title}</h1>
      <p className={styles.content}>{lesson.content}</p>
      <div className={styles.navigation}>
        <button className={styles.navButton}>Назад</button>
        <button className={styles.navButton}>Вперед</button>
      </div>
    </article>
  )
}
