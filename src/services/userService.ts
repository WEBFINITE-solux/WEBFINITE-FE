export const signupUser = async (requestData: {
  loginUserId: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  email: string;
}) => {
  const response = await fetch("http://localhost:8080/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return { message: "회원가입이 성공적으로 처리되었습니다.", code: response.status };
  }
};
