import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";

const router = createBrowserRouter([{ path: "/", element: <Layout /> }]);

export default router;
