import React from "react";
import styled from "styled-components";
import CourseFirst from "../component/timetable/CourseFirst";
import { useNavigate } from "react-router-dom";
const Timetable: React.FC = () => {
  const navigate = useNavigate();
  const handleTimeblock = () => {
    navigate("/timetable");
  };
  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
      <TimetableContainer>
        <CourseFirst />
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
