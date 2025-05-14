'use client'
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import AddModule from '@/components/adminModals/AddModule';
import { AddCourse } from '@/components/adminModals/AddCourse';
import AddLesson from '@/components/adminModals/AddLesson';
import styles from './page.module.css'



interface ExcelData {
  [key: string]: string | number | boolean | Date | null;
}

const ExcelReader: React.FC = () => {
  const [data, setData] = useState<ExcelData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = e.target?.result;
        if (!data || typeof data !== 'string') return;

        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json<ExcelData>(worksheet);

        if (jsonData.length > 0) {
          setData(jsonData);
          setHeaders(Object.keys(jsonData[0]));
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please check the file format.');
      }
    };

    reader.readAsBinaryString(file);
  };

  console.log(data, headers)

  return (
    <main className={styles.main}>
        <h1>Админ панель</h1>
        <section className={styles.addNew}>
          <p className={styles.sectionName}>Создать новое</p>
          <AddCourse />
          <AddModule />
          <AddLesson />
          <label htmlFor="file-file_input" className={styles.label}>
            <input
              type="file"
              className={styles.input}
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
            />
            <span className={styles.choose}>Добавить пользователей</span>
          </label>
        </section>
    </main>
  );
};

export default ExcelReader;