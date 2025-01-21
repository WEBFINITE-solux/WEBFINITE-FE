import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Course {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface CourseSelectModalProps {
  courses: Course[];
  onClose: () => void;
  onSelect: (course: Course) => void;
}

const CourseSelectModal: React.FC<CourseSelectModalProps> = ({
  courses,
  onClose,
  onSelect,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const navigate=useNavigate();
  const handleCourseClick = (course: Course) => {
    setSelectedCourseId(course.id);
    onSelect(course);
  };

  const handleSelectButtonClick = () => {
    if (selectedCourseId !== null) {
      onClose(); 
      navigate("/quiz/create/choose")
    }
  };

  return (
    <Overlay>
      <Modal>
        <Header> 
          생성할 퀴즈 강의 선택
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>
          {courses.map((course) => (
            <CourseItem
              key={course.id}
              selected={course.id === selectedCourseId}
              onClick={() => handleCourseClick(course)}
            >
              <Icon src="/courseLogo.png"/>
              <CourseDetails>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
              </CourseDetails>
              <CourseDate>{course.date}</CourseDate>
            </CourseItem>
          ))}
        </Content>
        <Footer>
          <SelectButton
            disabled={selectedCourseId === null}
            onClick={handleSelectButtonClick}
          >
            강의 선택
          </SelectButton>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default CourseSelectModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 500px;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }
`;

const CourseItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "#fff")};
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#e0e0e0" : "#f9f9f9")};
  }
`;

const Icon = styled.img`
  width: 40px;
  height : 40px;
  margin-right: 10px;
`;

const CourseDetails = styled.div`
  flex: 1;
`;

const CourseTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CourseDescription = styled.div`
  font-size: 14px;
  color: #666;
`;

const CourseDate = styled.div`
  font-size: 14px;
  color: #888;
`;

const Footer = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
`;

const SelectButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;
