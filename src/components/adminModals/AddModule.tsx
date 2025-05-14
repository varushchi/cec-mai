'use client'
import React, { useState } from 'react'
import { Modal } from 'antd'
import type { CourseProps } from '@/types/types'
import styles from './adminmodals.module.css'

export default function AddModule () {

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState({
    title: '',
    course_id: ''
  })
  const [courses, setCouses] = useState<CourseProps[]>([
    {
      id: '1',
      title: '1234'
    },
    {
      id: '2',
      title: 'csdcndckdjnc'
    },
  ])

  return (
    <section>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.open}
      >
        Добавить модули
      </button>
      <Modal
        open={isOpen}
        title='Добавить новый модуль'
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        width='min(80%, 600px)'
        footer={[]}
      >
        <form className={styles.form}>
          <label htmlFor='module_title'>Название</label>
          <input
            type='text'
            name='title'
            id='module_title'
            className={styles.input}
            value={inputValue.title}
            onChange={(e) => setInputValue(prev => {
              return {...prev, title: e.target.value}
            })}
          />
          <label htmlFor='course_name'>Принадлежит курсу</label>
          <select
            id='course_name'
            className={styles.input}
            value={inputValue.course_id}
            onChange={(e) => setInputValue(prev => {
              return {...prev, course_id: e.target.value}
            })}
          >
            <option value='' selected disabled hidden>Выбрать курс</option>
              {courses.map((course, index) => {
                return(
                  <option key={index} value={course.id}>{course.title}</option>
                )
              })}
          </select>
          <button className={styles.create} type='submit'>Создать</button>
        </form>
      </Modal>
    </section>
  )
}