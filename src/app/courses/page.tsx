'use client'
import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { memo } from 'react'
import { CourseProps } from '@/types/types'
import CourseCard from '@/components/CourseCard/CourseCard'


const courses: CourseProps[]   = [
  {
    id: '1',
    title: 'python1',
    status: 'available',
    progress: '85',
  },
  {
    id: '2',
    title: 'python2',
    status: 'available',
    progress: '5',
  },
  {
    id: '3',
    title: 'python3',
    status: 'available',

  },
]

const CoursesWOUser = memo(function CoursesWOUser({ courses }: { courses: CourseProps[] }) {

  const coursesELem = courses.map(course => {
    return(
      <CourseCard {...course} key={course.id} />
    )
  })
  return (
    <div>
      <div>
        <p>Доступные</p>
        {coursesELem}
      </div>
    </div>
  )
})

const CoursesWUser = memo(function CoursesWUser({ courses }: { courses: CourseProps[] }) {
  const availableElem = courses.filter(course => course.status === 'available')
  const completedElem = courses.filter(course => course.status === 'completed')
  const inprogressElem = courses.filter(course => course.status === 'inprogress')
  return(
    <div>
      <div>
        <p>Доступные</p>
        {availableElem.map(course => {
          return(
            <CourseCard {...course} key={course.id} />
          )
        })}
      </div>
      <div>
        <p>В процессе</p>
        {completedElem.map(course => {
          return(
            <CourseCard {...course} key={course.id} />
          )
        })}
      </div>
      <div>
      <p>Завершенные</p>
        {inprogressElem.map(course => {
          return(
            <CourseCard {...course} key={course.id} />
          )
        })}
      </div>
    </div>
  )
})

export default function Courses() {

  const { user } = useAppSelector(state => state.user)

    return (
      <div>
        <h1>Курсы</h1>
        <div>
          {user ?
            <CoursesWUser courses={courses}/> :
            <CoursesWOUser courses={courses}/>
          }
        </div>

      </div>
    )
}
