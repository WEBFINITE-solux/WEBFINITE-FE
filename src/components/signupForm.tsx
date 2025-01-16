import React, { useState } from "react";
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

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setTermsAccepted((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (termsAccepted) {
      console.log("회원가입 데이터", form);
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
            />
            <button
              type="button"
              className={styles.duplicateButton}
              onClick={() => console.log("ID 중복 확인")}
            >
              <span>중복확인</span>
              <img src="checkButton.png" alt="체크버튼" />
            </button>
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
            />
          </div>
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
            />
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
            />
            <button
              type="button"
              className={styles.duplicateButton}
              onClick={() => console.log("닉네임 중복 확인")}
            >
              <span>중복확인</span>
              <img src="checkButton.png" alt="체크버튼" />
            </button>
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
            />
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
          disabled={!termsAccepted}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SignupForm;