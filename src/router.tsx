import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SignupForm from "./components/signupForm";

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
