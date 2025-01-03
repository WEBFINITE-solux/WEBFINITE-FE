import React, { useState } from "react";
import styled from "styled-components";

type Lecture = {
  course_title: string;
  period: string;
  day: string[];
  start_time: string;
  end_time: string;
  location: string;
};

const TimetableComponent: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([
    {
      course_title: "선형대수학",
      period: "2024-01-10",
      day: ["MON", "WED"],
      start_time: "10:00",
      end_time: "11:15",
      location: "본관 101호",
    },
  ]);
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
        <thead>
          <tr>
            <Th />
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <Th key={day}>{day}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <Tr key={i}>
              <Td>{i + 9}</Td>
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <Td key={day}>
                  {lectures
                    .filter(
                      (lecture) =>
                        lecture.day.includes(
                          Object.keys(dayMap).find(
                            (key) => dayMap[key] === day
                          )!
                        ) &&
                        timeToNumber(lecture.start_time) <= i + 9 &&
                        timeToNumber(lecture.end_time) > i + 9
                    )
                    .map((lecture, idx) => (
                      <LectureBlock
                        key={idx}
                        style={{
                          height: `${
                            (timeToNumber(lecture.end_time) -
                              timeToNumber(lecture.start_time)) *
                            100
                          }%`,
                        }}
                      >
                        <strong>{lecture.course_title}</strong>
                        <br />
                        {lecture.location}
                      </LectureBlock>
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 900px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
`;

const Th = styled.th`
  border: 1px solid #e0e0e0;
  padding: 10px;
  text-align: center;
  background-color: #f5f5f5;
`;

const Tr = styled.tr`
  height: 60px;
`;

const Td = styled.td`
  border: 1px solid #e0e0e0;
  text-align: center;
  position: relative;
`;

const LectureBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  background-color: #7ea9ff;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 4px;
`;
