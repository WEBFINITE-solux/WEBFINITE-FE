import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import Timetable from "./pages/timetable";
import MainPage from "./pages/mainPage";

const router = createBrowserRouter([
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
