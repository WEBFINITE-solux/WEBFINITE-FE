import { AuthProvider } from "./AuthContext";
import router from "./router";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
