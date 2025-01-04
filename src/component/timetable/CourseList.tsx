import React, { useState, useRef, useEffect } from "react";
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

type CourseListProps = {
  courses: Course[];
};

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

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
        <Title>나의 강의 목록</Title>
        <OptionsContainer ref={optionsRef}>
          <OptionsButton onClick={toggleOptions}>⋮</OptionsButton>
          {isOptionsOpen && (
            <OptionsMenu>
              <OptionItem onClick={() => alert("강의 추가하기")}>
                <OptionLogo src="/add.png" />
                <OptionContent>추가하기</OptionContent>
              </OptionItem>
              <OptionItem onClick={() => alert("강의 삭제하기")}>
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
              <CourseItem key={course.course_id}>
                <CourseIconContainer src="/courseImg.png" alt="강의 이미지" />
                <CourseInfo>
                  <CourseTitle>{course.course_title}</CourseTitle>
                  <CoursePeriod>{course.period}</CoursePeriod>
                </CourseInfo>
                <UploadButton>강의 자료</UploadButton>
              </CourseItem>
            ))}
          </CourseListContainer>
        )}
      </Content>
    </Container>
  );
};

export default CourseList;

const Container = styled.div`
  width: 400px;
  height: 800px;
  background-color: none;
  border-radius: 8px;
  position: absolute;
  top: 10px;
  right: 100px;
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
    background-color: #f1f3f5;
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
  color: #656565;
  font-family: Pretendard;
  font-size: 16px;
  text-align: center;
`;

const CourseListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: none;
  width: 400px;
  border-bottom: 1px solid #e0e0e0;
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

const CourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-top: 3px;
`;

const CourseTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  width: 85px;
`;

const CoursePeriod = styled.div`
  color: #b3b3b3;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
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
  margin-left: 15px;

  &:hover {
    background-color: #f1f3f5;
  }
`;
