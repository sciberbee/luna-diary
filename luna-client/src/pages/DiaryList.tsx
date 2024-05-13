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
  sentiment: string;
  // confidence: { negative: 0.07278658, positive: 0.072461605, neutral: 99.85475 }
  confidence: { negative: number, positive: number, neutral: number };
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
            <img src={`data:image/${diary.path.split(".")[-1]};base64, ${diary.data}`} alt="diary" />
            <p>{diary.content}</p>
            <h3>Sentiment: {diary.sentiment || 'Analyzing...'}</h3>
            <h4>Confidence: 
                {(diary.sentiment === 'positive') ? diary.confidence.positive :
                (diary.sentiment === 'negative') ? diary.confidence.negative :
                diary.confidence.neutral}
            </h4>
        </div>
      ))}
    </div>
  );
}

export default DiaryList;
