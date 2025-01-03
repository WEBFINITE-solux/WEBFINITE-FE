import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import TimetableFirst from "./pages/timetableFirst";
import Timetable from "./pages/timetable";

const router = createBrowserRouter([
  {
    path: "/timetable",
    element: <Layout />,
    children: [
      { path: "/1", element: <TimetableFirst /> },
      { path: "", element: <Timetable /> },
    ],
  },
]);

export default router;
