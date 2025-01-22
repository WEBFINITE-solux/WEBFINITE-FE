import styled from "styled-components";
import Quiz from "../component/quiz/QuizMulti";


const QuizSolve: React.FC = () => {
  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        <Quiz/>
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