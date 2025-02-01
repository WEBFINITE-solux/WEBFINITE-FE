export const logoutUser = async (accessToken: string) => {
  try {
    const response = await fetch("https://d291-58-29-179-25.ngrok-free.app/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Request to /logout");
    console.log("Headers:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    });

    const contentType = response.headers.get("Content-Type");
    const rawResponse = await response.text();

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Body:", rawResponse);

    if (!response.ok) {
      if (contentType?.includes("application/json")) {
        const errorData = JSON.parse(rawResponse);
        throw new Error(errorData.message || "로그아웃 요청 실패");
      } else {
        throw new Error("서버에서 예상치 못한 형식의 응답을 받았습니다.");
      }
    }

    if (contentType?.includes("application/json")) {
      return JSON.parse(rawResponse);
    } else {
      return {
        message: "로그아웃이 성공적으로 처리되었습니다.",
        code: response.status,
      };
    }
  } catch (error: any) {
    console.error("로그아웃 요청 중 오류 발생:", error.message);
    throw error;
  }
};
