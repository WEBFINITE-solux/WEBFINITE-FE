import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoDataComponent from "../NoDataComponent";
import "./../../styles/study.css";
import { getCurrentSemester } from "../../util/getCurrentSemester";

interface LearningPlan {
  plan_id: number;
  week: number;
  plan_title: string;
  plan_description: string;
}

const LearningPlanList: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [courseId, setCourseId] = useState(); // courseId 값 설정
  const [studyPlan, setStudyPlan] = useState<{
    prompt_text: string;
    learning_plan: LearningPlan[];
  }>({
    prompt_text: "",
    learning_plan: [],
  });
  const [loading, setLoading] = useState(true);
  const [editedPlans, setEditedPlans] = useState<LearningPlan[]>([]);
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리
  const [isNull, setIsNull] = useState(false);

  // 학습 계획 불러오기
  useEffect(() => {
    const fetchStudyPlan = async () => {
      const { year, semester } = getCurrentSemester();
      const courseResponse = await fetch(
        `https://d291-58-29-179-25.ngrok-free.app/course/${userId}/${year}/${semester}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const courseData = await courseResponse.json();
      const courseId = courseData.courses[0] ? courseData.courses[0].id : null;
      if (courseId) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://d291-58-29-179-25.ngrok-free.app/plan/${courseId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
              },
            }
          );

          if (!response.ok) {
            setIsNull(true);
            throw new Error(`HTTP 오류 발생: ${response.status}`);
          }

          const data = await response.json();
          if (!data.learning_plan || data.learning_plan.length === 0) {
            setIsNull(true);
          } else {
            setIsNull(false);
            setStudyPlan(data);
            setEditedPlans(data.learning_plan);
            setCourseId(data.course_id);
          }
        } catch (error) {
          console.error("Error fetching study plan:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, []);

  // 입력값 변경 핸들러
  const handleInputChange = (
    id: number,
    field: keyof LearningPlan,
    value: string
  ) => {
    setEditedPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.plan_id === id ? { ...plan, [field]: value } : plan
      )
    );
  };

  // 저장 버튼 클릭 시 API 호출
  const handleSave = async () => {
    const updatedData = {
      prompt_text: studyPlan.prompt_text,
      learning_plan: editedPlans,
    };

    try {
      const response = await fetch(
        `https://d291-58-29-179-25.ngrok-free.app/plan/${courseId}/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류 발생: ${response.status}`);
      }

      console.log("학습 계획이 성공적으로 저장되었습니다!");
      setStudyPlan(updatedData); // 저장된 데이터로 상태 업데이트
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("Error saving study plan:", error);
      alert("저장하는 중 오류가 발생했습니다.");
    }
  };
  const navigate = useNavigate();
  const handlePlanButtonClick = () => {
    navigate("/study/aiPlan");
  };
  return (
    <>
      <div>
        <div className="top-group">
          <h1 className="ai">Ai 학습계획</h1>
          <div className="button-group">
            <button className="study-button" onClick={handlePlanButtonClick}>
              계획 짜기
            </button>
            <button
              className="study-button"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? "저장하기" : "수정하기"}
            </button>
          </div>
        </div>
        <div className="result-section">
          {isNull ? (
            <NoDataComponent />
          ) : (
              <div style={{ padding: "30px" }}>
                {studyPlan.prompt_text ?
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
                        fontSize: "15px",
                        color: "rgba(0, 0, 0, 0.80)",
                        fontFamily: "pretendardM",
                      }}
                    >
                      {studyPlan.prompt_text}
                    </p>
                  </div> :<div></div>}

              {loading ? (
                <p>로딩 중...</p>
              ) : (
                editedPlans.map((plan) => (
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
                          fontFamily: "pretendardB",
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
                              handleInputChange(
                                plan.plan_id,
                                "plan_title",
                                e.target.value
                              )
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
                              handleInputChange(
                                plan.plan_id,
                                "plan_description",
                                e.target.value
                              )
                            }
                            style={{
                              width: "100%",
                              color: "#5F5F5F",
                              border: "0px",
                              backgroundColor: "transparent",
                              outline: "#2D41FF",
                              borderRadius: "10px",
                              resize: "none",
                              fontSize: "15px",
                              lineHeight: "1.5",
                              minHeight: "80px",
                              overflow: "hidden",
                            }}
                            rows={1}
                          />
                        </>
                      ) : (
                        <>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              fontFamily: "pretendardB",
                            }}
                          >
                            {plan.plan_title}
                          </p>
                          <p
                            style={{
                              color: "#5F5F5F",
                              marginTop: "10px",
                              fontFamily: "pretendardR",
                            }}
                          >
                            {plan.plan_description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LearningPlanList;
