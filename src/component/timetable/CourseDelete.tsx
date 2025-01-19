import React, { useRef, useState } from "react";
import styled from "styled-components";

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
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);
  const handleDeleteCourse = (courseId: number) => {
    onDelete(courseId);
  };
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <Container>
      <Header>
            <Title onClick={onBackToList}>나의 강의 목록</Title>
            <OptionsContainer ref={optionsRef}>
              <OptionsButton onClick={toggleOptions}>⋮</OptionsButton>
              {isOptionsOpen && (
                <OptionsMenu>
                  <OptionItem onClick={handleAddClick}>
                    <OptionLogo src="/add.png" />
                    <OptionContent>추가하기</OptionContent>
                  </OptionItem>
                  <OptionItem onClick={handleDeleteClick}>
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
                  <UploadButton>강의 자료</UploadButton>
                </CourseInfo>
                {hoveredId === course.course_id && (
                  <DeleteButton onClick={() => handleDeleteCourse(course.course_id)}>
                    <DeleteLogo src="/DeleteLogo.png" alt="삭제" />
                  </DeleteButton>
                )}
              </CourseItem>
            ))}
          </CourseListContainer>
        )}
      </Content>
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
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const OptionLogo = styled.img`
  width: 35.602px;
  height: 35.602px;
  flex-shrink: 0;
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
  width : 100%;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
  height : 80px;
`;

const CourseIconContainer = styled.img`
  width: 63px;
  height: 62px;
  background-color: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const CourseInfo = styled.div<{ isHovered: boolean }>`
  display: flex;
  widhth : 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 3px;
  transition: transform 0.3s ease;
  transform: ${({ isHovered }) => (isHovered ? "translateX(-20px)" : "translateX(0)")};
`;

const CourseTitle = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

const CoursePeriod = styled.div`
  font-family: Pretendard;
  font-size: 13px;
  color: #b3b3b3;
  margin-left : 17px;
`;
const UploadButton = styled.button`
  border: 1px solid #e0e0e0;
  border-radius: 28.858px;
  background: #fff;
  padding: 8px 16px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  color: #1a1a1a;
  cursor: pointer;
  margin-left: 2px;

  &:hover {
    background-color: #f1f3f5;
  }
`;


const DeleteButton = styled.button`
  background-color: #FF5C5C;
  border: none;
  position: absolute;
  right: 0px;
  top: 50%;
  width : 73px;
  height : 100%;
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
