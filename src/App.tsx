import { createGlobalStyle } from "styled-components";
import { AuthProvider } from "./AuthContext";
import router from "./router";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
  width : 100%;
  height : 100%;
    max-width: 1920px;
    max-height: 1080px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    &::-webkit-scrollbar {
    display: none;
  }
  }`;
export default App;
