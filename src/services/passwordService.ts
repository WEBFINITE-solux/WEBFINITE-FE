export const recoverPassword = async (loginUserId: string, email: string) => {
  try {
    const response = await fetch(
      `https://d291-58-29-179-25.ngrok-free.app/user/password?loginUserId=${loginUserId}&email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawResponse = await response.text();

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = JSON.parse(rawResponse);
      if (!response.ok) {
        throw new Error("입력한 정보를 다시 확인해주세요.");
      }
      return jsonResponse;
    } else {
      throw new Error("서버에서 예상치 못한 응답을 받았습니다.");
    }
  } catch (error: any) {
    console.error("비밀번호 찾기 요청 중 오류 발생:", error.message);
    throw new Error("입력한 정보를 다시 확인해주세요.");
  }
};
