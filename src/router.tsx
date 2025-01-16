import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SignupForm from "./pages/signupForm";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "*",
    element: <Navigate to="/signup" replace />,
  },
]);

export default router;
