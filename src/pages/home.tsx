import React, { useState, useEffect } from 'react';
import './../styles/home.css';
import ToDoList from '../component/study/toDoList';
import AttendanceGrid from '../component/home/AttendanceGrid';

const Home: React.FC = () => {
  const openChatGPT = () => {
    window.open('https://chatgpt.com/');
  };
  const name = "Webfinite";
  const date = Date();
  const formattedDate = date.toString().split(' ').slice(1, 3).join(' ');


  // 초기 데이터
  const initialTasks = [
    { id: 1, task: "React 공부하기", time: "10:00", checked: false },
    { id: 2, task: "JavaScript 복습", time: "1:00", checked: false },
    { id: 3, task: "CSS 디자인 수정", time: "3:00", checked: false },
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

  // 상태 관리
  const [tasks, setTasks] = useState(initialTasks);

  // 로컬 저장소에서 데이터 로드
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // 상태 변경 시 로컬 저장소에 저장
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 체크박스 상태 업데이트
  const handleCheck = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <div className="home">
      <div className="left">
        <div className="home-title">
          <p className="titletext">Hello, {name}.</p>
        </div>

        <div style={{ height: '31.4vh' }}>
          <div style={{ float: 'left' }}>
            <p className="text" style={{ marginTop: '4vh' }}>오늘의 할 일</p>
            <div className="table" style={{ width: '34.3vw' }}>
              <p>{formattedDate}</p>
              {tasks.map(task => (
                <ToDoList
                  key={task.id}
                  task={task}
                  onCheck={() => handleCheck(task.id)}
                />
              ))}
            </div>
          </div>
          <div style={{ float: 'left', marginLeft: '2vh' }}>
            <p className="text" style={{ marginTop: '4vh' }}>학습 달성률</p>
            <div className="table" style={{ width: '19vw' }}>
            <AttendanceGrid data={data.attend} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ marginTop: '3vh' }}>
            <p className="text">학습 계획</p>
          </div>
          <div className="table" style={{ width: '55vw' }}></div>
        </div>

        <button onClick={openChatGPT} className="gpt">
          <img src="/GotoChatGPT.png" alt="Go To ChatGPT" width="8.5vw" height="3vh" style={{ float: 'right' }} />
        </button>
      </div>

      <div className="right">
        <div style={{ height: '5vh' }}></div>
        <div className="personal"></div>
      </div>
    </div>
  );
};

export default Home;
