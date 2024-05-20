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

  const positiveActivities = [
    'Join a campus club or organization',
    'Attend a college event or party',
    'Take a nature walk around campus',
    'Participate in a group study session',
    'Volunteer for a campus event'
  ];

  const negativeActivities = [
    'Talk to a campus counselor',
    'Take a relaxing walk or meditate',
    'Write in a personal journal',
    'Watch a favorite movie or show',
    'Call a friend or family member'
  ];

  const neutralActivities = [
    'Visit the campus library',
    'Explore a new area of the campus',
    'Try a new hobby or activity',
    'Attend a lecture or workshop',
    'Plan your week or organize your notes'
  ];

  const getRandomActivity = (sentiment: string) => {
    let activities: string[] = [];
    if (sentiment === 'positive') {
      activities = positiveActivities;
    } else if (sentiment === 'negative') {
      activities = negativeActivities;
    } else {
      activities = neutralActivities;
    }
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
  };

  return (
    <div className="diary-list-container">
      <header className="diary-list-header">
        <h1>Diaries</h1>
      </header>
      {diaries.map((diary) => (
        <div key={diary.id} className="diary-entry">
          <h2>{diary.title}</h2>
          <img src={`data:image/${diary.path.split(".").pop()};base64, ${diary.data}`} alt="diary" />
          <p>{diary.content}</p>
          <h3>Sentiment: {diary.sentiment || 'Analyzing...'}</h3>
          <h4>Confidence: 
            {(diary.sentiment === 'positive') ? diary.confidence.positive :
            (diary.sentiment === 'negative') ? diary.confidence.negative :
            diary.confidence.neutral}
          </h4>
          <h4>
            {(diary.sentiment === 'positive') ? '😊' :
            (diary.sentiment === 'negative') ? '😢' :
            '😐'}
          </h4>
          <h4>Recommended Activity: {getRandomActivity(diary.sentiment)}</h4>
        </div>
      ))}
    </div>
  );
}

export default DiaryList;
