import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import QuizAnswer from "../component/quiz/quizAnswer";
import token from "../component/token";

const QuizAnswerPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quizId = searchParams.get("quizId");

  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId) {
      console.error("🚨 quizId가 존재하지 않습니다.");
      setLoading(false);
      return;
    }

    const fetchQuizResult = async () => {
      try {
        console.log("📌 퀴즈 해설 데이터를 불러오는 중...");
        const response = await token.get(`/quiz/${quizId}/result`);
        console.log("✅ 응답 데이터:", response.data);
        setQuizResult(response.data);
      } catch (error) {
        console.error("🚨 퀴즈 해설 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResult();
  }, [quizId]);

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        {loading ? (
          <Message>📖 퀴즈 해설을 불러오는 중...</Message>
        ) : quizResult ? (
          <QuizAnswer quizResult={quizResult} />
        ) : (
          <Message>❌ 퀴즈 해설을 불러올 수 없습니다.</Message>
        )}
      </Content>
    </Container>
  );
};

export default QuizAnswerPage;

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
 