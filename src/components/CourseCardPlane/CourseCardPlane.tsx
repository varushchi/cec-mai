import Link from 'next/link'
import React from 'react'
import styles from './coursecardplane.module.css'
import { CourseProps } from '@/types/types'


const AvailableSection = ({ id }: { id: string }) => {
  return(
    <div className={styles.section}>
      <Link className={styles.link} href={`/courses/${id}`}>Перейти к курсу</Link>
    </div>
  )
}

export default function CourseCardPlane({courses}: { courses: CourseProps}) {



  return (
    <div className={styles.card} id={courses?.id}>
      <span className={`${styles.bigWings} ${styles.left}`}></span>
      <span className={`${styles.bigWings} ${styles.right}`}></span>
      <span className={`${styles.smallWings} ${styles.left}`}></span>
      <span className={`${styles.smallWings} ${styles.right}`}></span>
      <p className={styles.title}>{courses?.title}</p>
    </div>
  )
}
