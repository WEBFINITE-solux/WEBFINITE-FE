export const getCurrentSemester = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

  // 1~2월이면 직전 연도, 나머지는 그대로 유지
  const adjustedYear = month === 1 || month === 2 ? year - 1 : year;

  // 학기 결정
  const semester = month >= 3 && month <= 8 ? 1 : 2;

  return { year: adjustedYear, semester };
};
