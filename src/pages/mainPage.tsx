import React from "react";
import "./../styles/mainPage.css";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="gradient-rectangle"></div>

      <div className="logo-container">
        <img src="/LearnAIbleLogo.png" alt="LearnAIble Logo" className="logo" />
        <h1 className="title">Learn<span className="highlight">AI</span>ble</h1>
      </div>
    </div>
  );
};

export default MainPage;