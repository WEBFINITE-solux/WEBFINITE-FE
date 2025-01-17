import React from "react";
import styles from "../styles/LoginForm.module.css";

const LoginForm: React.FC = () => {
  return (
    <div className={styles.formContainer}>
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
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.inputField}
      />
      <div className={styles.checkboxContainer}>
        <input type="checkbox" className={styles.checkbox} />
        <label className={styles.checkboxLabel}>Remember me</label>
        <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default LoginForm;