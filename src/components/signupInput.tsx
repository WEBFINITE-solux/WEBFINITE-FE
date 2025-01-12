import React from 'react';

interface SignupInputProps {
  label: string;               // 입력 필드 레이블
  type: string;                // 입력 타입 (text, password, email 등)
  name: string;                // 입력 필드의 name 속성
  value: string;               // 입력값
  placeholder?: string;        // 입력 필드 placeholder (선택사항)
  error?: string;              // 에러 메시지 (선택사항)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 변경 핸들러
}

const SignupInput: React.FC<SignupInputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '8px',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      {error && (
        <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default SignupInput;
