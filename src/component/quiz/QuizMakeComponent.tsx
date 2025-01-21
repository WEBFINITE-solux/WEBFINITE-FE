import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QuizMakeComponent = () => {
  const [quizCount, setQuizCount] = useState({ min: "", max: "" });
  const [quizType, setQuizType] = useState({
    trueFalse: false,
    multipleChoice: false,
    shortAnswer: false,
  });
  const [detailedRequirements, setDetailedRequirements] = useState("");
  const navigate =useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = parseInt(e.target.value, 10);
  
    if (value < 1 || value > 5) {
      alert("퀴즈 개수는 최소 1개에서 최대 5개까지 입력 가능합니다.");
      return;
    }
  
    setQuizCount({ ...quizCount, [type]: value.toString() });
  };
  
  const handleSubmit = () => {
    if (!quizCount.min || !quizCount.max ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const requestData = {
      user_id: 12345,
      file_id: 56789,
      question_type: quizType.multipleChoice
        ? "MULTIPLE_CHOICE"
        : quizType.trueFalse
        ? "TRUE_FALSE"
        : "SHORT_ANSWER",
      quiz_count: Number(quizCount.max),
      detailed_requirements: detailedRequirements,
    };

    console.log(requestData);
    navigate("/quiz")

  };

  return (
    <Container>
      <Label>퀴즈 개수</Label>
      <InputGroup>
        <Input
          type="number"
          placeholder="최소"
          value={quizCount.min}
          onChange={(e) => handleInputChange(e, "min")}
        />
        <span>~</span>
        <Input
          type="number"
          placeholder="최대"
          value={quizCount.max}
          onChange={(e) => handleInputChange(e, "max")}
        />
      </InputGroup>

      <Label>퀴즈 형식</Label>
      <CheckboxGroup>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={quizType.trueFalse}
            onChange={(e) =>
              setQuizType({ ...quizType, trueFalse: e.target.checked })
            }
          />
          참/거짓
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={quizType.multipleChoice}
            onChange={(e) =>
              setQuizType({ ...quizType, multipleChoice: e.target.checked })
            }
          />
          N지선다 객관식
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={quizType.shortAnswer}
            onChange={(e) =>
              setQuizType({ ...quizType, shortAnswer: e.target.checked })
            }
          />
          단답형
        </CheckboxLabel>
      </CheckboxGroup>
      <Label>상세 요구 사항</Label>
      <Textarea
        placeholder="퀴즈 갯수, 범위 외의 추가적인 요구사항을 적어주세요.
ex) oo부분을 위주로 퀴즈를 만들어줘."
        value={detailedRequirements}
        onChange={(e) => setDetailedRequirements(e.target.value)}
      />
      <Button onClick={handleSubmit}>생성하기</Button>
    </Container>
  );
};

export default QuizMakeComponent;

const Container = styled.div`
  width: 1181px;
  height: 580px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  padding: 40px 40px;
  margin-top : 50px;
`;

const Label = styled.label`
  display: block;
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 8px;
  margin-top: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 100px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-bottom: 80px;
  font-size: 12px;
  font-family: Pretendard;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.418px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #1e40af;
  }
`;
