'use client'
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';
import styles from './page.module.css'

interface courseType {
  course_id: string;
  title: string;
  completed_at: string;
  persantage: string;
  days_since: string;
  time_spent: string;
}

interface tableTypes {
  user_id: string;
  name: string;
  surname: string;
  department: string;
  last_login: string;
  latest_test_score: string;
  latest_test_date: string;
  total_completed: string;
  courses: courseType[];
}

// Sample data for courses (nested table)
const coursesData: courseType[] = [
  {
    course_id: 'c1',
    title: 'Python basics',
    completed_at: '11.04.2025',
    persantage: '100 %',
    days_since: '5',
    time_spent: '4:30'
  },
  {
    course_id: 'c2',
    title: 'Matplotlib',
    completed_at: '16.04.2025',
    persantage: '95 %',
    days_since: '10',
    time_spent: '6:15'
  },
  {
    course_id: 'c3',
    title: 'Pandas',
    completed_at: '21.04.2025',
    persantage: '80 %',
    days_since: '15',
    time_spent: '3:30'
  }
];

// Sample data for main table
const usersData: tableTypes[] = [
  {
    user_id: 'u1',
    name: 'Даниил',
    surname: 'Лигай',
    department: '307',
    last_login: '23.04.2025',
    latest_test_score: '80 %',
    latest_test_date: '21.04.2025',
    total_completed: '3',
    courses: coursesData
  },
  {
    user_id: 'u2',
    name: 'Вадим',
    surname: 'Щиголев',
    department: '307',
    last_login: '23.04.2025',
    latest_test_score: '80 %',
    latest_test_date: '19.04.2025',
    total_completed: '2',
    courses: [coursesData[0], coursesData[1]]
  },
  {
    user_id: 'u3',
    name: 'Иван',
    surname: 'Иванов',
    department: '502',
    last_login: '23.04.2025',
    latest_test_score: '90 %',
    latest_test_date: '23.04.2025',
    total_completed: '1',
    courses: [coursesData[2]]
  }
];

// Columns for the expanded row (courses table)
const courseColumns: TableColumnsType<courseType> = [
  { title: 'Название курса', dataIndex: 'title', key: 'title' },
  { 
    title: 'Статус', 
    key: 'status', 
    render: () => <Badge status="success" text="Завершено" /> 
  },
  { title: 'Дата завершения', dataIndex: 'completed_at', key: 'completed_at' },
  { title: 'Процент выполнения', dataIndex: 'persantage', key: 'persantage' },
  { title: 'Дней с момента завершения', dataIndex: 'days_since', key: 'days_since' },
  { title: 'Затраченное время', dataIndex: 'time_spent', key: 'time_spent' }
];

// Columns for the main table (users table)
const userColumns: TableColumnsType<tableTypes> = [
  {
    title: 'ФИО',
    key: 'full_name',
    render: (_, record) => `${record.surname} ${record.name}`
  },
  { title: 'Кафедра', dataIndex: 'department', key: 'department' },
  { title: 'Последний вход', dataIndex: 'last_login', key: 'last_login' },
  { title: 'Оценка за последний тест', dataIndex: 'latest_test_score', key: 'latest_test_score' },
  { title: 'Дата последнего теста', dataIndex: 'latest_test_date', key: 'latest_test_date' },
  { title: 'Завершено курсов', dataIndex: 'total_completed', key: 'total_completed' }
];

// Expanded row render function for the nested table
const expandedRowRender = (record: tableTypes) => (
  <Table<courseType>
    columns={courseColumns}
    dataSource={record.courses}
    pagination={false}
    rowKey="course_id"
  />
);

const App: React.FC = () => (
  <main className={styles.main}>
    <Table<tableTypes>
      columns={userColumns}
      expandable={{ 
        expandedRowRender,
        defaultExpandedRowKeys: ['u1'] // Expand first row by default
      }}
      dataSource={usersData}
      rowKey="user_id"
      bordered
      size="middle"
    />
    <button className={styles.button}>Экспортировать таблицу</button>
  </main>
);

export default App;