import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import token from "../token";

const QuizMakeComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, fileId } = location.state || {};

  const [quizCount, setQuizCount] = useState({ min: "", max: "" });
  const [quizType, setQuizType] = useState({
    trueFalse: false,
    multipleChoice: false,
    shortAnswer: false,
  });
  const [detailedRequirements, setDetailedRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = parseInt(e.target.value, 10);

    if (value < 1 || value > 5) {
      alert("퀴즈 개수는 최소 1개에서 최대 5개까지 입력 가능합니다.");
      return;
    }

    setQuizCount({ ...quizCount, [type]: value.toString() });
  };

  const handleCreateQuiz = async () => {
    if (!quizCount.min || !quizCount.max) {
      alert("퀴즈 개수를 입력해주세요.");
      return;
    }
    if (!courseId || !fileId) {
      alert("강의와 자료가 선택되지 않았습니다.");
      return;
    }

    setLoading(true);

    try {
      const response = await token.post(`/quiz/create/${courseId}/${fileId}`, {
        userId: 1,
        quizCountRange: `${quizCount.min}-${quizCount.max}`,
        questionType: quizType.multipleChoice
          ? "MULTIPLE_CHOICE"
          : quizType.trueFalse
          ? "TRUE_FALSE"
          : "SUBJECTIVE",
        detailedRequirements: detailedRequirements,
      });

      console.log("✅ 퀴즈 생성 완료:", response.data);
      alert("퀴즈 생성이 완료되었습니다!");
      navigate("/quiz");
    } catch (error) {
      console.error("🚨 퀴즈 생성 중 오류 발생:", error);
      alert("퀴즈 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Label>퀴즈 개수</Label>
      <InputGroup>
        <Input type="number" placeholder="최소" value={quizCount.min} onChange={(e) => handleInputChange(e, "min")} />
        <span>~</span>
        <Input type="number" placeholder="최대" value={quizCount.max} onChange={(e) => handleInputChange(e, "max")} />
      </InputGroup>

      <Label>퀴즈 형식</Label>
      <CheckboxGroup>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={quizType.trueFalse}
            onChange={(e) => setQuizType({ ...quizType, trueFalse: e.target.checked })}
          />
          참/거짓
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={quizType.multipleChoice}
            onChange={(e) => setQuizType({ ...quizType, multipleChoice: e.target.checked })}
          />
          N지선다 객관식
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={quizType.shortAnswer}
            onChange={(e) => setQuizType({ ...quizType, shortAnswer: e.target.checked })}
          />
          단답형
        </CheckboxLabel>
      </CheckboxGroup>

      <Label>상세 요구 사항</Label>
      <Textarea
        placeholder="퀴즈 갯수, 범위 외의 추가적인 요구사항을 적어주세요. ex) oo부분을 위주로 퀴즈를 만들어줘."
        value={detailedRequirements}
        onChange={(e) => setDetailedRequirements(e.target.value)}
      />

      <CreateButton onClick={handleCreateQuiz} disabled={loading}>
        {loading ? "퀴즈 생성 중..." : "퀴즈 생성"}
      </CreateButton>
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
  margin-top: 50px;
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

const CreateButton = styled.button`
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

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;
