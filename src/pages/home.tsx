import React, { useState, useEffect } from 'react';
import './../styles/home.css';
import StudyPlanHome from '../component/home/StudyPlanHome';
import WeeklyTodoList from "../component/study/WeeklyTodoList";
import LearningProgress from '../component/home/LearningProgress';

const Home: React.FC = () => {
  const openChatGPT = () => {
    window.open('https://chatgpt.com/');
  };
  const name = "Webfinite";
  const oneLiner = "오늘도 힘차게!";
  
  const toDoList = [
    {
      todo_id: 1,
      todo_content: "입문 강의 수강",
      is_completed: false,
      start_date: "2025-01-17T00:00:00",
      end_date: "2025-01-17T23:59:59",
      user_id: 1,
    },
    {
      todo_id: 2,
      todo_content: "다양한 행렬 크기의 문제 해결",
      is_completed: true,
      start_date: "2025-01-17T12:00:00",
      end_date: "2025-01-17T13:00:00",
      user_id: 1,
    },
    {
      todo_id: 3,
      todo_content: "test1",
      is_completed: true,
      start_date: "2025-01-17T12:00:00",
      end_date: "2025-01-17T13:00:00",
      user_id: 1,
    }
  ];


  const data = {
    message: "success",
    code: 200,
    attend: [
      {
        user_id: 1,
        attend_id: 1,
        attend_date: "2025-01-02T08:00:00Z", // ISO 형식
        is_attended: true,
        attend_date_cnt: 5,
      },
      {
        user_id: 1,
        attend_id: 2,
        attend_date: "2025-01-05T10:00:00Z",
        is_attended: true,
        attend_date_cnt: 6,
      },
      // 추가 데이터...
    ],
  };
  const studyPlan = {
    "prompt_text": "<선형대수> 과목의 학습계획을 세우고 싶어. 1. 학습기간은 11월 14일부터 12월 9일이야. 2. 학습범위는 1.4 행렬연산, 1/5 행렬대수, 1.6 전치행렬과 역행렬, 1.7 해의 유형 으로 총 4단원이야. 3. 단원을 섞지 말고 순서대로 계획을 세워줘.",
    "learning_plan": [
      {
        "plan_id": 1,
        "week": 1,
        "plan_title": "4.1 Introduction and 4.2 Design Issues",
        "plan_description": "데이터 링크 계층의 기본 개념과 설계 문제를 이해합니다. 이 주차에서는 데이터 링크 계층의 책임과 주요 설계 요소를 다루며, 네트워크 계층에 제공되는 서비스에 대해 학습합니다."
      },
      {
        "plan_id": 2,
        "week": 2,
        "plan_title": "4.3 Line Discipline and 4.4 Framing",
        "plan_description": "라인 디스플린의 중요성과 데이터 패킷을 프레임으로 나누는 방법을 탐구합니다. 데이터의 전송 방법과 프레이밍 기법에 대해 자세히 학습합니다."
      },
      {
        "plan_id": 3,
        "week": 3,
        "plan_title": "4.5 Flow Control and 4.6 Error Control",
        "plan_description": "흐름 제어와 오류 제어의 원리를 이해하고 다양한 프로토콜을 학습합니다. Stop-and-Wait 및 Sliding Window 기법을 포함하여 오류 탐지 및 수정을 위한 방법도 다룹니다."
      },
      {
        "plan_id": 4,
        "week": 4,
        "plan_title": "4.7 MAC Protocol (IEEE 802.x)",
        "plan_description": "매체 접근 제어(MAC) 프로토콜의 구조와 IEEE 802.x 표준에 대해 학습합니다. 다중 접속 프로토콜과 충돌 방지 및 회복 전략을 이해합니다."
      }
    ]
  };
  const learningProgress = {
    message: "success",
    code: 200,
    rate: [
      {
        user_id: 1,
        attend_id: 1,
        login_id: 1,
        login_time: "2025-01-02T13:54:22",
        logout_time: "2025-01-02T15:01:33",
      },
      {
        user_id: 1,
        attend_id: 2,
        login_id: 1,
        login_time: "2025-01-05T11:15:52",
        logout_time: "2025-01-05T12:30:12",
      },
    ],
  };
  return (
    <div className="home">
      <div className="left">
        <div className="home-title">
          <p className="titletext">Hello, {name}.</p>
        </div>

        <div style={{display: "flex", gap: "20px"}}>
          <div>
            <p className="text" style={{  }}>오늘의 할 일</p>
            <div className="table" style={{ height: "200px", width: '650px', overflowY:"auto"}}>
              <WeeklyTodoList todos={toDoList} />
            </div>
          </div>
          <div>
            <p className="text">학습 달성률</p>
            <div className="table" style={{ height: "200px", width: '230px',}}>
            <LearningProgress data={learningProgress} />
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text">학습 계획</p>
          </div>
          <div className="table" style={{ width: '900px', height: "220px" , overflowY:"auto"}}>
            <StudyPlanHome studyPlan={studyPlan} />
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
          <button onClick={openChatGPT} className="gpt">
            <img src="/GotoChatGPT.png" alt="Go To ChatGPT" style={{ width: "100px"}} />
          </button>
        </div>
      </div>

      <div className="right">
        <div className="table" style={{height:"650px", padding:"15px", fontWeight:"bold"}}>
          <div style={{display:"flex", justifyContent: "space-between"}}>
            <p>마이페이지</p>
          </div>
          <div style={{textAlign: "center"}}>
            <img src="/profile.png"></img>
            <p>{name}</p>
            <p style={{fontWeight: "normal"}}>{oneLiner}</p>
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
