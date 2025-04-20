import Link from 'next/link'
import React from 'react'

interface Props{
  id: string,
  title: string,
  type: "available" | "inprogress" | "completed"
  isImported: boolean | null
  progress: string | null
}

const InprogressSection = ({progress} : {progress: string | null}) => {
  return(
    <div>
      <p>{progress}</p>
      <Link href={'/'}>Продолжить курс</Link>
    </div>
  )
}

const AvailableSection = () => {
  return(
    <div>
      <Link href={'/'}>Записаться на курс</Link>
    </div>
  )
}

const CompletedSection = ({isImported}: {isImported: boolean | null}) => {
  return(
    <div>
      {!isImported ? <Link href={'/'}>Сертификат</Link> : null}
    </div>
  )
}

export default function CourseCard(props: Props) {

    const sectionMap = {
      available: <AvailableSection />,
      inprogress: <InprogressSection progress={props.progress}/>,
      completed: <CompletedSection isImported={props.isImported}/>
    };


  return (
    <div>
      <p>{props.title}</p>
      {sectionMap[props.type]}
    </div>
  )
}
