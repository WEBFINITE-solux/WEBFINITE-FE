import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UploadButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleUpload = ()=>{
    navigate("/timetable/upload");
  };

  const handleView = ()=>{
    navigate("/timetable/view");
  };

  return (
    <>
      <BasicButton onClick={handleOpenPopup}>강의 자료</BasicButton>
      {isPopupOpen && (
        <PopupOverlay>
          <PopupContainer>
            <PopupHeader>
              <CloseButton onClick={handleClosePopup}>×</CloseButton>
            </PopupHeader>
            <PopupContent>
              <UploadCard onClick={handleUpload}>
                <OptionIcon src="fileUpload.svg" alt="업로드 아이콘" />
                <OptionText1>강의 자료/스크립트 업로드</OptionText1>
                <SemiText>파일 업로드하기 →</SemiText>
              </UploadCard>
              <ViewCard onClick={handleView}>
                <OptionIcon src="fileCheck.svg" alt="열람 아이콘" />
                <OptionText2>강의 자료 열람</OptionText2>
                <SemiText>자료 보러가기 →</SemiText>
              </ViewCard>
            </PopupContent>
          </PopupContainer>
        </PopupOverlay>
      )}
    </>
  );
};

export default UploadButton;

const BasicButton = styled.button`
  border: 1px solid #e0e0e0;
  border-radius: 28.858px;
  background: #fff;
  padding: 8px 16px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  color: #1a1a1a;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #656565;
  cursor: pointer;

  &:hover {
    color: #1a1a1a;
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;

const ViewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 120px;
  background: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const UploadCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 120px;
  background: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const OptionIcon = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: #2d41ff;
  padding: 10px;
  margin-bottom: 12px;
  display: flex;
  margin-right : 100px;
`;

const OptionText1 = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  color: #1a1a1a;
  margin-right : 5px;
`;

const OptionText2 = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  color: #1a1a1a;
  margin-right : 80px;
`;

const SemiText = styled.div`
  color: #2d41ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  line-height: 150%;
  margin-left : 90px;
  margin-top : 5px;
`;

