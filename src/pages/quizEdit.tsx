import styled from "styled-components";
import QuizComponentEdit from "../component/quiz/QuizComponentEdit";
import { useNavigate } from "react-router-dom";
import token from "../component/token";
import { useState, useEffect } from "react";

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

interface QuizData {
  quizId: number;
  quizTitle: string;
  quizState: "COMPLETED" | "IN_PROGRESS";
  correctRate: string | null;
}

interface CourseQuizData {
  courseId: number;
  courseTitle: string;
  quizzes: QuizData[];
}

const QuizEdit: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState<Record<number, boolean>>({});
  const userId = localStorage.getItem("userId");
  const { year, semester } = getCurrentSemester();

  const [courseQuizzes, setCourseQuizzes] = useState<CourseQuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCoursesAndQuizzes = async () => {
      try {
        const courseResponse = await token.get(`/course/${userId}/${year}/${semester}`);
        const userCourses = courseResponse.data.courses;
        console.log("📌 강의 목록:", userCourses);

        if (!userCourses || userCourses.length === 0) {
          setError("유저에게 등록된 강의가 없습니다.");
          setLoading(false);
          return;
        }

        const allCourseQuizzes: CourseQuizData[] = [];

        for (const course of userCourses) {
          const courseId = course.id;
          const response = await token.get(`/quiz/${userId}/course/${courseId}`);
          console.log(`📌 [${courseId}] 퀴즈 데이터 응답:`, response.data);

          if (Array.isArray(response.data)) {
            allCourseQuizzes.push({
              courseId: courseId,
              courseTitle: course.title || "알 수 없는 강의",
              quizzes: response.data,
            });
          } else {
            console.warn(`🚨 예상과 다른 데이터 형식:`, response.data);
          }
        }

        console.log("📌 최종 courseQuizzes 데이터:", allCourseQuizzes);
        setCourseQuizzes(allCourseQuizzes);
      } catch (err: any) {
        console.error("퀴즈 데이터 불러오기 오류:", err);
        setError(err.response?.data?.message || "퀴즈 데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCoursesAndQuizzes();
  }, [userId, year, semester]);

  const handleCreateQuiz = () => {
    navigate("/quiz/create");
  };

  const handleEdit = () => {
    navigate("/quiz/edit");
  };

  const handleDelete = async () => {
    const selectedQuizIds = Object.keys(selectedCards)
      .filter((quizId) => selectedCards[Number(quizId)])
      .map(Number);

    if (selectedQuizIds.length === 0) {
      alert("삭제할 퀴즈를 선택하세요.");
      return;
    }

    const confirmDelete = window.confirm("선택한 퀴즈를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedQuizIds.map((quizId) => token.delete(`/quiz/${quizId}`))
      );
      alert("퀴즈가 삭제되었습니다.");

      setCourseQuizzes((prev) =>
        prev.map((course) => ({
          ...course,
          quizzes: course.quizzes.filter((quiz) => !selectedQuizIds.includes(quiz.quizId)),
        }))
      );

      setSelectedCards({});
    } catch (error) {
      console.error("🚨 퀴즈 삭제 실패:", error);
      alert("퀴즈 삭제에 실패했습니다.");
    }
  };

  console.log("📌 전체 퀴즈 데이터:", courseQuizzes);

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        <TabContainer>
          <TabWrapper>
            <Tab active>내 퀴즈 목록</Tab>
            <Tab onClick={handleCreateQuiz}>AI 기반 퀴즈 만들기</Tab>
          </TabWrapper>
          <EditButton onClick={handleEdit}>편집</EditButton>
        </TabContainer>

        {loading ? (
          <Message>📖 퀴즈를 불러오는 중...</Message>
        ) : error ? (
          <Message>🚨 {error}</Message>
        ) : courseQuizzes.length > 0 ? (
          <QuizO>
            {courseQuizzes.map((course) => (
              <div key={course.courseId}>
                <CourseHeader>{course.courseTitle}</CourseHeader>
                <QuizComponentEdit quizzes={course.quizzes} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
              </div>
            ))}
            <DeleteButton onClick={handleDelete}>
              <DeleteLogo src="/DeleteLogoW.svg" />
              삭제하기
            </DeleteButton>
          </QuizO>
        ) : (
          <Message>📌 등록된 퀴즈가 없습니다.</Message>
        )}
      </Content>
    </Container>
  );
};

export default QuizEdit;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;

const QuizBack = styled.img`
  width: 1704px;
  height: 1079px;
  flex-shrink: 0;
  z-index: 1;
`;

const Content = styled.div`
  z-index: 10;
  position: absolute;
  top: 75px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1550px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
  padding-left: 20px; 
`;

const TabWrapper = styled.div`
  display: flex;
`;

const Tab = styled.div<{ active?: boolean }>`
  width: 220px;
  flex: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "3px solid #007BFF" : "none")};
`;

const EditButton = styled.button`
  width: 89px;
  height: 33px;
  flex-shrink: 0;
  padding: 3px 16px;
  color: var(--1A1A1A, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; 
  border-radius: 28.858px;
  background: #FFF;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

const Message = styled.div`
  width: 420px;
  height: 51px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; 
  padding: 15px;
  margin-top: 200px;
  border-radius: 11px;
  background: #FFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;

const DeleteButton = styled.button`
border-radius: 28.858px;
background: var(--FF5C5C, #FF5C5C);
box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 150%; 
display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  position : absolute ;
  top : 880px;
  left : 1390px;


`
const QuizO = styled.div`

`
const DeleteLogo = styled.img`
width: 25px;
height: 25px;
flex-shrink: 0;
`

const CourseHeader = styled.div`
  color: #1A1A1A;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  padding: 10px;
  background-color: #f7e4e4;
  border-radius: 5px;
  width: 100%;
`;
