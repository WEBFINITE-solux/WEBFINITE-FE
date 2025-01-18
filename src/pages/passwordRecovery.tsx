import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/passwordRecovery.module.css';

const PasswordRecovery: React.FC = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/loginForm');
    };

    const handleSubmit = () => {
        // Add submit logic here
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
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="ID" 
                        className={styles.inputField}
                    />
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.emailWrapper}>
                    <div className={styles.inputWrapper} style={{ flex: 1 }}>
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            className={styles.inputField}
                        />
                        <div className={styles.underline}></div>
                    </div>
                    <button className={styles.emailButton}>인증 메일 발송</button>
                </div>
            </div>
            <div className={styles.warningContainer}>
                <p className={styles.warningText}></p>
            </div>
            <button className={styles.findPasswordButton} onClick={handleSubmit}>Find Password</button>
        </div>
    );
};

export default PasswordRecovery;