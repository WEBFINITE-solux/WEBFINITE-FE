import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UploadButton from "./uploadButton";

type Course = {
  course_id: number;
  course_title: string;
  period: string;
  day: string[];
  start_time: string;
  end_time: string;
  location: string;
  color?: string;
  term: string;
};

type CourseDeleteProps = {
  courses: Course[];
  onDelete: (courseId: number) => void;
  onBackToList: () => void;
};

const CourseDelete: React.FC<CourseDeleteProps> = ({ courses, onDelete, onBackToList }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const optionsRef = useRef<HTMLDivElement>(null);

  const handleDeleteCourse = () => {
    if (selectedCourse !== null) {
      onDelete(selectedCourse.course_id);
      setShowPopup(false);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setIsOptionsOpen(false);
    }
  };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <Container>
      <Header>
        <Title onClick={onBackToList}>나의 강의 목록</Title>
        <OptionsContainer ref={optionsRef}>
          <OptionsButton onClick={toggleOptions}>⋮</OptionsButton>
          {isOptionsOpen && (
            <OptionsMenu>
              <OptionItem>
                <OptionLogo src="/add.png" />
                <OptionContent>추가하기</OptionContent>
              </OptionItem>
              <OptionItem onClick={() => setShowPopup(true)}>
                <OptionLogo src="/delete.png" />
                <OptionContent>삭제하기</OptionContent>
              </OptionItem>
            </OptionsMenu>
          )}
        </OptionsContainer>
      </Header>
      <Content>
        {courses.length === 0 ? (
          <EmptyMessage>아직 등록된 강의가 없습니다.</EmptyMessage>
        ) : (
          <CourseListContainer>
            {courses.map((course) => (
              <CourseItem
                key={course.course_id}
                onMouseEnter={() => setHoveredId(course.course_id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <CourseInfo isHovered={hoveredId === course.course_id}>
                  <CourseIconContainer
                    src="/courseImg.png"
                    alt="강의 이미지"
                  />
                  <CourseTitle>{course.course_title}</CourseTitle>
                  <CoursePeriod>{course.period}</CoursePeriod>
                  <UploadButton/>
                </CourseInfo>
                {hoveredId === course.course_id && (
                  <DeleteButton onClick={() => handleDeleteClick(course)}>
                    <DeleteLogo src="/DeleteLogo.png" alt="삭제" />
                  </DeleteButton>
                )}
              </CourseItem>
            ))}
          </CourseListContainer>
        )}
      </Content>

      {showPopup && (
        <PopupContainer>
          <PopupContent>
            <PopupText>{selectedCourse?.course_title}를 삭제하시겠습니까?</PopupText>
            <PopupButtons>
              <CancelButton onClick={closePopup}>취소</CancelButton>
              <ConfirmButton onClick={handleDeleteCourse}>삭제</ConfirmButton>
            </PopupButtons>
          </PopupContent>
        </PopupContainer>
      )}
    </Container>
  );
};

export default CourseDelete;

const Container = styled.div`
  width: 400px;
  height: 780px;
  background-color: none;
  border-radius: 8px;
  position: absolute;
  top: -10px;
  right: -5px;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: none;
  border-radius: 8px 8px 0 0;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const OptionsContainer = styled.div`
  position: relative;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #656565;
  cursor: pointer;
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 72px;
  right: -10px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 287px;
  height: 124px;
  flex-shrink: 0;
`;

const OptionItem = styled.div`
  padding: 14px 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #eaecff;
  }
`;

const OptionContent = styled.div`
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;

const OptionLogo = styled.img`
  width: 35.602px;
  height: 35.602px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  height: 100%;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  color: #656565;
`;

const CourseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
  height: 80px;
`;

const CourseIconContainer = styled.img`
  width: 63px;
  height: 62px;
  background-color: none;
  border-radius: 50%;
  margin-right: 16px;
`;

const CourseInfo = styled.div<{ isHovered: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  margin-top: 3px;
  transition: transform 0.3s ease;
  transform: ${({ isHovered }) => (isHovered ? "translateX(-20px)" : "translateX(0)")};
`;

const CourseTitle = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  width : 80px;
`;

const CoursePeriod = styled.div`
  font-family: Pretendard;
  font-size: 13px;
  color: #b3b3b3;
  margin-left: 17px;
`;

const DeleteButton = styled.button`
  background-color: #ff5c5c;
  border: none;
  position: absolute;
  right: 0px;
  top: 50%;
  width: 73px;
  height: 100%;
  transform: translateY(-50%);
  cursor: pointer;

  &:hover img {
    transform: scale(1.1);
  }
`;

const DeleteLogo = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
`;

const PopupContainer = styled.div`
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

const PopupContent = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const PopupText = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const CancelButton = styled.button`
border-radius: 5px;
background: #FFF;
box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  padding: 8px 16px;
  color: #000;
text-align: center;
font-family: Pretendard;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 19.5px */
width: 101px;
height: 35px;
flex-shrink: 0;

  &:hover {
    background: #f1f1f1;
  }
`;

const ConfirmButton = styled.button`
width: 101px;
height: 35px;
flex-shrink: 0;
border-radius: 5px;
background: #2D41FF;
box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 19.5px */

  &:hover {
    background: #1B31FF;
  }
`;
