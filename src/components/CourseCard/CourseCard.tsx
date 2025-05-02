import Link from 'next/link'
import React from 'react'
import styles from './coursecard.module.css'

interface Props{
  id: string,
  title: string,
  type:  "inprogress" | "completed"
  isImported: boolean | null
  progress: string | null
}

const InprogressSection = ({progress, id} : {progress: string | null, id: string}) => {
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

const CompletedSection = ({isImported, id}: {isImported: boolean | null, id: string}) => {
  return(
    <div className={styles.section}>
      {!isImported ? <Link className={styles.link} href={`/certificate/${id}`}>Сертификат</Link> : null}
    </div>
  )
}

export default function CourseCard(props: Props) {

    const sectionMap = {
      inprogress: <InprogressSection progress={props.progress} id= {props.id}/>,
      completed: <CompletedSection isImported={props.isImported} id= {props.id}/>
    };


  return (
    <div className={styles.card} id={props.id}>
      <p className={styles.title}>{props.title}</p>
      {sectionMap[props.type]}
    </div>
  )
}
