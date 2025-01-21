import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface QuizData {
  quiz_id: number;
  quiz_title: string;
  quiz_status: "COMPLETED" | "IN_PROGRESS";
  correct_rate: string | null;
}

interface QuizComponentProps {
  quizzes: QuizData[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const handleRefresh = (quizId: number) => {
    alert(`퀴즈 ${quizId} 다시풀기!`);
  };

  const handleSolveQuiz = (quizId: number) => {
    navigate("/quiz/solve");
  };

  const handleViewAiExplanation = (quizId: number) => {
    navigate("/quiz/answer");
  };

  return (
    <Container>
      <Header>수업 1</Header>
      <QuizList>
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.quiz_id}>
            <Title>{quiz.quiz_title}</Title>
            <Progress>
              {quiz.correct_rate ? quiz.correct_rate : "?/5"}
            </Progress>
            <Actions>
              {quiz.quiz_status === "COMPLETED" ? (
                <>
                  <ActionIcon onClick={() => handleRefresh(quiz.quiz_id)}>
                    <AgainLogo src="/again.svg"/>
                  </ActionIcon>
                  <ActionButton onClick={() => handleViewAiExplanation(quiz.quiz_id)}>
                    AI 해설보기
                  </ActionButton>
                </>
              ) : (
                <SolveButton onClick={() => handleSolveQuiz(quiz.quiz_id)}>
                  퀴즈 풀기
                </SolveButton>
              )}
            </Actions>
          </QuizCard>
        ))}
      </QuizList>
    </Container>
  );
};

export default QuizComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background : none;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #d48b8b;
  padding: 10px;
  background-color: #f7e4e4;
  border-radius: 5px;
`;

const QuizList = styled.div`
  width : 1520px;
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
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
  border: none;
  border-radius: 5px;
  padding: 2px 2px;
  cursor: pointer;
  color: #1A1A1A;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-left : 180px;

  &:hover {
    background-color:rgb(225, 225, 225);
  }
`;

const ActionButton = styled.button`
  width: 74px;
  height: 20px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
  border: none;
  border-radius: 5px;
  padding: 2px 2px;
  cursor: pointer;
  color: #1A1A1A;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-left : 150px;
  margin-top : 13px;

  &:hover {
    background-color:rgb(225, 225, 225);
  }
`;
const AgainLogo = styled.img`
width: 16.947px;
height: 14px;
flex-shrink: 0;
`

const ActionIcon = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
  margin-top : 10px;

  &:hover {
    color: #007bff;
  }
`;
