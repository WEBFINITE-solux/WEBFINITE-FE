import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";
import MainPage from "./pages/mainPage";
import TimetableUpload from "./pages/timetableUpload";
import TimetableView from "./pages/timetableView";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <MainPage />,
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
]);

export default router;
