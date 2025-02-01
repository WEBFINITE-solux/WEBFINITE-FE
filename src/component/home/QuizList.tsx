import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentSemester } from "../../util/getCurrentSemester";

interface Quiz {
  quizId: number;
  quizTitle: string;
}
const QuizList: React.FC<{ userId: number }> = ({ userId }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();
  const quizSolve = () => {
    navigate("/quiz");
  };
  const quizCreate = () => {
    navigate("/quiz/create");
  };
  useEffect(() => {
    const fetchQuizzes = async () => {
      const { year, semester } = getCurrentSemester();
      try {
        const coursesResponse = await fetch(
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

        const coursesData = await coursesResponse.json();

        let allQuizzes: Quiz[] = [];

        for (const course of coursesData.courses) {
          const quizResponse = await fetch(
            `https://d291-58-29-179-25.ngrok-free.app/quiz/${userId}/course/${course.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
              },
            }
          );

          const quizData = await quizResponse.json();

          allQuizzes = [
            ...allQuizzes,
            ...quizData.map((q: any) => {
              return {
                quizId: q.quizId || `unknown-${Math.random()}`,
                quizTitle: q.quizTitle,
              };
            }),
          ];
        }

        setQuizzes(allQuizzes);
      } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchQuizzes();
  }, [userId]);

  return (
    <div>
      {quizzes.map((quiz, index) => (
        <>
          <div key={quiz.quizId || index} className="quiz-item">
            <span className="quiz-title">{quiz.quizTitle}</span>
            <button className="quiz-button" onClick={quizSolve}>
              퀴즈 풀기
            </button>
          </div>
          <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
            <div style={{ borderBottom: "1px solid #B3B3B3" }}></div>
          </div>
        </>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="b" onClick={quizCreate}>
          새로운 퀴즈 생성
        </button>
      </div>

      <style>{`
        .quiz-container {
          padding: 16px;
          background-color: #F5F6FB;
          border-radius: 25px;
        }

        .quiz-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .quiz-title {
          font-size: 13px;
          width: 240px;
        }

        .quiz-button {
          padding: 3px 8px;
          border: 1px solid black;
          border-radius: 50px;
          cursor: pointer;
          font-size: 13px;
          background-color: transparent;
        }
        .b{
          border-radius: 22px;
          background: #D0D4FF;
          font-weight: bold;
          margin: 5px;
          width: 320px
        }

      `}</style>
    </div>
  );
};

export default QuizList;
