import React from 'react';
import LearningPlanList from "../component/study/LearningPlanList";
import WeeklyTodoList from "../component/study/WeeklyTodoList";
import "./../styles/study.css"

const Study: React.FC = () => {

  return (
    <div className="study">
      <div className="left-panel">
        <LearningPlanList />
      </div>

      <div className="right-panel">
        <p
          className="ai"
          style={{
            paddingLeft: "15px",
            height: "60px",
            paddingTop: "15px",
          }}
        >
          달성률
        </p>
        <div className="progress-bar">
          <p style={{ marginLeft: "10px" }}>0%</p>
          <p>학습 중이에요 :)</p>
        </div>
        <WeeklyTodoList />
      </div>
    </div>
  );
};

export default Study;
