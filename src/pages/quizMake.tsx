import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import QuizMakeComponent from "../component/quiz/QuizMakeComponent";
import NoticeModal from "../component/quiz/noticeModal";

const QuizMake: React.FC = () => {
    const navigate = useNavigate();
  
    const handleList = () => {
      navigate("/quiz");
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
            <AddButton>
              <AddLogo src="/quizAdd.svg" />
            </AddButton>
           
          </TabContainer>
           <QuizMakeComponent/>
        </Content>
        <NoticeModal/>
      </Container>
    );
  };
  
export default QuizMake;

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