import React from "react";
import Plan from "./Plan";

interface LearningPlan {
    plan_id: number;
    week: number;
    plan_title: string;
    plan_description: string;
}

interface LearningPlanListProps {
    promptText: string; // 추가
    plans: LearningPlan[];
}

const LearningPlanList: React.FC<LearningPlanListProps> = ({ promptText, plans }) => {
  return (
    <div>
      <div>
        <p>{promptText}</p>
        {plans.map((plan) => (
          <Plan
            key={plan.plan_id}
            week={plan.week}
            planTitle={plan.plan_title}
            planDescription={plan.plan_description}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningPlanList;
