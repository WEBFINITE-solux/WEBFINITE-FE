import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import QuizMulti from "../component/quiz/QuizMulti";
import QuizTF from "../component/quiz/QuizTF";
import QuizShort from "../component/quiz/QuizShort";
import token from "../component/token";

type QuizType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SUBJECTIVE";

interface Choice {
  choiceId: number;
  choiceContent: string;
}

interface Question {
  questionId: number;
  questionContent: string;
  choices: Choice[];
  answer?: string;
}

interface QuizData {
  quizId: number;
  quizTitle: string;
  courseName: string;
  quizType: QuizType;
  questions: Question[];
}

const QuizSolve: React.FC = () => {
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const quizId = searchParams.get("quizId");

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("📌 현재 location 객체:", location);
  console.log("📌 추출된 quizId:", quizId);

  useEffect(() => {
    if (!quizId) {
      console.error("🚨 quizId가 존재하지 않습니다.");
      setLoading(false);
      return;
    }

    const fetchQuizData = async () => {
      try {
        const response = await token.get(`/quiz/${quizId}`);
        console.log("✅ 응답 데이터:", response.data);
        setQuizData(response.data);
      } catch (error) {
        console.error("🚨 퀴즈 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const sanitizedQuizData: QuizData | null = quizData
    ? {
        quizId: quizData.quizId,
        quizTitle: quizData.quizTitle || "퀴즈 제목 없음",
        courseName: quizData.courseName || "강의명 없음",
        quizType: quizData.quizType || "MULTIPLE_CHOICE",
        questions: (quizData.questions || []).map((q) => ({
          questionId: q.questionId,
          questionContent: q.questionContent || "질문 내용 없음",
          choices: q.choices?.map((c) => ({
            choiceId: c.choiceId,
            choiceContent: c.choiceContent || "선택지 없음",
          })) || [],
          answer: q.answer || "",
        })),
      }
    : null;

  const renderQuizComponent = () => {
    if (!sanitizedQuizData) return <Message>퀴즈 데이터를 불러오는 중...</Message>;

    switch (sanitizedQuizData.quizType) {
      case "MULTIPLE_CHOICE":
        return <QuizMulti quizData={sanitizedQuizData} />;
      case "TRUE_FALSE":
        return <QuizTF quizData={sanitizedQuizData} />;
      case "SUBJECTIVE":
        return <QuizShort quizData={sanitizedQuizData} />;
      default:
        return <Message>지원하지 않는 퀴즈 유형입니다.</Message>;
    }
  };

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        {loading ? <Message>📖 퀴즈를 불러오는 중...</Message> : renderQuizComponent()}
      </Content>
    </Container>
  );
};

export default QuizSolve;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;

const QuizBack = styled.img`
  width: 1704px;
  height: 1079px;
  flex-shrink: 0;
  z-index: 1;
`;

const Content = styled.div`
  z-index: 10;
  position: absolute;
  top: 75px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1550px;
`;

const Message = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
