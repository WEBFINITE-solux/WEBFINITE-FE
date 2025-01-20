import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/passwordAlert.module.css';

const PasswordAlert: React.FC<{ userId: string; userPassword: string }> = ({ userId, userPassword }) => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/passwordRecovery');
    };

    const handleLogInButtonClick = () => {
        navigate('/loginForm');
    };

    return (
        <div className={styles.formContainer}>
            <img
                src="/backButton.png"
                alt="Back Button"
                className={styles.backButton}
                onClick={handleBackButtonClick}
            />
            <div className={styles.logoBox}>
                <img
                    src="/LearnAIbleLogo2.png"
                    alt="LearnAIble Logo"
                    className={styles.logo}
                />
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
            <div className={styles.messageBox}>
                <img
                    src="/lockerIcon.png"
                    alt="Locker Icon"
                    className={styles.lockerIcon}
                />
                <p className={styles.messageText}>
                    <span className={styles.boldText}>{userId}</span>
                    님의 패스워드는 <span className={styles.highlightText}>{userPassword}</span> 입니다.
                </p>
            </div>
            <div className={styles.infoBox}>
                <p className={styles.infoText}>로그인 창으로 이동해주세요.</p>
            </div>
            <button className={styles.loginButton} onClick={handleLogInButtonClick}>
                Log in
            </button>
        </div>
    );
};

export default PasswordAlert;