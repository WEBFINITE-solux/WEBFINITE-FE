import React, { useState } from "react";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();

  const getActiveItem = () => {
    switch (location.pathname) {
      case "/home":
        return "home";
      case "/study":
        return "study";
      case "/timetable":
        return "timetable";
      case "/quiz":
        return "quiz";
      default:
        return "home";
    }
  };

  const [activeItem, setActiveItem] = useState<
    "home" | "study" | "timetable" | "quiz"
  >(getActiveItem());

  React.useEffect(() => {
    setActiveItem(getActiveItem());
  }, [location]);

  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <LogoImg src="/LearnAIbleLogo.png" />
          <Logo src="/LearnAIble.png" />
        </LogoContainer>
        <Menu>
          <MenuTitle>메뉴</MenuTitle>
          <MenuItem isActive={activeItem === "home"} href="/home">
            <MenuImg
              src={activeItem === "home" ? "/homeON.svg" : "/homeOFF.svg"}
              alt="Home Icon"
            />
            Home
          </MenuItem>
          <MenuItem isActive={activeItem === "study"} href="/study">
            <MenuImg
              src={activeItem === "study" ? "/studyON.svg" : "/studyOFF.svg"}
              alt="Study Icon"
            />
            Study
          </MenuItem>
          <MenuItem isActive={activeItem === "timetable"} href="/timetable">
            <MenuImg
              src={
                activeItem === "timetable"
                  ? "/timetableON.svg"
                  : "/timetableOFF.svg"
              }
              alt="Timetable Icon"
            />
            Timetable
          </MenuItem>
          <MenuItem isActive={activeItem === "quiz"} href="/quiz">
            <MenuImg
              src={activeItem === "quiz" ? "/quizON.svg" : "/quizOFF.svg"}
              alt="Quiz Icon"
            />
            Quiz
          </MenuItem>
        </Menu>
      </Sidebar>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuTitle = styled.div`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 35px;
  margin-bottom: 35px;
`;
const LogoContainer = styled.div`
  width: 190px;
  height: 80px;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  width: 114.943px;
  height: 18.318px;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MenuItem = styled.a<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-decoration: none;
  margin-bottom: 60px;
  height: 60px;

  &:hover {
    background-color: #e9ecef;
    border-radius: 8px;
  }
`;

const MenuImg = styled.img`
  width: 43px;
  height: 43px;
  margin-right: 20px;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    display: none;
  }
`;