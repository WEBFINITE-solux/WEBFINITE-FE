import { createBrowserRouter } from "react-router-dom";
import PasswordRecovery from "./pages/passwordRecovery";
import PasswordAlert from './pages/passwordAlert';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PasswordRecovery />,
    },
    {
        path: "/passwordRecovery",
        element: <PasswordRecovery />,
    },
    {
        path: "/passwordAlert",
        element: <PasswordAlert userId={""} userPassword={""} />,
    },
]);

export default router;
