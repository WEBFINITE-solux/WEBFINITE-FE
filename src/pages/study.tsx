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
        
        <WeeklyTodoList />
      </div>
    </div>
  );
};

export default Study;
