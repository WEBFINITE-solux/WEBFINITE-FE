import React, { useEffect, useState } from "react";
import styled from "styled-components";
import token from "../component/token"; 
import TimetableComponent from "../component/timetable/TimetableComponent";
import FileView from "../component/timetable/FileView";

// 현재 학기를 계산하는 함수
export const getCurrentSemester = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

  // 1~2월이면 직전 연도, 나머지는 그대로 유지
  const adjustedYear = month === 1 || month === 2 ? year - 1 : year;

  // 학기 결정
  const semester = month >= 3 && month <= 8 ? 1 : 2;

  return { year: adjustedYear, semester };
};

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

const TimetableView: React.FC = () => {
  const colors = ["#FFD3A9", "#C2B1FF", "#FF9E9E", "#95BAFF", "#9EFFEA"];
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");
  const { year, semester } = getCurrentSemester(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await token.get(`/course/table/${userId}/${year}/${semester}`);
        console.log("📌 시간표 데이터 응답:", response.data);

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
        console.error("📌 강의 정보를 불러오는 중 오류 발생:", error);
        setError("강의 데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId, year, semester]);

  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
      <HorizontalContainer>
        <TimetableContainer>
          {loading ? (
            <Message>⏳ 강의 데이터를 불러오는 중...</Message>
          ) : error ? (
            <Message>⚠️ {error}</Message>
          ) : courses.length === 0 ? (
            <Message>📌 강의 정보가 없습니다.</Message>
          ) : (
            <>
              <TimetableComponent courses={courses} />
              <FileUploadContainer>
                <FileView />
              </FileUploadContainer>
            </>
          )}
        </TimetableContainer>
      </HorizontalContainer>
    </Container>
  );
};

export default TimetableView;

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

const Message = styled.div`
  font-size: 16px;
  color: #555;
  text-align: center;
  padding: 20px;
`;
