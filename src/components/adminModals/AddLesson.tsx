'use client'
import React, { useState } from 'react';
import { Modal } from 'antd';
import type { CourseProps, ModulesProps } from '@/types/types';
import styles from './adminmodals.module.css'

export default function AddLesson() {
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [inputValue, setInputValue] = useState<
  {title: string,
  course_id: string,
  module_id: string,
  content: string[]
}>({
    title: '',
    course_id: '',
    module_id: '',
    content: []
  })
    const [courses, setCouses] = useState<CourseProps[]>([])
    const [modules, setModule] = useState<ModulesProps[]>([])
  
    return (
      <section>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.open}
        >
          Добавить уроки
        </button>
        <Modal
          open={isOpen}
          title='Добавить новый урок'
          onCancel={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          width='min(80%, 800px)'
          style={{top: '20px'}}
          footer={[]}
        >
          <form className={styles.form}>
            <label htmlFor='lesson_title'>Название</label>
            <input
              type='text'
              name='title'
              id='lesson_title'
              className={styles.input}
              value={inputValue.title}
              onChange={(e) => setInputValue(prev => {
                return {...prev, title: e.target.value}
              })}
            />
            <label htmlFor='course_name_select'>Принадлежит курсу</label>
            <select
              id='course_name_select'
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
            <label htmlFor='module_name_select'>Принадлежит модулю</label>
            <select
              id='module_name_select'
              className={styles.input}
              value={inputValue.module_id}
              onChange={(e) => setInputValue(prev => {
                return {...prev, module_id: e.target.value}
              })}
            >
              <option value='' selected disabled hidden>Выбрать модуль</option>
                {modules.map((module, index) => {
                  return(
                    <option key={index} value={module.id}>{module.title}</option>
                  )
                })}
            </select>
            <label htmlFor='content'>Содержание урока</label>
            <textarea
              id='content'
              className={styles.textarea}
              value={inputValue.content[page] || ''}
              onChange={(e) => setInputValue(prev => {
                const newContent = [...prev.content]
                newContent[page] = e.target.value
                return {...prev, content: newContent}
              })}
            />
            <div className={styles.navigation}>
              {page > 0 ?
                <button type='button' className={styles.back} onClick={() => setPage(prev => prev - 1)}>Предыдущая страница</button> :
                null}
              {inputValue.content[page] ?
                  <button type='button' className={styles.forward} onClick={() => setPage(prev => prev + 1)}>Следующая страница</button> :
                  null}
            </div>
            <button className={styles.create} type='submit'>Создать</button>
          </form>
        </Modal>
      </section>
    )
}
