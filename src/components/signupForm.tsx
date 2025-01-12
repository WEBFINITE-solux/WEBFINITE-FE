import React, { useState } from "react";
import styles from "../styles/signupForm.module.css";

const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
    nickname: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    password: "",
    nickname: "",
    email: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    validateField(name, value);
  };

  // 필드별 유효성 검사
  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = `${name}을(를) 입력해주세요.`;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => !error) && 
        Object.values(form).every((value) => value.trim())) {
      console.log("회원가입 성공", form);
    } else {
      console.log("유효성 검사 실패", errors);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label>ID</label>
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="아이디를 입력하세요"
        />
        {errors.id && <span className={styles.error}>{errors.id}</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div>
        <label>Nickname</label>
        <input
          type="text"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
        />
        {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
