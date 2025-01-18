import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";
import MainPage from "./pages/mainPage";
import Home from "./pages/home";
import Study from "./pages/study";
import AiPlan from "./pages/aiPlan";
import SignupForm from "./pages/signupForm";
import LoginForm from "./components/loginFom";

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
    children: [{ path: "", element: <Timetable /> }],
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
]);

export default router;