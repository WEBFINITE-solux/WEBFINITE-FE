import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

const QuizCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleList = () => {
    navigate("/quiz");
  };

  const handleAdd = () => {
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
            <AddLogo src="/quizAdd.svg"/>
          </AddButton>
        </TabContainer>
        <Message>상단 우측에 +버튼을 이용하여 퀴즈를 생성해주세요.</Message>
      </Content>
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

const AddButton = styled.button`
  background : none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom : -10px;
  margin-top : 10px;
`;

const AddLogo = styled.img`
width: 42.797px;
height: 42.797px;
flex-shrink: 0;

`
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
