import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface QuizData {
  quizId: number;
  quizTitle: string;
  quizState: "COMPLETED" | "IN_PROGRESS";
  correctRate: string | null;
}

interface QuizComponentProps {
  quizzes: QuizData[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quizzes }) => {
  const navigate = useNavigate();

  const handleSolveQuiz = (quizId: number) => {
    console.log("퀴즈 풀기:", quizId);
    navigate(`/quiz/solve?quizId=${quizId}`);
  };

  const handleViewAiExplanation = (quizId: number) => {
    console.log("AI 해설 보기:", quizId);
    navigate(`/quiz/answer?quizId=${quizId}`);
  };

  return (
    <Container>
      <QuizList>
        {quizzes.length === 0 ? (
          <Message>퀴즈가 없습니다.</Message>
        ) : (
          quizzes.map((quiz) => (
            <QuizCard key={quiz.quizId}>
              <Title>{quiz.quizTitle}</Title>
              <Progress>{quiz.correctRate ? quiz.correctRate : "?/5"}</Progress>
              <Actions>
                {quiz.quizState === "COMPLETED" ? (
                  <>
                    <ActionIcon onClick={() => handleSolveQuiz(quiz.quizId)}>
                      <AgainLogo src="/again.svg" />
                    </ActionIcon>
                    <ActionButton onClick={() => handleViewAiExplanation(quiz.quizId)}>
                      AI 해설보기
                    </ActionButton>
                  </>
                ) : (
                  <SolveButton onClick={() => handleSolveQuiz(quiz.quizId)}>
                    퀴즈 풀기
                  </SolveButton>
                )}
              </Actions>
            </QuizCard>
          ))
        )}
      </QuizList>
    </Container>
  );
};

export default QuizComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: none;
`;

const QuizList = styled.div`
  width: 1520px;
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
`;

const QuizCard = styled.div`
  flex: 0 0 300px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Progress = styled.div`
  font-size: 14px;
  color: #555;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const SolveButton = styled.button`
  width: 74px;
  height: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  margin-left: 180px;

  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

const ActionButton = styled.button`
  width: 74px;
  height: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  margin-left: 150px;
  margin-top: 13px;

  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

const AgainLogo = styled.img`
  width: 16.947px;
  height: 14px;
  flex-shrink: 0;
`;

const ActionIcon = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
  margin-top: 10px;

  &:hover {
    color: #007bff;
  }
`;

const Message = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #777;
  margin-top: 20px;
`;
