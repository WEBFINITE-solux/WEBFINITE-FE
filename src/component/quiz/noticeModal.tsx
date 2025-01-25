import React, { useState } from "react";
import styled from "styled-components";

const NoticeModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [doNotShowToday, setDoNotShowToday] = useState(false);

  const handleClose = () => {
    if (doNotShowToday) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      localStorage.setItem("hideNotice", tomorrow.toISOString());
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    const hideNotice = localStorage.getItem("hideNotice");
    if (hideNotice && new Date(hideNotice) > new Date()) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={handleClose}>×</CloseButton>
        <Content>
          <CheckboxContainer>
            <input
              type="checkbox"
              checked={doNotShowToday}
              onChange={(e) => setDoNotShowToday(e.target.checked)}
            />
            <label>오늘 하루만 보지 않기</label>
          </CheckboxContainer>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default NoticeModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 500px;
height: 671.053px;
flex-shrink: 0;
  background: url("/noticeBackground.png") no-repeat center/cover;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6A6A6A;

  &:hover {
    color: #ccc;
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #6A6A6A;
  font-family : Pretendard;
`;
