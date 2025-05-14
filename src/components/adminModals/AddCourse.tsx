'use client'
import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from './adminmodals.module.css'

export function AddCourse () {

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState({
    title: '',
    description: ''
  })

  return (
    <section>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.open}
      >
        Добавить курсы
      </button>
      <Modal
        open={isOpen}
        title='Добавить новый курс'
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        width='min(80%, 600px)'
        footer={[]}
      >
        <form className={styles.form}>
          <label htmlFor='course_title'>Название</label>
          <input
            type='text'
            name='title'
            id='course_title'
            className={styles.input}
            value={inputValue.title}
            onChange={(e) => setInputValue(prev => {
              return {...prev, title: e.target.value}
            })}
          />
          <label htmlFor='course_description'>Описание</label>
          <input
            type='text'
            name='description'
            id='course_description'
            className={styles.input}
            value={inputValue.description}
            onChange={(e) => setInputValue(prev => {
              return {...prev, description: e.target.value}
            })}
          />
          <button className={styles.create} type='submit'>Создать</button>
        </form>
      </Modal>
    </section>
  )
}