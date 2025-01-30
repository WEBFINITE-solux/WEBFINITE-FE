import React, { useState, useEffect } from "react";
import styled from "styled-components";
import token from "../token";

interface Course {
  id: number;
  title: string;
  period: string;
}

interface CourseSelectModalProps {
  onClose: () => void;
  onSelect: (course: Course) => void;
}

const CourseSelectModal: React.FC<CourseSelectModalProps> = ({ onClose, onSelect }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const userId = 1;
  const year = "2024";
  const semester = "1";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await token.get(`/course/${userId}/${year}/${semester}`);
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("강의 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseId(course.id);
    console.log("선택된 courseId:", course.id);
    onSelect(course);
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          강의 선택
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>
          {loading ? (
            <Message>📂 강의를 불러오는 중...</Message>
          ) : (
            courses.map((course) => (
              <CourseItem key={course.id} onClick={() => handleSelectCourse(course)} selected={course.id === selectedCourseId}>
                {course.title} ({course.period})
              </CourseItem>
            ))
          )}
        </Content>
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

const Message= styled.div`
  font-size: 14px;
  color: #666;
`;
