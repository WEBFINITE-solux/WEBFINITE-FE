import React from "react";
import styled from "styled-components";
import TimetableComponent from "../component/timetable/TimetableComponent";
import CourseList from "../component/timetable/courseList";

const Timetable: React.FC = () => {
  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
      <TimetableContainer>
        <TimetableComponent />
        <CourseList />
      </TimetableContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;
const TimetableBack = styled.img`
  width: 1704px;
  height: 1079px;
  flex-shrink: 0;
  z-index: 1;
`;
const TimetableContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 75px;
  right: 10px;
`;

export default Timetable;
