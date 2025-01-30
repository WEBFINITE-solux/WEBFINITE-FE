import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface QuizAnswerProps {
  quizResult: any;
}

const QuizAnswer: React.FC<QuizAnswerProps> = ({ quizResult }) => {
  const navigate = useNavigate();
  const handleList = () => {
    navigate("/quiz");
  };

  return (
    <Container>
      <Header>
        <Title>AI 해설</Title>
      </Header>
      <Content>
        {quizResult.detailedResults.map((result: any, index: number) => (
          <QuestionBox key={result.questionId}>
            <QuestionHeader>
              {index + 1}. {result.questionContent}
            </QuestionHeader>
            <Choices>
              {result.choices.map((choice: string, i: number) => (
                <Choice
                  key={i}
                  isCorrect={choice === result.correctAnswer}
                  isUserAnswer={choice === result.userAnswer}
                >
                  {String.fromCharCode(97 + i)}. {choice}
                </Choice>
              ))}
            </Choices>
            <Explanation isCorrect={result.correct}>
              <Answer isCorrect={result.correct}>정답:</Answer> {result.correctAnswer} <br />
              <Script>→ {result.explanation}</Script>
            </Explanation>
          </QuestionBox>
        ))}
        <ExitButton onClick={handleList}>나가기</ExitButton>
      </Content>
    </Container>
  );
};

export default QuizAnswer;

const Container = styled.div`
  width: 70%;
  margin: 30px auto;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  padding: 30px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #ddd;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const QuestionBox = styled.div`
  margin-bottom: 25px;
  padding: 25px;
  border-radius: 8px;
  background: none;
  border: none;
`;

const QuestionHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #444;
`;

const Choices = styled.div`
  margin-bottom: 15px;
`;

const Choice = styled.div<{ isCorrect: boolean; isUserAnswer: boolean }>`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: ${(props) => (props.isUserAnswer ? "bold" : "normal")};
  color: ${(props) =>
    props.isUserAnswer ? (props.isCorrect ? "#2D41FF" : "#FF5C5C") : "#555"};
`;

const Explanation = styled.div<{ isCorrect: boolean }>`
  background: ${(props) => (props.isCorrect ? "#EAECFF" : "#fde7e7")};
  color: ${(props) => (props.isCorrect ? "#2D41FF" : "#FF5C5C")};
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  border-radius: 5px;
`;

const Answer = styled.strong<{ isCorrect: boolean }>`
  color: ${(props) => (props.isCorrect ? "#2D41FF" : "#FF5C5C")};
  font-size: 14px;
  font-weight: 400;
`;

const Script = styled.div`
  color: #6A6A6A;
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
`;

const ExitButton = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  padding: 5px 0;
  border-radius: 28.858px;
  margin-left: 860px;
  background: #FFF;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  color: #1A1A1A;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: rgb(235, 235, 235);
  }
`;
