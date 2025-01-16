import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f5f6fb;
  overflow: hidden;
`;

const GradientRectangle = styled.div`
  position: absolute;
  width: 100vh;
  height: 100vh;
  background: linear-gradient(
    2.23deg,
    rgba(45, 65, 255, 0.21) -12%,
    rgba(94, 109, 244, 0.15) 25.11%,
    rgba(255, 255, 255, 0.21) 100.78%
  );
  transform: rotate(90deg);
`;

const LogoContainer = styled.div`
  position: absolute;
  width: 31vw;
  height: auto;
  left: 7vw;
  top: calc(50% - 15vh);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .logo {
    width: 6vw;
    height: 6vw;
  }

  .title {
    font-family: "Pretendard", sans-serif;
    font-size: 4.7vw;
    font-weight: bold;
    color: #1a1a1a;
    text-align: left;
    margin: 0;
    margin-left: 0.45vw;

    .highlight {
      color: #2d41ff;
    }
  }

  .description {
    font-family: "Pretendard", sans-serif;
    font-size: 0.65vw;
    color: #000000;
    line-height: 1.5;
    text-align: left;
    margin-top: 2vh;
    margin-left: 0.75vw;
  }
`;

const Button = styled.button`
  position: absolute;
  width: 11vw;
  height: 5.5vh;
  background: rgba(255, 255, 255, 0.53);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 37px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #2d41ff;
    color: #ffffff;
    box-shadow: 0px 0px 10px rgba(45, 65, 255, 0.5);
  }

  &:focus {
    outline: none;
  }

  .button-text {
    font-family: "Pretendard", sans-serif;
    font-weight: 600;
    font-size: 1.15vw;
    color: #1a1a1a;
    text-align: center;
    margin-right: 0.5vw;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }

  .button-arrow {
    width: 1.15vw;
    height: auto;
    transition: filter 0.3s ease;

    &:hover {
      filter: brightness(0) invert(1);
    }
  }
`;

const LoginButton = styled(Button)`
  top: 80vh;
  left: 7vw;
`;

const SignupButton = styled(Button)`
  top: 80vh;
  left: 20vw;
`;

const MonitorImage = styled.img`
  position: absolute;
  width: calc(1015 / 1920 * 100%);
  height: auto;
  left: calc(910 / 1920 * 100%);
  top: calc(223 / 1080 * 100%);
  object-fit: contain;
`;

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainPageContainer>
      <GradientRectangle />
      <LogoContainer>
        <img src="/LearnAIbleLogo.png" alt="LearnAIble Logo" className="logo" />
        <h1 className="title">
          Learn<span className="highlight">AI</span>ble
        </h1>
        <p className="description">
          러네이블은 사용자의 입력기반 맞춤형 학습계획을 제공하고 <br />
          여러 기능을 통해 효율적인 학습을 지원하는 AI기반 학습관리 플랫폼입니다.
        </p>
      </LogoContainer>
      <LoginButton onClick={() => navigate("/loginForm")}>
        <span className="button-text">로그인</span>
        <img src="/arrow.png" alt="Arrow Icon" className="button-arrow" />
      </LoginButton>
      <SignupButton onClick={() => navigate("/signupForm")}>
        <span className="button-text">회원가입</span>
        <img src="/arrow.png" alt="Arrow Icon" className="button-arrow" />
      </SignupButton>
      <MonitorImage src="/monitor.png" alt="노트북 이미지" />
    </MainPageContainer>
  );
};

export default MainPage;