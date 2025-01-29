import React from "react";

interface RateData {
  user_id: number;
  attend_id: number;
  login_id: number;
  login_time?: string;
  logout_time?: string;
}

interface LearningProgressProps {
  data: {
    message: string;
    code: number;
    rate: RateData[];
  };
}

const LearningProgress: React.FC<LearningProgressProps> = ({ data }) => {
  const { rate } = data;

  // 요일 및 시간대 초기화
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`); // 2시간 간격으로 표시

  // 요일과 시간대별 활성화 상태 저장
  const timeMap: Record<string, Record<number, boolean>> = {};
  days.forEach((day) => {
    timeMap[day] = {};
    hours.forEach((_, hour) => {
      timeMap[day][hour] = false;
    });
  });

  // 데이터 처리: 활성화된 시간대 업데이트
  rate.forEach(({ login_time, logout_time }) => {
    if (login_time && logout_time) {
      const login = new Date(login_time);
      const logout = new Date(logout_time);

      const loginDay = days[login.getDay()];
      const logoutDay = days[logout.getDay()];
      const loginHour = login.getHours();
      const logoutHour = logout.getHours();

      if (loginDay === logoutDay) {
        for (let hour = Math.floor(loginHour / 2); hour <= Math.floor(logoutHour / 2); hour++) {
          timeMap[loginDay][hour] = true;
        }
      }
    }
  });

  // 렌더링
  return (
    <div style={{ width: "100%", height: "100%", fontFamily: "Arial, sans-serif", padding: "10px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontWeight: "bold", fontSize: "8px" }}>Per week</span>
        <span style={{ fontSize: "6px", color: "#6B7280" }}>Last 7 days</span>
      </div>
      <div style={{ display: "flex", height: "100%" }}>
        {/* 시간대 표시 */}
        <div style={{ marginRight: "10px", flexShrink: 0 }}>
          {hours.map((hour, index) => (
            <div
              key={index}
              style={{
                height: "calc(100% / 12)", // 12칸으로 나누기
                textAlign: "right",
                fontSize: "10px",
                color: "#6B7280",
                lineHeight: "calc(100% / 12)",
              }}
            >
              {hour}
            </div>
          ))}
        </div>
        {/* Heatmap */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: `repeat(${days.length}, 1fr)`, gap: "5px", height: "100%" }}>
          {days.map((day) => (
            <div
              key={day}
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontWeight: day === "THU" ? "bold" : "normal",
                color: day === "THU" ? "#2D41FF" : "#374151",
                paddingBottom: "0px",
                marginBottom: "0px"
              }}
            >
              {day}
            </div>
          ))}
          {hours.map((_, hourIndex) =>
            days.map((day) => (
              <div
                key={`${day}-${hourIndex}`}
                style={{
                  width: "100%",
                  height: "calc(100%*1.2)", // 12칸으로 나누기
                  backgroundColor: timeMap[day][hourIndex] ? "#2D41FF" : "#E0E0E0",
                  borderRadius: "2px",
                }}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
