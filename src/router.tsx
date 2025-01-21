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
import LoginForm from "./pages/loginForm";
import LogoutModal from "./component/logoutModal";
import Quiz from "./pages/quiz";
import QuizCreate from "./pages/quizCreate";
import QuizMake from "./pages/quizMake";
import QuizSolve from "./pages/quizSolve";
import QuizAnswerPage from "./pages/quizAnswerPage";
import PasswordRecovery from "./pages/passwordRecovery";
import PasswordAlert from './pages/passwordAlert';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [{ path: "", element: <Home /> }]
  },
  {
    path: "/study",
    element: <Layout />,
    children: [
      { path: "", element: <Study /> },
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
    ]
  },
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/signupForm",
    element: <SignupForm />,
  },
  {
    path: "/loginForm",
    element: <LoginForm />,
  },
  {
    path: "/logoutModal",
    element: <LogoutModal onClose={() => console.log("모달 닫기")} />,
  },
  {
    path: "/passwordRecovery",
    element: <PasswordRecovery />,
  },
  {
    path: "/passwordAlert",
    element: <PasswordAlert />,
  },
]);

export default router;