import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import token from "../token";

interface QuizProps {
  quizData: QuizData;
}


interface Question {
  questionId: number;
  questionContent: string;
}

interface QuizData {
  quizId: number;
  quizTitle: string;
  questions: Question[];
}

const QuizShort:  React.FC<QuizProps> = ({ quizData }) => {
  const [searchParams] = useSearchParams(); 
  const quizId = searchParams.get("quizId"); 

  const [quizD,setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizId) {
      alert("잘못된 접근입니다. 퀴즈 ID가 없습니다.");
      navigate("/quiz");
      return;
    }

    const fetchQuizData = async () => {
      try {
        const response = await token.get(`/quiz/${quizId}`);
        setQuizData(response.data);
        setAnswers(Array(response.data.questions.length).fill(""));
      } catch (error) {
        console.error("🚨 퀴즈 데이터 불러오기 실패:", error);
        alert("퀴즈 정보를 불러오지 못했습니다.");
        navigate("/quiz");
      }
    };

    fetchQuizData();
  }, [quizId, navigate]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("마지막 질문입니다.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!answers[currentQuestionIndex].trim()) {
      alert("정답을 입력해주세요!");
      return;
    }
    setIsPopupVisible(true);
  };

  const handleAnswer = async () => {
    if (!quizData) {
      alert("퀴즈 정보를 불러올 수 없습니다.");
      return;
    }

    const payload = {
      userId: 1, 
      quizId: quizData.quizId, 
      answers: quizData.questions.map((question, index) => ({
        questionId: question.questionId,
        userAnswer: answers[index], 
      })),
    };

    try {
      const response = await token.post("/quiz/submit", payload);
      console.log("📌 답안 제출 성공:", response.data);

      alert("답안이 제출되었습니다!");
      navigate(`/quiz/result?quizId=${quizData.quizId}`); 
    } catch (error: any) {
      console.error("🚨 답안 제출 실패:", error.response?.data || error);
      alert(`답안 제출에 실패했습니다: ${error.response?.data?.message || "오류 발생"}`);
    }
  };

  if (!quizData) {
    return <Message>📖 퀴즈를 불러오는 중...</Message>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <ModalContainer>
      <Header>
        <TitleContainer>
          <Subtitle>퀴즈</Subtitle>
          <Title>{quizData.quizTitle}</Title>
          <Subtitle>문제 {currentQuestionIndex + 1} / {quizData.questions.length}</Subtitle>
        </TitleContainer>
        <CloseButton onClick={() => navigate("/quiz")}>×</CloseButton>
      </Header>
      <ProgressBarContainer>
        <ProgressBar style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }} />
      </ProgressBarContainer>
      <Content>
        <QuestionNumber>{currentQuestionIndex + 1}</QuestionNumber>
        <QuestionText>{currentQuestion.questionContent}</QuestionText>
        <AnswerInput type="text" value={answers[currentQuestionIndex]} onChange={handleAnswerChange} placeholder="정답을 입력하세요" />
        <Navigation>
          <NavButton onClick={handlePrevious} disabled={currentQuestionIndex === 0}>{"<"}</NavButton>
          <NavButton onClick={handleNext} disabled={currentQuestionIndex === quizData.questions.length - 1}>{">"}</NavButton>
        </Navigation>
        <SubmitButton onClick={handleSubmit}>채점하기</SubmitButton>
      </Content>
      {isPopupVisible && (
        <Popup onClick={() => setIsPopupVisible(false)}>
          <PopupContent>
            <PopupText>결과를 바로 확인하러 가시겠습니까?</PopupText>
            <PopupButtons>
              <PopupButton onClick={() => navigate("/quiz")}>퀴즈 목록으로</PopupButton>
              <PopupButton onClick={handleAnswer}>결과 확인</PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}
    </ModalContainer>
  );
};

export default QuizShort;



const ModalContainer = styled.div`
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
  margin-left: 100px;
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

const AnswerInput = styled.input`
  width: 800px;
  padding: 10px;
  margin-left : 400px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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
  margin-top: 50px;
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

const Message = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #777;
  margin-top: 20px;
`;

