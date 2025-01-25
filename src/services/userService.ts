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
  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.message || "회원가입 요청 실패");
    }
  
    return result;
  };
  