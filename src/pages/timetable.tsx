import React from "react";
import styled from "styled-components";
const Timetable: React.FC = () => {
  return (
    <Container>
      <TimetableImg src="/timetableBackground.png" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;
const TimetableImg = styled.img`
  width: 1704px;
  height: 1079px;
  flex-shrink: 0;
  z-index: 1;
`;
export default Timetable;
