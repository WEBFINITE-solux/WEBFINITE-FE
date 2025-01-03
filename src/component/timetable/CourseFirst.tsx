import React from "react";
import styled from "styled-components";

const CourseFirst: React.FC = () => {
  return (
    <Container>
      <Header>나의 강의 목록</Header>
      <Content />
      <Footer>
        <CreateButton>생성하기</CreateButton>
      </Footer>
    </Container>
  );
};

export default CourseFirst;

const Container = styled.div`
  width: 1540px;
  height: 800px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e0e0e0;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const Content = styled.div`
  flex: 1;
  background-color: #fffff;
  overflow-y: auto;
`;

const Footer = styled.div`
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #e0e0e0;
`;

const CreateButton = styled.button`
  border-radius: 28.858px;
  border: 1px solid #000;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  width: 120px;
  height: 32px;
  flex-shrink: 0;

  &:hover {
    background-color: #0056b3;
  }
`;
