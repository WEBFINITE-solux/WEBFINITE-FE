import React, {useState} from 'react';
import './../styles/homePage.css';

const HomePage: React.FC = () => {
  const openChatGPT = () => {
    window.open('https://chatgpt.com/');
  };

  const [name, SetName] = useState("Webfinite");



  return (
    <div style={{ backgroundColor: '#F5F6FB' }}>
      <div className="left">
        <div className="title">
          <p className="titletext">Hello, {name}.</p>
        </div>

        <div style={{ height: '321px' }}>
          <div style={{ float: 'left' }}>
            <p className="text" style={{ marginTop: '42px' }}>오늘의 할 일</p>
            <div className="table" style={{ width: '659px' }}></div>
          </div>
          <div style={{ float: 'left', marginLeft: '39px' }}>
            <p className="text" style={{ marginTop: '42px' }}>학습 달성률</p>
            <div className="table" style={{ width: '362px' }}></div>
          </div>
        </div>

        <div>
          <div style={{ marginTop: '27px' }}>
            <p className="text">학습 계획</p>
          </div>
          <div className="table" style={{ width: '1060px' }}></div>
        </div>

        <button onClick={openChatGPT} className="gpt">
          <img src="/GotoChatGPT.png" alt="Go To ChatGPT" width="165px" height="30px" style={{ float: 'right' }} />
        </button>
      </div>

      <div className="right">
        <div style={{ height: '52px' }}>
          <p style={{ float: 'right' }}>{name}</p>
          <img src="/LearnAIbleLogo.png" alt="LearnAIble Logo" width="52px" height="52px" style={{ float: 'right' }} />
        </div>
        <div className="personal"></div>
      </div>
    </div>
  );
};

export default HomePage;
