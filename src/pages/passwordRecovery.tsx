import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../services/passwordService";
import styles from "../styles/passwordRecovery.module.css";

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonState, setButtonState] = useState<"default" | "active" | "error">("default");
  const [warningMessage, setWarningMessage] = useState<string>("");

  const handleBackButtonClick = () => {
    navigate("/loginForm");
  };

  const handleSubmit = async () => {
    try {
      const response = await recoverPassword(id, email);

      navigate("/passwordAlert", {
        state: { userId: response.loginUserId, userPassword: response.password },
      });
    } catch (error: any) {
      console.error("비밀번호 찾기 실패:", error.message);

      if (error.message.includes("Unexpected token")) {
        setWarningMessage("입력한 정보를 다시 확인해주세요.");
      } else {
        setWarningMessage(error.message || "비밀번호 찾기 요청 중 문제가 발생했습니다.");
      }

      setButtonState("error");
    }
  };

  useEffect(() => {
    if (id.trim() && email.trim()) {
      setButtonState("active");
    } else {
      setButtonState("default");
      setWarningMessage("");
    }
  }, [id, email]);

  const buttonClass =
    buttonState === "active"
      ? styles.activeButton
      : buttonState === "error"
      ? styles.errorButton
      : styles.defaultButton;

  return (
    <div className={styles.formContainer}>
      <img
        src="/backButton.png"
        alt="Back Button"
        className={styles.backButton}
        onClick={handleBackButtonClick}
      />
      <div className={styles.logoBox}>
        <img src="/LearnAIbleLogo2.png" alt="LearnAIble Logo" className={styles.logo} />
      </div>
      <h1 className={styles.title}>Forgot Password</h1>
      <div className={styles.splitContainer}>
        <div className={styles.leftSection}>
          <p>아이디 찾기</p>
          <div className={styles.leftLine}></div>
        </div>
        <div className={styles.rightSection}>
          <p>비밀번호 찾기</p>
          <div className={styles.rightLine}></div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setWarningMessage("");
            }}
            className={styles.inputField}
          />
          <div className={styles.underline}></div>
        </div>
        <div className={styles.emailWrapper}>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setWarningMessage("");
              }}
              className={styles.inputField}
            />
            <div className={styles.underline}></div>
          </div>
        </div>
      </div>
      <div className={styles.warningContainer}>
        {warningMessage && (
          <>
            <img src="/errorIcon.png" alt="Error Icon" className={styles.errorIcon} />
            <p className={styles.warningText}>{warningMessage}</p>
          </>
        )}
      </div>
      <button
        className={`${styles.findPasswordButton} ${buttonClass}`}
        onClick={handleSubmit}
        disabled={buttonState === "default"}
      >
        Find Password
      </button>
    </div>
  );
};

export default PasswordRecovery;
