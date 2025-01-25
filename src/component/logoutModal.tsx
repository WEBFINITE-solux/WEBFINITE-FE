import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/logoutModal.module.css";
import { logoutUser } from "../services/authService"; 

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken"); 
    if (!accessToken) {
      alert("로그인 정보가 없습니다.");
      navigate("/login");
      return;
    }

    try {
      const result = await logoutUser(accessToken); 
      console.log(result.message); 
      localStorage.removeItem("accessToken");
      navigate("/"); 
    } catch (error: any) {
      console.error(error.message);
      alert(error.message); 
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
          <button className={styles.confirmButton} onClick={handleLogout}>
            로그아웃 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;