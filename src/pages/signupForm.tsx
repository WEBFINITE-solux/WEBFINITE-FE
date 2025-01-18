import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signupForm.module.css";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    email: "",
  });

  const [idStatus, setIdStatus] = useState<"none" | "valid" | "invalid" | "unchecked" | "checking">("none");
  const [nicknameStatus, setNicknameStatus] = useState<"none" | "valid" | "invalid" | "unchecked" | "checking">("none");
  const [passwordError, setPasswordError] = useState<"none" | "mismatch" | "correct">("none");
  const [emailError, setEmailError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const hasError =
      idStatus === "invalid" ||
      nicknameStatus === "invalid" ||
      passwordError === "mismatch" ||
      emailError !== "" ||
      idStatus === "unchecked" ||
      nicknameStatus === "unchecked";

    const isFormValid =
      idStatus === "valid" &&
      nicknameStatus === "valid" &&
      passwordError === "correct" &&
      emailError === "" &&
      form.email.trim() &&
      termsAccepted &&
      !hasError;

      if (idStatus === "checking" || nicknameStatus === "checking") {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(!isFormValid);
      }
    }, [idStatus, nicknameStatus, passwordError, emailError, termsAccepted]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    
      if (name === "id" && idStatus !== "checking") {
        setIdStatus("none");
      }
    
      if (name === "nickname" && nicknameStatus !== "checking") {
        setNicknameStatus("none");
      }
    
      if (name === "password" || name === "confirmPassword") {
        setPasswordError("none");
      }
    
      if (name === "email") {
        setEmailError("");
      }
    };    

  const handleCheckboxChange = () => {
    setTermsAccepted((prevState) => !prevState);
  };

  const handleIdBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (idStatus === "checking") {
      return;
    }
  
    if (!form.id.trim()) {
      setIdStatus("none");
    } else if (idStatus !== "valid" && idStatus !== "invalid") {
      setIdStatus("unchecked");
    }
  };
  
  const handleIdCheck = () => {
    if (!form.id.trim()) {
      setIdStatus("none");
      return;
    }
  
    setIdStatus("checking");
    const mockApiResponse = true;
    setTimeout(() => {
      setIdStatus(mockApiResponse ? "valid" : "invalid");
    },);
  };
  const handleIdFocus = () => {
    setIdStatus("none");
  };

  const handleNicknameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (nicknameStatus === "checking") {
      return;
    }
  
    if (!form.nickname.trim()) {
      setNicknameStatus("none");
    } else if (nicknameStatus !== "valid" && nicknameStatus !== "invalid") {
      setNicknameStatus("unchecked");
    }
  };
  

  const handleNicknameCheck = () => {
    if (!form.nickname.trim()) {
      setNicknameStatus("none");
      return;
    }
  
    setNicknameStatus("checking");
    const mockApiResponse = true;
    setTimeout(() => {
      setNicknameStatus(mockApiResponse ? "valid" : "invalid");
    },);
  };

  const handleNicknameFocus = () => {
    setNicknameStatus("none");
  };

  const handlePasswordBlur = () => {
    if (!form.password.trim() || !form.confirmPassword.trim()) {
      setPasswordError("none");
    } else if (form.password !== form.confirmPassword) {
      setPasswordError("mismatch");
    } else {
      setPasswordError("correct");
    }
  };
  

  const handlePasswordFocus = () => {
    setPasswordError("none");
  };  

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      setEmailError("");
    } else if (!emailRegex.test(form.email)) {
      setEmailError("올바른 메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isButtonDisabled) {
      console.log("회원가입 데이터", form);
  
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
  
        if (response.ok) {
          console.log("회원가입 성공");
          navigate("/");
        } else {
          console.error("회원가입 실패");
        }
      } catch (error) {
        console.error("회원가입 요청 에러:", error);
      }
    }
  };  

  return (
    <div className={styles.formContainer}>
      <img
        src="backButton.png"
        alt="Back Button"
        className={styles.backButton}
        onClick={() => navigate("/mainPage")}
      />

      <h2 className={styles.title}>Create your account</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>ID</label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              onBlur={handleIdBlur}
              onFocus={handleIdFocus}
            />
            <button
              type="button"
              className={styles.duplicateButton}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleIdCheck}
            >
              <span>중복확인</span>
              <img
                src={idStatus === "invalid" || idStatus === "unchecked" ? "xButton.png" : "checkButton.png"}
                alt={idStatus === "invalid" || idStatus === "unchecked" ? "X 버튼" : "체크 버튼"}
              />
            </button>
          </div>
          <div className={styles.messageContainer}>
            {idStatus === "checking" && <span></span>}
            {idStatus === "none" && <span className={styles.invalidMessage}></span>}
            {idStatus === "unchecked" && <span className={styles.invalidMessage}>아이디 중복을 확인해주세요.</span>}
            {idStatus === "valid" && <span className={styles.validMessage}>사용할 수 있는 아이디입니다.</span>}
            {idStatus === "invalid" && <span className={styles.invalidMessage}>사용할 수 없는 아이디입니다.</span>}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Password</label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handlePasswordBlur}
              onFocus={handlePasswordFocus}
            />
          </div>
          <div className={styles.messageContainer}></div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Password</label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handlePasswordBlur}
              onFocus={handlePasswordFocus}
              disabled={!form.password.trim()}
            />
          </div>
            <div className={styles.messageContainer}>
              {passwordError === "mismatch" && (
                <span className={styles.invalidMessage}>비밀번호가 일치하지 않습니다.</span>
              )}
              {passwordError === "correct" && (
                <span className={styles.validMessage}></span>
              )}
          </div>

        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Nickname</label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="text"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              onBlur={handleNicknameBlur}
              onFocus={handleNicknameFocus}
            />
            <button
              type="button"
              className={styles.duplicateButton}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleNicknameCheck}
            >
              <span>중복확인</span>
              <img
                src={nicknameStatus === "invalid" || nicknameStatus === "unchecked" ? "xButton.png" : "checkButton.png"}
                alt={nicknameStatus === "invalid" || nicknameStatus === "unchecked" ? "X 버튼" : "체크 버튼"}
              />
            </button>
          </div>
          <div className={styles.messageContainer}>
            {nicknameStatus === "checking" && <span></span>}
            {nicknameStatus === "none" && <span className={styles.invalidMessage}></span>}
            {nicknameStatus === "unchecked" && <span className={styles.invalidMessage}>닉네임 중복을 확인해주세요.</span>}
            {nicknameStatus === "valid" && <span className={styles.validMessage}>사용할 수 있는 닉네임입니다.</span>}
            {nicknameStatus === "invalid" && <span className={styles.invalidMessage}>사용할 수 없는 닉네임입니다.</span>}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>E-mail</label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
            />
          </div>
          <div className={styles.messageContainer}>
            {emailError && <span className={styles.invalidMessage}>{emailError}</span>}
          </div>
        </div>

        <div className={styles.terms}>
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <label htmlFor="terms">이용약관에 대한 동의가 필요해요.</label>
        </div>
        <button
          type="submit"
          className={styles.createButton}
          style={{
            backgroundColor:
              idStatus === "checking" || nicknameStatus === "checking"
                ? "#C9CEFF"
                : idStatus === "invalid" ||
                  idStatus === "unchecked" ||
                  nicknameStatus === "invalid" ||
                  nicknameStatus === "unchecked" ||
                  passwordError === "mismatch" ||
                  emailError
                ? "#FFC3C3"
                : isButtonDisabled
                ? "#C9CEFF"
                : "#2d41ff", 
          }}
          
          disabled={isButtonDisabled}
        >
          Create
        </button>

      </form>
    </div>
  );
};

export default SignupForm;