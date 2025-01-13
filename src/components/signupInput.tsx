import React from "react";

interface SignupInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          fontWeight: "bold",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {error && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default SignupInput;