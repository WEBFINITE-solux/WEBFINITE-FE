import React from "react";
import styled from "styled-components";

interface QuizData {
  quizId: number;
  quizTitle: string;
  quizState: "COMPLETED" | "IN_PROGRESS";
  correctRate: string | null;
}

interface QuizComponentEditProps {
  quizzes: QuizData[];
  selectedCards: Record<number, boolean>;
  setSelectedCards: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
}

const QuizComponentEdit: React.FC<QuizComponentEditProps> = ({
  quizzes,
  selectedCards,
  setSelectedCards,
}) => {
  const handleCheckboxChange = (quizId: number, isChecked: boolean) => {
    setSelectedCards((prev) => ({
      ...prev,
      [quizId]: isChecked,
    }));
  };

  return (
    <Container>
      <QuizList>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.quizId}
            isSelected={selectedCards[quiz.quizId] || false}
          >
            <HorizontalContainer>
              <Title>{quiz.quizTitle}</Title>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  checked={selectedCards[quiz.quizId] || false}
                  onChange={(e) =>
                    handleCheckboxChange(quiz.quizId, e.target.checked)
                  }
                />
              </CheckboxContainer>
            </HorizontalContainer>
            <Progress>{quiz.correctRate ? quiz.correctRate : "?/5"}</Progress>
            <Actions>
              {quiz.quizState === "COMPLETED" ? (
                <>
                  <ActionIcon>
                    <AgainLogo src="/again.svg" />
                  </ActionIcon>
                  <ActionButton>AI 해설보기</ActionButton>
                </>
              ) : (
                <SolveButton>퀴즈 풀기</SolveButton>
              )}
            </Actions>
          </QuizCard>
        ))}
      </QuizList>
    </Container>
  );
};

export default QuizComponentEdit;

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

const QuizCard = styled.div<{ isSelected: boolean }>`
  flex: 0 0 300px;
  background: ${(props) => (props.isSelected ? "#EAECFF" : "#ffffff")};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#dce0ff" : "#f9f9f9")};
  }
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
  border-radius: 5px;
  padding: 2px 2px;
  cursor: pointer;
  color: #1a1a1a;
  text-align: center;
  font-family: pretendardB;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
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
  border-radius: 5px;
  padding: 2px 2px;
  cursor: pointer;
  color: #1a1a1a;
  text-align: center;
  font-family: pretendardB;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
