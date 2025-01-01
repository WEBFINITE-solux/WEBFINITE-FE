import React from "react";
import styled from "styled-components";
const Timetable: React.FC = () => {
  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
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
export default Timetable;
