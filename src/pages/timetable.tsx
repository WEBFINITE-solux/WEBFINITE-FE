import { useEffect, useState } from "react";
import styled from "styled-components";
import token from "../component/token";
import TimetableComponent from "../component/timetable/TimetableComponent";
import CourseList from "../component/timetable/CourseList";

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

const colors = ["#FFD3A9", "#C2B1FF", "#FF9E9E", "#95BAFF", "#9EFFEA"];

type TableCourse = {
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

type ListCourse = {
  id: number; 
  title: string; 
  period: string;
};

const Timetable: React.FC = () => {
  const [tableCourses, setTableCourses] = useState<TableCourse[]>([]);
  const [listCourses, setListCourses] = useState<ListCourse[]>([]);
  
  const userId = localStorage.getItem("userId");
  const { year, semester } = getCurrentSemester();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const tableResponse = await token.get(`/course/table/${userId}/${year}/${semester}`);
        console.log("시간표 데이터 응답:", tableResponse.data);

        const formattedTableCourses = tableResponse.data.courses.map((course: any) => ({
          course_id: course.course_id,
          course_title: course.title,
          period: `${year}.3~7`,
          day: course.schedule?.map((s: any) => s.day) || [],
          start_time: course.schedule?.[0]?.start_time || "00:00",
          end_time: course.schedule?.[0]?.end_time || "00:00",
          location: course.schedule?.[0]?.location || "Unknown",
          color: course.color || colors[Math.floor(Math.random() * colors.length)],
          term: `${year}년${semester}학기`,
        }));

        setTableCourses(formattedTableCourses);
        
        const listResponse = await token.get(`/course/${userId}/${year}/${semester}`);
        console.log("강의 목록 데이터 응답:", listResponse.data);

        const formattedListCourses = listResponse.data.courses.map((course: any) => ({
          id: course.id, 
          title: course.title, 
          period: course.period || `${year}.3~7`,
        }));

        setListCourses(formattedListCourses);
      } catch (error) {
        console.error("강의 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCourses();
  }, [userId, year, semester]);

  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
      <TimetableContainer>
        <TimetableComponent courses={tableCourses} />
        <CourseList courses={listCourses} /> 
      </TimetableContainer>
    </Container>
  );
};

export default Timetable;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;

const TimetableBack = styled.img`
  width: 100%;
  height: auto;
  flex-shrink: 0;
  z-index: 1;
`;

const TimetableContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 75px;
  right: 10px;
`;
