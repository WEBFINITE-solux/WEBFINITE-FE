import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Question {
  questionId: number;
  questionContent: string;

}

interface QuizData {
  quizTitle: string;
  questions: Question[];
}

interface QuizTFProps {
  quizData: QuizData;
}

const QuizTF: React.FC<QuizTFProps> = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
  }, [quizData]);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      alert("마지막 질문입니다.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const handleAnswer = () => {
    navigate("/quiz/answer");
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert("정답을 선택해주세요!");
      return;
    }
    setIsPopupVisible(true);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPopupVisible(false);
    }
  };

  const handleGoToQuizList = () => {
    navigate("/quiz");
  };

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Subtitle>퀴즈</Subtitle>
          <Title>{quizData.quizTitle}</Title>
          <Subtitle>문제 {currentQuestionIndex + 1} / {quizData.questions.length}</Subtitle>
        </TitleContainer>
        <CloseButton onClick={handleGoToQuizList}>×</CloseButton>
      </Header>
      <ProgressBarContainer>
        <ProgressBar
          style={{
            width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%`,
          }}
        />
      </ProgressBarContainer>
      <Content>
        <QuestionNumber>{currentQuestionIndex + 1}</QuestionNumber>
        <QuestionText>{currentQuestion.questionContent}</QuestionText>
        <Answers>
          <AnswerButton onClick={() => handleAnswerChange("TRUE")} selected={selectedAnswer === "TRUE"}>
            참
          </AnswerButton>
          <AnswerButton onClick={() => handleAnswerChange("FALSE")} selected={selectedAnswer === "FALSE"}>
            거짓
          </AnswerButton>
        </Answers>
        <Navigation>
          <NavButton onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            {"<"}
          </NavButton>
          <NavButton
            onClick={handleNext}
            disabled={currentQuestionIndex === quizData.questions.length - 1}
          >
            {">"}
          </NavButton>
        </Navigation>
        <SubmitButton onClick={handleSubmit}>채점하기</SubmitButton>
      </Content>
      {isPopupVisible && (
        <Popup onClick={handleOutsideClick}>
          <PopupContent>
            <PopupText>결과를 바로 확인하러 가시겠습니까?</PopupText>
            <PopupButtons>
              <PopupButton onClick={handleGoToQuizList} primary>
                퀴즈 목록으로
              </PopupButton>
              <PopupButton onClick={handleAnswer}>결과 확인</PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};

export default QuizTF;


const Container = styled.div`
  width: 1500px;
  height: 500px;
  margin: 50px auto;
  margin-top: 150px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 400px;
  gap: 250px;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;
const Subtitle = styled.div`
  color: #7c7c7c;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: #f0f0f0;
  margin: 15px 0;
  border-radius: 3px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #007bff;
  border-radius: 3px;
`;

const Content = styled.div`
  padding: 20px 0;
`;

const QuestionNumber = styled.div`
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const QuestionText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Answers = styled.div`
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const AnswerButton = styled.button<{ selected: boolean }>`
  width : 300px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background: ${(props) => (props.selected ? "#2D41FF" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  cursor: pointer;
  &:hover {
    background: #0056b3;
    color: #fff;
  }
`;


const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  width: 153px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 28.858px;
  background: #2d41ff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  margin-left: 1270px;
  margin-top: 10px;
  color: var(--ffffff, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupContent = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const PopupText = styled.p`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const PopupButton = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? "#007bff" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#1a1a1a")};
  border: none;
  box-shadow: ${(props) =>
    props.primary ? "none" : "0px 0px 3px 0px rgba(0, 0, 0, 0.25);"};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  width: 250px;

  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#f0f0f0")};
  }
`;
