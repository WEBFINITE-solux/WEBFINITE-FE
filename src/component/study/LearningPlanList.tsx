import React, { useState } from "react";
import Plan from "./Plan";

interface LearningPlan {
  plan_id: number;
  week: number;
  plan_title: string;
  plan_description: string;
}

interface LearningPlanListProps {
  promptText: string;
  plans: LearningPlan[];
  isEditing: boolean; // 수정 상태
}

const LearningPlanList: React.FC<LearningPlanListProps> = ({
  promptText,
  plans,
  isEditing,
}) => {
  const [editedPlans, setEditedPlans] = useState(plans); // 수정 가능한 계획 상태

  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedPlans = editedPlans.map((plan) =>
      plan.plan_id === id ? { ...plan, [field]: value } : plan
    );
    setEditedPlans(updatedPlans); // 수정된 계획 업데이트
  };

  return (
    <div>
      <div style={{ padding: "30px" }}>
        <div
          style={{
            borderRadius: "10px",
            background: "#FFF",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.25)",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              padding: "10px",
              fontSize: "13px",
              color: "rgba(0, 0, 0, 0.80)",
            }}
          >
            {promptText}
          </p>
        </div>

        {editedPlans.map((plan) => (
          <div key={plan.plan_id} style={{ marginBottom: "17px" }}>
            <div
              style={{
                borderRadius: "15px",
                background: "var(--c-9-ceff-2, #C9CEFF)",
                width: "80px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                Week {plan.week}
              </p>
            </div>
            <div
              style={{
                marginTop: "7px",
                borderRadius: "10px",
                background: "var(--f-5-f-6-fb, #F5F6FB)",
                padding: "15px",
              }}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={plan.plan_title}
                    onChange={(e) =>
                      handleInputChange(plan.plan_id, "plan_title", e.target.value)
                    }
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      width: "100%",
                      marginBottom: "10px",
                      border: "0px",
                      backgroundColor: "transparent",
                      outline: "#2D41FF",
                      borderRadius: "10px",
                    }}
                  />
                  <textarea
                    value={plan.plan_description}
                    onChange={(e) =>
                      handleInputChange(plan.plan_id, "plan_description", e.target.value)
                    }
                    style={{
                      width: "100%",
                      color: "#5F5F5F",
                      border: "0px",
                      backgroundColor: "transparent",
                      outline: "#2D41FF",
                      borderRadius: "10px",
                      resize: "none", // 크기 조절 비활성화
                      fontSize: "15px",
                      lineHeight: "1.5",
                      minHeight: "80px", // 기본 높이 설정
                      overflow: "hidden", // 내용에 맞게 동적 높이 조절
                    }}
                    rows={1} // 최소 높이
                  />
                </>
              ) : (
                <>
                  <p style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {plan.plan_title}
                  </p>
                  <p style={{ color: "#5F5F5F", marginTop: "10px" }}>
                    {plan.plan_description}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPlanList;
