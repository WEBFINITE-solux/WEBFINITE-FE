import { useEffect, useState } from "react";
import styled from "styled-components";
import token from "../component/token";
import TimetableComponent from "../component/timetable/TimetableComponent";
import CourseList from "../component/timetable/CourseList";

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

const colors = ["#FFD3A9", "#C2B1FF", "#FF9E9E", "#95BAFF", "#9EFFEA"];

const Timetable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  
  // const userId = localStorage.getItem("userId");
  const userId=1;
  const year = "2024";
  const semester = "1";

  useEffect(() => {
    if (!userId) {
      console.error("❌ userId가 로컬 스토리지에 없습니다.");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await token.get(`/course/table/1/${year}/${semester}`);
        const url = `/course/table/1/${year}/${semester}`;
        const fetchedCourses = response.data.courses.map((course: any) => ({
          course_id: course.course_id,
          course_title: course.title, 
          period: `${year}.3~7`, 
          day: course.schedule.map((s: any) => s.day),
          start_time: course.schedule[0].start_time,
          end_time: course.schedule[0].end_time,
          location: course.schedule[0].location,
          color: course.color || colors[Math.floor(Math.random() * colors.length)], 
          term: `${year}년${semester}학기`,
        }));
        setCourses(fetchedCourses);
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
        <TimetableComponent courses={courses} />
        <CourseList courses={courses} />
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
