'use client'
import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';
import styles from './page.module.css'

interface UserTypes {
  id: string,
  name: string,
  surname: string,
  email: string,
  department: string,
  courses: string

}

type OnChange = NonNullable<TableProps<UserTypes>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;


const data: UserTypes[] = [
  {
    id: '1',
    name: 'Даниил',
    surname: 'Лигай',
    email: 'daniilliguy@mai.education',
    department: '307',
    courses: 'Python basics, mathplotlib'
  },
  {
    id: '2',
    name: 'Иван',
    surname: 'Иванов',
    email: 'ivan@mai.education',
    department: '311',
    courses: ''
  },
  {
    id: '3',
    name: 'Сергей',
    surname: 'Петров',
    email: 'ser.pet@mai.education',
    department: '805',
    courses: 'mathplotlib'
  },
  {
    id: '4',
    name: 'Алексеей',
    surname: 'Сидиров',
    email: 'alexsidor@mai.education',
    department: '307',
    courses: 'Python basics, mathplotlib, pandas'
  },
  {
    id: '5',
    name: 'Артем',
    surname: 'Учин',
    email: 'uchkin@mai.education',
    department: '503',
    courses: 'pandas'
  },
];

function Statistics() {
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (_pagination, _filters, sorter) => {
    setSortedInfo(sorter as Sorts);
  };


  const columns: TableColumnsType<UserTypes> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>  ('' + a.name).localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
      sorter: (a, b) =>  ('' + a.surname).localeCompare(b.surname),
      sortOrder: sortedInfo.columnKey === 'surname' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Кафедра',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) =>  ('' + a.department).localeCompare(b.department),
      sortOrder: sortedInfo.columnKey === 'department' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Пройденные курсы',
      dataIndex: 'courses',
      key: 'courses',
      sorter: (a, b) =>  ('' + a.courses).localeCompare(b.courses),
      sortOrder: sortedInfo.columnKey === 'courses' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Система мониторинга</h1>
      <div className={styles.tableDiv}>
        <Table<UserTypes> columns={columns} dataSource={data} onChange={handleChange} />
      </div>
    </main>
  );
};

export default Statistics;