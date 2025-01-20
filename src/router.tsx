import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";
import MainPage from "./pages/mainPage";
import TimetableUpload from "./pages/timetableUpload";

const router = createBrowserRouter([
  {
    path: "/timetable",
    element: <Layout />,
    children: [{ path: "", element: <Timetable /> }],
  },
  {
    path: "/timetable",
    element: <Layout />,
    children: [{ path: "/upload", element: <TimetableUpload /> }],
  },
  {
        path: "/",
        element: <MainPage />,
    },
]);

export default router;
