import React from 'react'
import styles from './coursecardplane.module.css'
import { CourseProps } from '@/types/types'

export default function CourseCardPlane({courses}: { courses: CourseProps}) {



  return (
    <div className={styles.card} id={courses?.id}>
      <p className={styles.title}>{courses?.title}</p>
    </div>
  )
}
