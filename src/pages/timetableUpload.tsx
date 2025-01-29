import React, { useEffect, useState } from "react";
import styled from "styled-components";
import token from "../component/token"; 
import TimetableComponent from "../component/timetable/TimetableComponent";
import FileUpload from "../component/timetable/FileUpload";

type Course = {
  course_id: number;
  course_title: string;
  period: string;
  day: string[];
  start_time: string;
  end_time: string;
  location: string;
  color: string;
  term: string;
};

const TimetableUpload: React.FC = () => {
  const colors = ["#FFD3A9", "#C2B1FF", "#FF9E9E", "#95BAFF", "#9EFFEA"];
  const [courses, setCourses] = useState<Course[]>([]);

  const userId = 1; 
  const year = "2024";
  const semester = "1";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await token.get(`/course/table/${userId}/${year}/${semester}`);
        console.log("시간표 데이터 응답:", response.data);

        const formattedCourses = response.data.courses.map((course: any) => ({
          course_id: course.course_id,
          course_title: course.title,
          period: course.period || `${year}.3~7`,
          day: course.schedule?.map((s: any) => s.day) || [],
          start_time: course.schedule?.[0]?.start_time || "00:00",
          end_time: course.schedule?.[0]?.end_time || "00:00",
          location: course.schedule?.[0]?.location || "Unknown",
          color: colors[Math.floor(Math.random() * colors.length)], 
          term: `${year}년${semester}학기`,
        }));

        setCourses(formattedCourses);
      } catch (error) {
        console.error("강의 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCourses();
  }, [userId, year, semester]);

  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
      <HorizontalContainer>
        <TimetableContainer>
          <TimetableComponent courses={courses} />
          <FileUploadContainer>
            <FileUpload courses={courses} />
          </FileUploadContainer>
        </TimetableContainer>
      </HorizontalContainer>
    </Container>
  );
};

export default TimetableUpload;

const Container = styled.div`
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

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const FileUploadContainer = styled.div`
  margin-top: 90px;
  margin-right: 100px;
`;
