import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import token from "../component/token";
import QuizComponent from "../component/quiz/QuizComponent";

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

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const userId = searchParams.get("userId");
  const userId = 1; 
  const courseIds = searchParams.getAll("courseId");
  const [courseQuizzes, setCourseQuizzes] = useState<CourseQuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || courseIds.length === 0) {
      setError("유효한 userId 또는 courseId가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchQuizzesForCourses = async () => {
      try {
        const allCourseQuizzes: CourseQuizData[] = [];

        for (const courseId of courseIds) {
          const response = await token.get(`/quiz/${userId}/course/${courseId}`);
          console.log(`📌 [${courseId}] 퀴즈 데이터 응답:`, response.data);
          allCourseQuizzes.push({
            courseId: Number(courseId),
            courseTitle: response.data.length > 0 ? response.data[0].courseTitle : "알 수 없는 강의",
            quizzes: response.data,
          });
        }

        setCourseQuizzes(allCourseQuizzes);
      } catch (err: any) {
        console.error("퀴즈 데이터 불러오기 오류:", err);
        setError(err.response?.data?.message || "퀴즈 데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzesForCourses();
  }, [userId, courseIds]);

  const handleCreateQuiz = () => {
    navigate("/quiz/create");
  };

  const handleEdit = () => {
    navigate("/quiz/edit");
  };

  return (
    <Container>
      <QuizBack src="/quizBackground.png" />
      <Content>
        <TabContainer>
          <TabWrapper>
            <Tab active>생성된 퀴즈 목록</Tab>
            <Tab onClick={handleCreateQuiz}>AI 기반 퀴즈 만들기</Tab>
          </TabWrapper>
          <EditButton onClick={handleEdit}>편집</EditButton>
        </TabContainer>

        {loading ? (
          <Message>🔄 퀴즈 데이터를 불러오는 중...</Message>
        ) : error ? (
          <Message>⚠️ {error}</Message>
        ) : courseQuizzes.length > 0 ? (
          courseQuizzes.map((course) => (
            <CourseSection key={course.courseId}>
              <CourseHeader>{course.courseTitle}</CourseHeader>
              {course.quizzes.length > 0 ? (
                <QuizComponent quizzes={course.quizzes} />
              ) : (
                <Message>📌 해당 강의에는 아직 등록된 퀴즈가 없습니다.</Message>
              )}
            </CourseSection>
          ))
        ) : (
          <Message>아직 등록된 퀴즈가 없습니다.</Message>
        )}
      </Content>
    </Container>
  );
};

export default Quiz;

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
  font-weight: 700;
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
  font-weight: 500;
  padding: 15px;
  margin-top: 200px;
  border-radius: 11px;
  background: #FFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
`;

const CourseSection = styled.div`
  margin-bottom: 40px;
  width: 100%;
`;

const CourseHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 10px;
  border-bottom: 2px solid #007BFF;
  padding-bottom: 5px;
  text-align: left;
  width: 100%;
`;
