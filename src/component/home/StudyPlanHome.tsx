import React from "react";

interface StudyPlan {
  prompt_text: string;
  learning_plan: {
    plan_id: number;
    week: number;
    plan_title: string;
    plan_description: string;
  }[];
}

const StudyPlanHome: React.FC<{ studyPlan: StudyPlan }> = ({ studyPlan }) => {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* 왼쪽 Prompt Text */}
      <div
        style={{
          padding: "20px",
          borderRadius: "25px",
          background: "rgba(200, 205, 249, 0.14)",
          boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.25)",
          width: "280px",
          height: "max-content"
        }}
      >
        <p style={{ fontSize: "14px", color: "#374151" }}>{studyPlan.prompt_text}</p>
      </div>
      <div style={{border: "1px solid #2D41FF", height: ""}}></div>

      {/* 오른쪽 Learning Plan */}
      <div>
        {studyPlan.learning_plan.map((plan) => (
          <div
            key={plan.plan_id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              marginBottom: "15px",
              width: "520px"
            }}
          >
            {/* Week Number */}
            <div
              style={{
                width: "60px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                fontWeight: "bold",
                boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.25)"
              }}
            >
              {plan.week}주차
            </div>

            {/* Plan Details */}
            <div style={{ marginLeft: "20px", flex: 1 }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                [{plan.plan_title}]
              </p>
              <p style={{ margin: 0, fontSize: "12px",}}>{plan.plan_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlanHome;
