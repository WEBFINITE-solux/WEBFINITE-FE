import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const quizResult = {
  message: "채점 결과입니다.",
  quiz_title: "강의자료_1",
  correct_count: 1,
  total_questions: 2,
  correct_rate: "1/2",
  detailed_results: [
    {
      question_id: 101,
      question_content: "다음 중 OOP의 특징이 아닌 것은?",
      user_answer: "병렬 처리",
      is_correct: false,
      correct_answer: "다형성",
      choices: ["캡슐화", "상속", "병렬 처리", "다형성"],
      explanation: "OOP의 특징은 캡슐화, 상속, 다형성입니다. 병렬 처리는 관련이 없습니다.",
    },
    {
      question_id: 102,
      question_content: "CPU의 역할은?",
      user_answer: "연산 수행",
      is_correct: true,
      correct_answer: "연산 수행",
      choices: ["연산 수행", "데이터 저장", "입출력 관리", "모니터 출력"],
      explanation: "CPU는 데이터 연산 및 처리를 담당합니다.",
    },
    {
        question_id: 103,
        question_content: "CPU의 역할은?",
        user_answer: "연산 수행",
        is_correct: true,
        correct_answer: "연산 수행",
        choices: ["연산 수행", "데이터 저장", "입출력 관리", "모니터 출력"],
        explanation: "CPU는 데이터 연산 및 처리를 담당합니다.",
      },
      {
        question_id: 104,
        question_content: "CPU의 역할은?",
        user_answer: "연산 수행",
        is_correct: true,
        correct_answer: "연산 수행",
        choices: ["연산 수행", "데이터 저장", "입출력 관리", "모니터 출력"],
        explanation: "CPU는 데이터 연산 및 처리를 담당합니다.",
      },
      {
        question_id: 105,
        question_content: "CPU의 역할은?",
        user_answer: "데이터 저장",
        is_correct: false,
        correct_answer: "연산 수행",
        choices: ["연산 수행", "데이터 저장", "입출력 관리", "모니터 출력"],
        explanation: "CPU는 데이터 연산 및 처리를 담당합니다.",
      },
  ],
};

const QuizAnswer = () => {
    const navigate = useNavigate();
    const handleList=()=>{
        navigate("/quiz");
    }
  return (
    <Container>
      <Header>
        <Title>AI 해설</Title>
      </Header>
      <Content>
        {quizResult.detailed_results.map((result, index) => (
          <QuestionBox key={result.question_id}>
            <QuestionHeader>
              {index + 1}. {result.question_content}
            </QuestionHeader>
            <Choices>
              {result.choices.map((choice, i) => (
                <Choice
                  key={i}
                  isCorrect={choice === result.correct_answer}
                  isUserAnswer={choice === result.user_answer}
                >
                  {String.fromCharCode(97 + i)}. {choice}
                </Choice>
              ))}
            </Choices>
            <Explanation isCorrect={result.is_correct}>
              <Answer isCorrect={result.is_correct} >정답:</Answer> {result.correct_answer} <br />
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
  background: none
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
    props.isUserAnswer
      ? props.isCorrect
        ? "#2D41FF"
        : "#FF5C5C"
      : "#555"};
`;

const Explanation = styled.div<{ isCorrect: boolean}>`
 background: ${(props) => (props.isCorrect ? "#EAECFF" : "#fde7e7")};
 color: ${(props) => (props.isCorrect ? "#2D41FF" : "#FF5C5C")};
 font-family: Pretendard;
 font-size: 14px;
 font-style: normal;
 font-weight: 400;
 line-height: 150%; 
  padding: 10px;
  border-radius: 5px;
`;
const Answer = styled.strong<{ isCorrect: boolean}>`
color: ${(props) => (props.isCorrect ? "#2D41FF" : "#FF5C5C")};
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; 
`
const Script = styled.div`
color:#6A6A6A;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; 
margin-left : 20px;
`

const ExitButton = styled.button`
  display: block;
  width: 150px;
  height : 40px;
  padding: 5px 0;
  border-radius: 28.858px;
  margin-left : 860px;
background: #FFF;
box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  border: none;
  color: var(--1A1A1A, #1A1A1A);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 30px */
  cursor: pointer;
  text-align: center;
  &:hover {
    background:rgb(235, 235, 235);
  }
`;
