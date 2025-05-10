import Link from 'next/link'
import React from 'react'
import styles from './coursecard.module.css'
import { CourseProps } from '@/types/types'

const InprogressSection = ({ progress, id } : { progress?: string, id: string }) => {
  const progressValue = progress ? parseInt(progress) : 0;
  return(
    <div className={`${styles.section} ${styles.active}`}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressValue}%` }}
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <p className={styles.progressText}>{progressValue}%</p>
        </div>
      </div>
      <Link className={styles.link} href={`/courses/${id}`}>Продолжить курс</Link>
    </div>
  )
}

const CompletedSection = ({ isImported, id }: { isImported?: boolean, id: string }) => {
  return(
    <div className={styles.section}>
      {!isImported ? <Link className={styles.link} href={`/certificate/${id}`}>Сертификат</Link> : null}
    </div>
  )
}


const AvailableSection = ({ id }: { id: string }) => {
  return(
    <div className={styles.section}>
      <Link className={styles.link} href={`/courses/${id}`}>Перейти к курсу</Link>
    </div>
  )
}

export default function CourseCard(props: CourseProps) {

    const sectionMap = {
      inprogress: <InprogressSection progress={props.progress} id={props.id}/>,
      completed: <CompletedSection isImported={props.isImported} id={props.id}/>,
      available: <AvailableSection id={props.id}/>
    }


  return (
    <div className={styles.card} id={props.id}>
      <p className={styles.title}>{props.title}</p>
      {props.status ? sectionMap[props.status]: sectionMap['available']}
    </div>
  )
}
