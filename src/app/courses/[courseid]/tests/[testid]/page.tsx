'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { Questions } from '@/types/types'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import Link from 'next/link'

function getResults(answs: boolean[]){
  const length = answs.length
  let correct = 0
  answs.forEach(answ => {
    if (answ) correct = correct + 1
  })

  return Math.round(correct / length)

}

export default function Test() {

  const { user } = useAppSelector(state => state.user)
  const [questions, setQuestions] = useState<Questions[]>([])
  const [page, setPage] = useState(1)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [isDone, setIsDone] = useState(false)
  const params = useParams<{courseid: string, testid: string}>()

  function handleNext(isLast = false){
    const result = selectedOption === questions[page - 1].correct_option
      setAnswers(prev => [...prev, result])
      setSelectedOption(null)
      setPage(prev => prev + 1)

      if (isLast) setIsDone(true)
  }

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value)
  }

  useEffect(() => {
    if (!user || params?.courseid || (page > questions.length)) return

    async function getQuestions(){
      const url = `http://localhost/ppproject/public/api/v1/courses/${params?.courseid}/tests/${params?.testid}/questions`
      const token = user ? localStorage.getItem('user_token') : ''
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setQuestions(data)
    }

    getQuestions()

  }, [user, params])

  const progress = (page - 1) / questions.length === 0 ? '20px' : `${((page - 1) / questions.length) * 100}%`

  return (
    <main className={styles.main}>
      <div
        className={styles.progress}
      >
        <div style={{width: progress}} className={styles.bar}></div>
      </div>
      {!isDone ?
        <section className={styles.section}>
          <h1 className={styles.question}>{questions[page - 1]?.question}</h1>
            <Radio.Group
              onChange={handleOptionChange}
              className={styles.radioGroup}
              value={selectedOption}
              options={[
                {value: 'a', label: questions[page - 1].option_a},
                {value: 'b', label: questions[page - 1].option_b},
                {value: 'c', label: questions[page - 1].option_c},
                {value: 'd', label: questions[page - 1].option_d},
              ]}
            />
          <div className={styles.navigation}>
            {selectedOption && page < questions.length ?
              <button
                onClick={() => handleNext()}
                className={styles.navButton}
              >
                Дальше
              </button> :
              null}
            {page >= questions.length ?
              <button
                onClick={() => handleNext(true)}
                className={styles.navButton}
              >
                Сохранить ответы
              </button> :
              null}
          </div>
        </section> :
        <section className={styles.sectionSaved}>
          <h1 className={styles.saved}>Результат: {getResults(answers)}%</h1>
          <Link href={`/courses/${params?.courseid}`} className={styles.link}>Вернуться к курсу</Link>
        </section>}
    </main>
  )
}