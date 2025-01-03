import React, { useState } from "react";
import styled from "styled-components";

type Course = {
  course_title: string;
  period: string;
  day: string[];
  start_time: string;
  end_time: string;
  location: string;
  color?: string;
};

const TimetableComponent: React.FC = () => {
  const colors = ["#FFD3A9", "#C2B1FF", "#FF9E9E", "#95BAFF", "#9EFFEA"];

  const [courses, setCourses] = useState<Course[]>(
    [
      {
        course_title: "선형대수학",
        period: "2024-01-10",
        day: ["MON", "WED"],
        start_time: "10:30",
        end_time: "11:45",
        location: "명신관 221호",
      },
      {
        course_title: "컴퓨터구조",
        period: "2024-01-10",
        day: ["MON", "WED"],
        start_time: "12:00",
        end_time: "13:15",
        location: "명신관 702호",
      },
    ].map((course) => ({
      ...course,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  );

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
                    .map((course, idx) => (
                      <CourseBlock
                        key={idx}
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
  top: 1px;
  right: 600px;
  align-items: center;
  padding: 20px;
  background-color: none;
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
