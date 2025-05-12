'use client'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/slices/ModalSlice";
import Link from "next/link";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { CourseProps } from '@/types/types'
import CourseCardPlane from "@/components/CourseCardPlane/CourseCardPlane";

const Home = () => {

  const [courses, setCourses] = useState<CourseProps[]>([])
  const {user} = useAppSelector(state => state.user)

  useEffect(() => {
    async function getCourses(){
      const res = await fetch('http://localhost/ppproject/public/api/v1/pcourses')
      const data = await res.json()
      setCourses(data.data)
    }

    getCourses()
  }, [user])

  const dispatch = useAppDispatch()

  return (
    <div className={styles.main}>
      <h1 className={styles.header}>Мониторинг повышения квалификации преподавателей</h1>
      <p className={`${styles.paragraph} ${styles.bold}`}>Дипломный проект студентов МАИ 307 кафедры</p>
      <p className={styles.paragraph}>Приложение для препадаветелей МАИ повысить свою квалификацию <br/> в области программирования и получить сертикат</p>

      {!user ?
        <div className={styles.container}>
          <p className={styles.paragraph}>Чтобы пройти курсы нужно быть зарегестированным пользвателем</p>
          <p className={styles.paragraph}>Мы собираем статистику</p>
          <button
            onClick={() => dispatch(openModal({modalType: 'login'}))}
            className={styles.openModal}
          >
            Войти/Зарегестрироваться
          </button>
        </div> :
        null}
      
      <div className={styles.container}>
        <p className={`${styles.paragraph} ${styles.bold}`}>Доступны курсы по Python</p>
        <div
          className={styles.courses}
          style={{
            width: `max(calc(${courses.length} * 300px), 90%)`
          }}
        >
          {courses.map((course, index) => {
            return(
              <div
                key={course.id}
                className={styles.course}
                style={{
                  animationDelay: `calc(30s / ${courses.length} * (${courses.length} - ${index + 1}) * -1)`,
                  left: `max(calc(300px * ${courses.length}), 100%)`
                }}
                >
                <CourseCardPlane courses = {course}/>
              </div>
            )
          })}
        </div>
        <Link className={styles.link} href={'/courses'}>Перейти к курсам</Link>
      </div>
    </div>
  );
}

export default Home
