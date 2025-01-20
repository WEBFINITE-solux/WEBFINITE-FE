import React from "react";

interface PlanProps {
  week: number;
  planTitle: string;
  planDescription: string;
}

const Plan: React.FC<PlanProps> = ({ week, planTitle, planDescription }) => {
  return (
    <div className="plan-item" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>
        Week, {week}
      </h2>
      <p>{planTitle}</p>
      <p>{planDescription}</p>
    </div>
  );
};

export default Plan;
