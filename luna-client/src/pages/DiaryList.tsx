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
    'SPARCS 동방에서 개발에 열중하는 것은 어떨까요?',
    '친구들과 함께 맛있는 음식을 먹으러 가보세요!',
    '이참에 조별과제를 혼자 끝내보는 것은 어떨까요?',
    '학교 축제에서 이 기분을 발산해봐요!'
  ];

  const negativeActivities = [
    '친한 친구에게 고민을 털어놓는 것은 어떨까요?',
    '어은동산으로 잠시 산책을 나가보시는 것은 어떨까요?',
    '영화관에서 좋아하는 영화를 보러 가보세요.',
    '생각나는 사람에게 전화 한 통은 어떠신가요?'
  ];

  const neutralActivities = [
    '학교 도서관에서 평소 읽고 싶었던 책을 읽어보세요.',
    '학교 주변에 있는 카페에서 커피 한 잔을 즐겨보세요.',
    '새로운 취미를 찾아보세요.',
    '시험기간의 계획을 짜 보는 것은 어떤가요?'
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
