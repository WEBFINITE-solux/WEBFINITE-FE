import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

const Quiz: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/quiz/create");
  };

  const handleEdit = () => {
  };

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        <TabContainer>
          <TabWrapper>
            <Tab active>생성된 퀴즈 목록</Tab>
            <Tab onClick={handleCreateQuiz}>AI기반 퀴즈 만들기</Tab>
          </TabWrapper>
          <EditButton onClick={handleEdit}>편집</EditButton>
        </TabContainer>
        <Message>아직 등록된 퀴즈가 없습니다.</Message>
      </Content>
    </Container>
  );
};

export default Quiz;

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
`;

const TabWrapper = styled.div`
  display: flex;
`;

const Tab = styled.div<{ active?: boolean }>`
  width : 220px;
  flex: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "3px solid #007BFF" : "none")};
`;

const EditButton = styled.button`
  width: 89px;
  height: 33px;
  flex-shrink: 0;
  padding: 3px 16px;
  color: var(--1A1A1A, #1A1A1A);
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 150%; 
  border-radius: 28.858px;
background: #FFF;
box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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
  padding : 15px;
  margin-top: 200px;
  border-radius: 11px;
  background: #FFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;
