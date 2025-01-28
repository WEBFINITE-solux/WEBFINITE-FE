import React, { useState, useEffect } from 'react';
import './../styles/home.css';
import StudyPlanHome from '../component/home/StudyPlanHome';
import WeeklyTodoList from '../component/study/WeeklyTodoList';
import LearningProgress from '../component/home/LearningProgress';
import axios from 'axios';

interface StudyPlan {
  prompt_text: string;
  learning_plan: {
    plan_id: number;
    week: number;
    plan_title: string;
    plan_description: string;
  }[];
}

const Home: React.FC = () => {
  const openChatGPT = () => {
    window.open('https://chatgpt.com/');
  };

  const name = 'Webfinite';
  const oneLiner = '오늘도 힘차게!';
  const toDoList = [
    {
      todo_id: 1,
      todo_content: '입문 강의 수강',
      is_completed: false,
      start_date: '2025-01-17T00:00:00',
      end_date: '2025-01-17T23:59:59',
      user_id: 1,
    },
    {
      todo_id: 2,
      todo_content: '다양한 행렬 크기의 문제 해결',
      is_completed: true,
      start_date: '2025-01-17T12:00:00',
      end_date: '2025-01-17T13:00:00',
      user_id: 1,
    },
  ];

  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get<StudyPlan>('/plan/1'); // API 호출
        setStudyPlan(response.data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error('Error fetching study plan:', e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const learningProgress = {
    message: 'success',
    code: 200,
    rate: [
      {
        user_id: 1,
        attend_id: 1,
        login_id: 1,
        login_time: '2025-01-02T13:54:22',
        logout_time: '2025-01-02T15:01:33',
      },
    ],
  };

  return (
    <div className="home">
      <div className="left">
        <div className="home-title">
          <p className="titletext">Hello, {name}.</p>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <p className="text">오늘의 할 일</p>
            <div
              className="table"
              style={{ height: '200px', width: '650px', overflowY: 'auto' }}
            >
              <WeeklyTodoList todos={toDoList} />
            </div>
          </div>
          <div>
            <p className="text">학습 달성률</p>
            <div className="table" style={{ height: '200px', width: '230px' }}>
              <LearningProgress data={learningProgress} />
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text">학습 계획</p>
          </div>
          <div
            className="table"
            style={{ width: '900px', height: '220px', overflowY: 'auto' }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <StudyPlanHome
                studyPlan={studyPlan || { prompt_text: '', learning_plan: [] }}
              />
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button onClick={openChatGPT} className="gpt">
            <img
              src="/GotoChatGPT.png"
              alt="Go To ChatGPT"
              style={{ width: '100px' }}
            />
          </button>
        </div>
      </div>

      <div className="right">
        <div
          className="table"
          style={{ height: '650px', padding: '15px', fontWeight: 'bold' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>마이페이지</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="/profile.png" alt="Profile" />
            <p>{name}</p>
            <p style={{ fontWeight: 'normal' }}>{oneLiner}</p>
          </div>
          <div>
            <p>시간표</p>
            <div></div>
            <p>퀴즈</p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
