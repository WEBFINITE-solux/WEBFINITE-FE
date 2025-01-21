import React, { useState } from "react";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname.startsWith("/timetable")) return "timetable";
    if (location.pathname.startsWith("/study")) return "study";
    if (location.pathname.startsWith("/quiz")) return "quiz";
    return "home";
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
      <UserContainer>
        <LogoutButton>
          <LogoutLogo src="/logout.svg" />
          <LogoutContent>로그아웃</LogoutContent>
        </LogoutButton>
        <UserImg src="/user.svg" />
      </UserContainer>
      <Outlet />
    </Container>
  );
};


export default Layout;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;
const UserContainer = styled.div`
  width: 189px;
  height: 47.834px;
  flex-shrink: 0;
  position: absolute;
  top: 10px;
  left: 1660px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  background : none;
`;
const UserImg = styled.img`
  width: 47.834px;
  height: 47.834px;
  flex-shrink: 0;
`;
const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background : none;
`;
const LogoutLogo = styled.img`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
`;
const LogoutContent = styled.div`
  color: #656565;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 0.5px;
`;
const Sidebar = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 80px;
`;
const MenuTitle = styled.div`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 80px;
  margin-bottom: 35px;
`;
const LogoContainer = styled.div`
  width: 190px;
  height: 80px;
  margin-top: 5px;
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
