// src/pages/DiaryList.tsx
import React, { useEffect, useState } from 'react';
import { fetchDiaries } from '../api'; // Ensure the API function exists and is correctly imported
import './css/diaryList.css';

interface DiaryEntry {
  id: number;
  user_id: number;
  title: string;
  content: string;
  path: string;
  data: string;
}

const DiaryList: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const getDiaries = async () => {
      try {
        const response = await fetchDiaries();
        setDiaries(response.data);
      } catch (error) {
        console.error('Failed to fetch diaries:', error);
      }
    };
    getDiaries();
  }, []);

  return (
    <div className="diary-list-container">
      {diaries.map((diary) => (
        <div key={diary.id} className="diary-entry">
          <h2>{diary.title}</h2>
          <p>{diary.content}</p>
          <img src={`data:image/${diary.path.split(".")[-1]};base64, ${diary.data}`} alt="diary" />
        </div>
      ))}
    </div>
  );
}

export default DiaryList;
