import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import token from "../token";

type ListCourse = {
  id: number;
  title: string;
  period: string;
};

type CourseDeleteProps = {
  courses: ListCourse[];
  onDelete: (courseId: number) => void;
  onBackToList: () => void;
};

const CourseDelete: React.FC<CourseDeleteProps> = ({
  courses,
  onDelete,
  onBackToList,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ListCourse | null>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleDeleteCourse = async () => {
    if (selectedCourse === null) return;

    try {
      const response = await token.delete(
        `/course/${selectedCourse.id}/delete`
      );
      console.log("강의 삭제 응답:", response.data);

      if (response.status === 200) {
        alert(`강의 "${selectedCourse.title}"가 삭제되었습니다.`);
        onDelete(selectedCourse.id);
        setShowPopup(false);
        window.location.reload();
      }
    } catch (error: any) {
      console.error("강의 삭제 중 오류 발생:", error);
      alert(error.response?.data?.message || "강의 삭제에 실패했습니다.");
    }
  };

  const handleDeleteClick = (course: ListCourse) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Header>
        <Title onClick={onBackToList}>나의 강의 목록</Title>
      </Header>
      <Content>
        {courses.length === 0 ? (
          <EmptyMessage>아직 등록된 강의가 없습니다.</EmptyMessage>
        ) : (
          <CourseListContainer>
            {courses.map((course) => (
              <CourseItem
                key={course.id}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <CourseInfo isHovered={hoveredId === course.id}>
                  <CourseIconContainer src="/courseImg.png" alt="강의 이미지" />
                  <CourseTitle>{course.title}</CourseTitle>
                  <CoursePeriod>{course.period}</CoursePeriod>
                </CourseInfo>
                {hoveredId === course.id && (
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
            <PopupText>{selectedCourse?.title}을 삭제하시겠습니까?</PopupText>
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
  font-family: pretendardB;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
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
  font-family: pretendardM;
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
  transform: ${({ isHovered }) =>
    isHovered ? "translateX(-20px)" : "translateX(0)"};
`;

const CourseTitle = styled.div`
  font-family: pretendardB;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  width: 80px;
`;

const CoursePeriod = styled.div`
  font-family: pretendardM;
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
  font-family: pretendardB;
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
  width: 101px;
  height: 35px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  color: #000;
  font-size: 13px;
  font-weight: 700;
`;

const ConfirmButton = styled.button`
  width: 101px;
  height: 35px;
  border-radius: 5px;
  background: #2d41ff;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
`;
