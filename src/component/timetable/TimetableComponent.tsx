import React from "react";
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

type TimetableProps = {
  courses: Course[];
};

const TimetableComponent: React.FC<TimetableProps> = ({ courses }) => {
  const dayMap: Record<string, string> = {
    SUN: "일",
    MON: "월",
    TUE: "화",
    WED: "수",
    THU: "목",
    FRI: "금",
    SAT: "토",
  };

  const timeToNumber = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  return (
    <Container>
      <Header>
        <Title>{courses[0]?.term}</Title>
        <OptionsButton>▼</OptionsButton>
      </Header>
      <Table>
        <Thead>
          <Tr>
            <Th />
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <Th key={day}>{day}</Th>
            ))}
          </Tr>
        </Thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <Tr key={i}>
              <Td>{i + 9}</Td>
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <Td key={day}>
                  {courses
                    .filter(
                      (course) =>
                        course.day.includes(
                          Object.keys(dayMap).find(
                            (key) => dayMap[key] === day
                          )!
                        ) &&
                        timeToNumber(course.start_time) < i + 10 &&
                        timeToNumber(course.end_time) > i + 9
                    )
                    .map((course) => (
                      <CourseBlock
                        key={course.course_id}
                        style={{
                          height: `${
                            (timeToNumber(course.end_time) -
                              timeToNumber(course.start_time)) *
                            100
                          }%`,
                          top: `${
                            (timeToNumber(course.start_time) - (i + 9)) * 100
                          }%`,
                          backgroundColor: course.color,
                        }}
                      >
                        <strong>{course.course_title}</strong>
                        <br />
                        {course.location}
                      </CourseBlock>
                    ))}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TimetableComponent;

const Container = styled.div`
  position: absolute;
  top: -8px;
  right: 550px;
  align-items: center;
  padding: 20px;
  background-color: none;
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

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #656565;
  cursor: pointer;
`;
const Thead = styled.thead`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 890px;
  height: 700px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 25px;
  table-layout: fixed;
  overflow: hidden;
`;

const Th = styled.th`
  border: 1px solid #e0e0e0;
  padding: 10px;
  text-align: center;
  background-color: #ffffff;
`;

const Tr = styled.tr`
  height: 60px;
`;

const Td = styled.td`
  border: 1px solid #e0e0e0;
  text-align: center;
  position: relative;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const CourseBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  color: #303030;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 4px;
`;
