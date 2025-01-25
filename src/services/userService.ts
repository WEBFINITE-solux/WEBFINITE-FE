export const loginUser = async (requestData: { loginUserId: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:8080/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "로그인 요청 실패");
        } else {
          throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
  
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        throw new Error("서버에서 예상치 못한 형식의 응답이 도착했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      throw error;
    }
  };  