import React from "react";
import "./../styles/mainPage.css";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="gradient-rectangle"></div>

      <div className="logo-container">
        <img src="/LearnAIbleLogo.png" alt="LearnAIble Logo" className="logo" />
        <h1 className="title">Learn<span className="highlight">AI</span>ble</h1>

        <p className="description">
        러네이블은 사용자의 입력기반 맞춤형 학습계획을 제공하고 <br />
        여러 기능을 통해 효율적인 학습을 지원하는 AI기반 학습관리 플랫폼입니다.
        </p>
      </div>

      <button className="login-button">
        <span className="button-text">로그인</span>
        <img src="/arrow.png" alt="Arrow Icon" className="button-arrow" />
      </button>

      <button className="signup-button">
        <span className="button-text">회원가입</span>
        <img src="/arrow.png" alt="Arrow Icon" className="button-arrow" />
      </button>
    </div>
  );
};

export default MainPage;
