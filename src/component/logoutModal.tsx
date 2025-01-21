import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/logoutModal.module.css";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/logoutIcon.png"
          alt="Logout Icon"
          className={styles.icon}
          draggable={false}
        />
        <h2 className={styles.title}>정말 로그아웃 하시겠습니까?</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.confirmButton}
            onClick={() => {
              console.log("로그아웃 완료!");
              navigate("/mainPage");
            }}
          >
            로그아웃 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;