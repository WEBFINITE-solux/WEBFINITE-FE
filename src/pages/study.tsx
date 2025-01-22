import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import LearningPlanList from "../component/study/LearningPlanList";
import "./../styles/study.css"

const Study: React.FC = () => {
    const [progress, setProgress] = useState("0");
    const navigate = useNavigate(); // useNavigate 훅 초기화

    const handlePlanButtonClick = () => {
        navigate("/study/aiPlan"); // "aiPlan" 페이지로 이동
    };
    const [isEditing, setIsEditing] = useState(false); // 수정 상태 추가
    const handleEditButtonClick = () => {
        setIsEditing(!isEditing); // 수정 모드 토글
      };
    const data = {
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
    return (
        <div className="study">
            <div className="left-panel">
                <div className='top-group'>
                    <h1 className="ai">Ai 학습계획</h1>
                    <div className="button-group">
                    <button className="study-button" onClick={handleEditButtonClick}>
                        {isEditing ? "저장하기" : "수정하기"}
                    </button>
                        <button className="study-button" onClick={handlePlanButtonClick}>계획 짜기</button>
                    </div>
                </div>
                <div className="result-section">
                    <LearningPlanList promptText= {data.prompt_text} plans={data.learning_plan} isEditing={isEditing}/>
                </div>
            </div>

            <div className="right-panel">
                <p className="ai" style={{paddingLeft: "15px", height: "60px", paddingTop: "15px"}}>달성률</p>
                <div className="progress-bar">
                    <p style={{marginLeft: "10px"}}>{progress}%</p>
                    <p>학습 중이에요 :)</p>
                </div>
                <div className='top-group'>
                    <p className="ai">투두 리스트</p>
                    <div className="button-group">
                        <button className="study-button">수정하기</button>
                        <button className="study-button">추가하기</button>
                    </div>
                </div>
                <div className="todo-section">
                    
                    <div className="todo-list">
                        <h3>September 27</h3>
                        <ul>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <li key={i} className="todo-item">
                            <input type="checkbox" />
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Study;

