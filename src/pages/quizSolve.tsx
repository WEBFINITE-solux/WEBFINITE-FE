import styled from "styled-components";
import QuizMulti from "../component/quiz/QuizMulti";
import QuizTF from "../component/quiz/QuizTF";
import QuizShort from "../component/quiz/QuizShort";
import { useState } from "react";

type QuizType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SUBJECTIVE";

const QuizSolve: React.FC = () => {
  const [quizType, setQuizType] = useState<QuizType>("MULTIPLE_CHOICE");

  const renderQuizComponent = () => {
    switch (quizType) {
      case "MULTIPLE_CHOICE":
        return <QuizMulti />;
      case "TRUE_FALSE":
        return <QuizTF />;
      case "SUBJECTIVE":
        return <QuizShort />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>{renderQuizComponent()}</Content>
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
