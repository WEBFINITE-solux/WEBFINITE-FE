import React from "react";
import styled from "styled-components";

type Course = {
  id: number;
  title: string;
  location: string;
  time: string;
};

const CourseList: React.FC = () => {
  const courses: Course[] = [];

  return (
    <Container>
      <Header>
        <Title>나의 강의 목록</Title>
        <OptionsButton>⋮</OptionsButton>
      </Header>
      <Content>
        {courses.length === 0 ? (
          <EmptyMessage>아직 등록된 강의가 없습니다.</EmptyMessage>
        ) : (
          <CourseListContainer>
            {courses.map((course) => (
              <CourseItem key={course.id}>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDetails>
                  {course.location} | {course.time}
                </CourseDetails>
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
  height: 100%;
  background-color: #f3f3f3;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px 8px 0 0;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: bold;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #656565;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #f3f3f3;
  border-radius: 0 0 8px 8px;
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
  gap: 12px;
`;

const CourseItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

const CourseTitle = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const CourseDetails = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  color: #656565;
`;
