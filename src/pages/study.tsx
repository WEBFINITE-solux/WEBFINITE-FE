import React from 'react';
import "./../styles/study.css"

const Study: React.FC = () => {
    return (
        <div className="study">
            <div className="left-panel">
                <div className='top-group'>
                    <h1 className="ai">AI 학습계획</h1>
                    <div className="button-group">
                        <button className="study-button">수정하기</button>
                        <button className="study-button">계획 짜기</button>
                    </div>
                </div>
                <div className="plan-section">
                    <div className="plan-content">
                        <div className="no-content">
                        <p>아직 등록된 내용이 없습니다.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <h2>달성률</h2>
                <div className="progress-bar">
                    <span>0%</span>
                    <p>학습 중이에요 :)</p>
                </div>

                <div className="todo-section">
                    <div className='top-group'>
                        <h2>투두 리스트</h2>
                        <div className="button-group">
                            <button className="study-button">수정하기</button>
                            <button className="study-button">추가하기</button>
                        </div>
                    </div>
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

