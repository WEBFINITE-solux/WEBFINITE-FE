import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";
import MainPage from "./pages/mainPage";
import TimetableUpload from "./pages/timetableUpload";
import TimetableView from "./pages/timetableView";
import Home from "./pages/home";
import Study from "./pages/study";
import AiPlan from "./pages/aiPlan";
import SignupForm from "./pages/signupForm";
import LoginForm from "./pages/loginFom";
import LogoutModal from "./component/logoutModal";
import Quiz from "./pages/quiz";
import QuizCreate from "./pages/quizCreate";
import QuizMake from "./pages/quizMake";
import QuizSolve from "./pages/quizSolve";
import QuizAnswerPage from "./pages/quizAnswerPage";
import QuizEdit from "./pages/quizEdit";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [{ path: "", element: <Home />}]
  },
  {
    path: "/study",
    element: <Layout />,
    children: [
      { path: "", element: <Study />},
      { path: "aiPlan", element: <AiPlan /> },
    ]
  },
    {
    path: "/timetable", 
    element: <Layout />,
    children: [
      { path: "", element: <Timetable /> },
      { path: "upload", element: <TimetableUpload /> }, 
      { path: "view", element: <TimetableView /> }, 
    ],
  },
  {
    path : "/quiz",
    element:<Layout/>,
    children:[
      {path:"",element:<Quiz/>},
      {path:"create",element:<QuizCreate/>},
      {path:"create/choose",element:<QuizMake/>},
      {path:"solve",element:<QuizSolve/>},
      {path:"answer",element:<QuizAnswerPage/>},
      {path:"edit",element:<QuizEdit/>},
    ]
  },
  {
        path: "/",
        element: <MainPage />,
    },
          {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "*",
    element: <Navigate to="/signup" replace />,
  },
  {
        path: "/",
        element: <LoginForm />,
  },
  {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "layout",
            element: <LogoutModal onClose={() => console.log("모달 닫기")} />,
          },
        ],
      },
]);

export default router;