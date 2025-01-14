import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/loginFom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginForm />,
    },
]);

export default router;
