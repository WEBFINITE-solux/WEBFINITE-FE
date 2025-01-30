import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuizMulti from "../component/quiz/QuizMulti";
import QuizTF from "../component/quiz/QuizTF";
import QuizShort from "../component/quiz/QuizShort";
import token from "../component/token";

type QuizType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SUBJECTIVE";

interface Choice {
  choiceId: number;
  choiceLabel: string;
  choiceContent: string;
}

interface Question {
  questionId: number;
  questionContent: string;
  choices?: Choice[];
}

interface QuizData {
  quizId: number;
  quizTitle: string;
  courseName: string;
  quizType: QuizType;
  questions: Question[];
}

const QuizResolve: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quizId = searchParams.get("quizId");
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

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

        const formattedQuizData: QuizData = {
          quizId: response.data.quizId,
          quizTitle: response.data.quizTitle || "퀴즈 제목 없음",
          courseName: response.data.courseName || "강의명 없음",
          quizType: response.data.quizType as QuizType,
          questions: (response.data.questions || []).map((q: any) => ({
            questionId: q.questionId,
            questionContent: q.questionContent || "질문 내용 없음",
            choices:
              q.choices?.map((c: any, index: number) => ({
                choiceId: c.choiceId,
                choiceLabel: String.fromCharCode(65 + index),
                choiceContent: c.choiceContent || "선택지 없음",
              })) || [],
            answer: q.answer || null,
          })),
        };

        setQuizData(formattedQuizData);
      } catch (error) {
        console.error("🚨 퀴즈 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleResubmitQuiz = async () => {
    console.log("🔹 퀴즈 재제출 버튼 클릭됨"); 

    if (!quizData) {
      console.error("❌ 퀴즈 데이터를 불러올 수 없습니다.");
      alert("퀴즈 데이터를 불러올 수 없습니다.");
      return;
    }

    if (!window.confirm("퀴즈를 다시 제출하시겠습니까?")) return;

    try {
      const payload = {
        userId: 1,
        quizId: Number(quizData.quizId), 
        answers: quizData.questions.map((question) => ({
          questionId: Number(question.questionId),
          userAnswer: "",  
        })),
      };

      console.log("📌 요청 데이터:", JSON.stringify(payload, null, 2));

      const response = await token.patch("/quiz/submit", payload);
      console.log("✅ 퀴즈 재제출 성공:", response.data);
      navigate(`/quiz/answer?quizId=${quizData.quizId}`); 

      alert("퀴즈가 재제출되었습니다!");
    } catch (error: any) {
      console.error("🚨 퀴즈 재제출 실패:", error.response?.data || error);
      alert(`퀴즈 재제출에 실패했습니다: ${error.response?.data?.message || "오류 발생"}`);
    }
  };

  const renderQuizComponent = () => {
    if (!quizData) return <Message>퀴즈 데이터를 불러오는 중...</Message>;

    switch (quizData.quizType) {
      case "MULTIPLE_CHOICE":
        return <QuizMulti quizData={quizData} />;
      case "TRUE_FALSE":
        return <QuizTF quizData={quizData} />;
      case "SUBJECTIVE":
        return <QuizShort quizData={quizData} />;
      default:
        return <Message>지원하지 않는 퀴즈 유형입니다.</Message>;
    }
  };

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        {loading ? <Message>📖 퀴즈를 불러오는 중...</Message> : renderQuizComponent()}
        <ResubmitButton onClick={handleResubmitQuiz}>퀴즈 재제출</ResubmitButton>
      </Content>
    </Container>
  );
};

export default QuizResolve;

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

const ResubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background: #FF5733; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #C70039;
  }
`;

const Message = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
