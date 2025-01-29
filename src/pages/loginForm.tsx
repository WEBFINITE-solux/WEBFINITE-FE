import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import styles from "../styles/LoginForm.module.css";

const LoginForm: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const isButtonEnabled = id.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    try {
      const response = await loginUser({ loginUserId: id, password });
      localStorage.setItem("accessToken", response.jwtToken.accessToken);
      localStorage.setItem("refreshToken", response.jwtToken.refreshToken);
      localStorage.setItem("userId", response.userId);
      alert("로그인 성공!");
      navigate("/home");
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message || "로그인 요청 중 문제가 발생했습니다.");
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setError(false);
    setErrorMessage("");
  };

  const handleBackButtonClick = () => {
    navigate("/"); 
  };

  return (
    <div className={styles.formContainer}>
      <img
        src="/backButton.png"
        alt="Back Button"
        className={styles.backButton}
        onClick={handleBackButtonClick}
      />

      <img
        src="/LearnAIbleLogo2.png"
        alt="LearnAIble Logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>Create your Account</h1>
      <button className={styles.googleLoginButton}>
        <img
          src="/googleLogo.png"
          alt="Google Logo"
          className={styles.googleLogo}
        />
        Login with Google
      </button>
      <div className={styles.orContainer}>
        <img
          src="/dottedLine.png"
          alt="Dotted Line"
          className={styles.dottedLine}
        />
        <span className={styles.orText}>or</span>
        <img
          src="/dottedLine.png"
          alt="Dotted Line"
          className={styles.dottedLine}
        />
      </div>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => handleInputChange(setId, e.target.value)}
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handleInputChange(setPassword, e.target.value)}
        className={styles.inputField}
      />
      <div className={styles.checkboxContainer}>
        <input type="checkbox" className={styles.checkbox} />
        <label className={styles.checkboxLabel}>Remember me</label>
        <a
          href="#"
          className={styles.forgotPassword}
          onClick={(e) => {
            e.preventDefault();
            navigate("/passwordRecovery");
          }}
        >
          Forgot Password?
        </a>
      </div>
      <div className={styles.errorMessageContainer}>
        {error && (
          <>
            <img
              src="/errorIcon.png"
              alt="Error Icon"
              className={styles.errorIcon}
            />
            {errorMessage}
          </>
        )}
      </div>
      <button
        onClick={handleLogin}
        className={styles.loginButton}
        disabled={!isButtonEnabled}
        style={{
          backgroundColor: isButtonEnabled
            ? error
              ? "#FFC3C3"
              : "#2D41FF"
            : "#C9CEFF",
        }}
      >
        Log in
      </button>
    </div>
  );
};

export default LoginForm;
