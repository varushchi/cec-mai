import styles from './footer.module.css'
import { MailOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return(
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <section className={styles.section}>
          <p className={styles.header}></p>
          <Link href={'/'} className={styles.imageLink}>
            <Image
              src='/MAI95_logo_white.png'
              alt='MAIx95 logo'
              width={200}
              height={100}
              layout='responsive'

              className={styles.image}
            />
          </Link>

        </section>
        <section className={styles.section}>
          <p className={styles.header}>Контакты</p>
          <div className={styles.mail}>
            <MailOutlined />
            <a href='mailto:vaschigolev@mai.education' target='__blank'>М3О-12Б-21 Лигай Даниил </a>
          </div>
          <div className={styles.mail}>
            <MailOutlined />
            <a href='mailto:vaschigolev@mai.education' target='__blank'>М3О-12Б-21 Щиголев Вадим</a>
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.header}>Ссылки</p>
          <div className={styles.links}>
            <a href='https://institutes.mai.ru/control/307/' target='__blank'>Кафедра 307</a>
          </div>
        </section>
      </div>
      <p>© 1997—2025 МАИ</p>
    </footer>
  )
}

export default Footer