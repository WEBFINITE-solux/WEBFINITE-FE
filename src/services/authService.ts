export const logoutUser = async (accessToken: string) => {
    const response = await fetch("http://localhost:8080/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ accessToken: `Bearer ${accessToken}` }),
    });
  
    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그아웃 요청 실패");
      } else {
        throw new Error("서버에서 예상치 못한 형식의 응답을 받았습니다.");
      }
    }
  
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: "로그아웃이 성공적으로 처리되었습니다.", code: response.status };
    }
  };
  