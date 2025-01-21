import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CourseSelectModal from "../component/quiz/CourseSelectModal";

const QuizCreate: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
    const courses = [
      { id: 1, title: "강의 1", description: "강의1 수업자료", date: "2024.09" },
      { id: 2, title: "선형대수", description: "1-4강 수업자료", date: "2024.10" },
      { id: 3, title: "선형대수(1)", description: "1-5강 수업자료", date: "2024.10" },
      { id: 4, title: "강의 2", description: "강의2 수업자료", date: "2024.10" },
      { id: 5, title: "강의 3", description: "강의3 수업자료", date: "2024.10" },
    ];
  
    const handleList = () => {
      navigate("/quiz");
    };
  
    const handleAdd = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSelectCourse = (course: any) => {
      setSelectedCourse(course);
    };
  
    return (
      <Container>
        <QuizBack src="/quizBackground.png" />
        <Content>
          <TabContainer>
            <TabWrapper>
              <Tab onClick={handleList}>생성된 퀴즈 목록</Tab>
              <Tab active>AI기반 퀴즈 만들기</Tab>
            </TabWrapper>
            <AddButton onClick={handleAdd}>
              <AddLogo src="/quizAdd.svg" />
            </AddButton>
          </TabContainer>
          <Message>상단 우측에 +버튼을 이용하여 퀴즈를 생성해주세요.</Message>
        </Content>
  
        {isModalOpen && (
          <CourseSelectModal
            courses={courses}
            onClose={handleCloseModal}
            onSelect={handleSelectCourse}
          />
        )}
      </Container>
    );
  };
  
export default QuizCreate;

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

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
  padding-left: 20px;
  margin-top: -5px;
`;

const TabWrapper = styled.div`
  display: flex;
`;

const Tab = styled.div<{ active?: boolean }>`
  width: 220px;
  flex: 1;
  text-align: center;
  padding: 10px 0;
  margin-bottom: -5px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "3px solid #007BFF" : "none")};
`;

const AddButton = styled.button`
  background: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: -15px;
`;

const AddLogo = styled.img`
  width: 42.797px;
  height: 42.797px;
  flex-shrink: 0;
`;

const Message = styled.div`
  width: 420px;
  height: 51px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  padding: 15px;
  margin-top: 200px;
  border-radius: 11px;
  background: #FFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;
