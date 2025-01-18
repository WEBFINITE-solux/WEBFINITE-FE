import { createBrowserRouter } from "react-router-dom";
import PasswordRecovery from "./pages/passwordRecovery";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PasswordRecovery />,
    },
]);

export default router;
