import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import LogoutModal from "./component/logoutModal";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "layout",
            element: <LogoutModal onClose={() => console.log("모달 닫기")} />,
          },
        ],
      },
]);

export default router;
