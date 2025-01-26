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
      console.log("로그아웃 성공:", result);

      localStorage.removeItem("accessToken");
      alert(result.message || "로그아웃되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error("로그아웃 실패:", error.message);

      if (error.message.includes("만료")) {
        alert("인증이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else if (error.message.includes("유효하지 않은")) {
        alert("로그아웃 요청이 유효하지 않습니다.");
      } else {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
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