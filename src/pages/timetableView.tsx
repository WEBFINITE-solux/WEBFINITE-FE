import styled from "styled-components";
import TimetableComponent from "../component/timetable/TimetableComponent";
import FileView from "../component/timetable/FileView";

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

const TimetableView: React.FC = () => {
  const colors = ["#FFD3A9", "#C2B1FF", "#FF9E9E", "#95BAFF", "#9EFFEA"];
  const courses: Course[] = [
    {
      course_id: 1,
      course_title: "선형대수학",
      period: "2024.3~7",
      day: ["MON", "WED"],
      start_time: "10:30",
      end_time: "11:45",
      location: "명신관 221호",
      color: colors[Math.floor(Math.random() * colors.length)],
      term: "2025년1학기",
    },
    {
      course_id: 2,
      course_title: "컴퓨터구조",
      period: "2024.3~7",
      day: ["MON", "WED"],
      start_time: "12:00",
      end_time: "13:15",
      location: "명신관 702호",
      color: colors[Math.floor(Math.random() * colors.length)],
      term: "2025년1학기",
    },
    {
      course_id: 3,
      course_title: "알고리즘입문",
      period: "2024.3~7",
      day: ["TUE"],
      start_time: "13:00",
      end_time: "15:50",
      location: "프라임관 201호",
      color: colors[Math.floor(Math.random() * colors.length)],
      term: "2025년1학기",
    },
  ];

  return (
    <Container>
      <TimetableBack src="/timetableBackground.png" />
      <HorizontalContainer>
      <TimetableContainer>
        <TimetableComponent courses={courses} />
        <FileUploadContainer>
         <FileView courses={courses} />
         </FileUploadContainer>
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
const FileUploadContainer =styled.div`
 margin-top : 90px;
 margin-right : 100px;
`