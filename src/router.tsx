import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";
import MainPage from "./pages/mainPage";
import Home from "./pages/home";
import Study from "./pages/study";
import AiPlan from "./pages/aiPlan";

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
  
]);

export default router;
