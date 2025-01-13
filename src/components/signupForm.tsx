import React, { useState } from "react";
import styles from "../styles/signupForm.module.css";

const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 데이터", form);
  };

  return (
    <div className={styles.formContainer}>
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
              중복확인
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
              중복확인
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
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">이용약관에 대한 동의가 필요해요.</label>
        </div>
        <button type="submit" className={styles.createButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
