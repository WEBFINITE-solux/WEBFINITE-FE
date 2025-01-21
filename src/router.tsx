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