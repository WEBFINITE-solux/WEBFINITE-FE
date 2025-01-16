import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./../styles/study.css"

const Study: React.FC = () => {
    const [progress, setProgress] = useState("0");
    const navigate = useNavigate(); // useNavigate 훅 초기화

    const handlePlanButtonClick = () => {
        navigate("/study/aiPlan"); // "aiPlan" 페이지로 이동
    };
    return (
        <div className="study">
            <div className="left-panel">
                <div className='top-group'>
                    <h1 className="ai">AI 학습계획</h1>
                    <div className="button-group">
                        <button className="study-button">수정하기</button>
                        <button className="study-button" onClick={handlePlanButtonClick}>계획 짜기</button>
                    </div>
                </div>
                <div className="result-section">
                </div>
            </div>

            <div className="right-panel">
                <h2>달성률</h2>
                <div className="progress-bar">
                    <p>{progress}%</p>
                    <p>학습 중이에요 :)</p>
                </div>
                <div className='top-group'>
                    <h2>투두 리스트</h2>
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

