import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";

const router = createBrowserRouter([
  {
    path: "/timetable",
    element: <Layout />,
    children: [{ path: "", element: <Timetable /> }],
  },
]);

export default router;
