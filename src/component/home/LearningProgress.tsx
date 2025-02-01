import React, { useEffect, useState } from "react";

interface AttendanceData {
  loginId: number;
  attendId: number;
  loginTime: string;
  logoutTime: string | null;
}

interface DayAttendance {
  [hour: number]: boolean;
}

const LearningProgress: React.FC<{ userId: number }> = ({ userId }) => {
  const [attendance, setAttendance] = useState<AttendanceData[]>([]);
  console.log(attendance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // 최근 7일 데이터 관리
  const [weekData, setWeekData] = useState<{ [day: string]: DayAttendance }>(
    {}
  );

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://d291-58-29-179-25.ngrok-free.app/attend/login/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP 오류 발생: ${response.status}`);
        }

        const data: AttendanceData[] = await response.json();
        setAttendance(data);
        processAttendanceData(data);
      } catch (err) {
        setError("출석 데이터를 가져오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [userId]);

  const processAttendanceData = (data: AttendanceData[]) => {
    const weekMap: { [day: string]: DayAttendance } = {};

    // 최근 7일 기준
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const dayKey = daysOfWeek[day.getDay()];
      weekMap[dayKey] = {};
    }

    data.forEach((record) => {
      const loginDate = new Date(record.loginTime);
      const logoutDate = record.logoutTime ? new Date(record.logoutTime) : null;
      const dayKey = daysOfWeek[loginDate.getDay()];

      if (!weekMap[dayKey]) weekMap[dayKey] = {};

      const startHour = loginDate.getHours();
      const endHour = logoutDate ? logoutDate.getHours() : startHour + 1;

      for (let hour = startHour; hour <= endHour; hour++) {
        // 3시간 단위로 매핑 (예: 0AM-3AM → 0AM 블록)
        const blockHour = Math.floor(hour / 3) * 3;
        weekMap[dayKey][blockHour] = true;
      }
    });

    setWeekData(weekMap);
  };

  // 3시간 간격으로 시간 배열 생성 (0, 3, 6, ..., 21)
  const timeLabels = Array.from({ length: 8 }, (_, i) => {
    const hour = i * 3; // 0, 3, 6, ..., 21
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${period}`;
  });

  return (
    <div
      style={{
        textAlign: "center",
        height: "160px",
        width: "330px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            height: "100%",
          }}
        >
          {/* 출석 데이터 표시 영역 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50px repeat(7, 1fr)",
              height: "100%",
            }}
          >
            {/* 시간 레이블 (왼쪽) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {timeLabels.map((time, rowIndex) => (
                <span
                  key={rowIndex}
                  style={{
                    fontSize: "10px",
                    textAlign: "right",
                    paddingRight: "5px",
                    fontFamily: "pretendardR",
                  }}
                >
                  {time}
                </span>
              ))}
            </div>

            {/* 출석 블록 */}
            {daysOfWeek.map((day, colIndex) => (
              <div
                key={colIndex}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                {timeLabels.map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      width: "90%",
                      height: "15px",
                      backgroundColor: weekData[day]?.[rowIndex * 3]
                        ? "blue"
                        : "lightgray",
                      borderRadius: "3px",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* 요일 표시 */}
          <div style={{ display: "flex", marginLeft: "45px" }}>
            {daysOfWeek.map((day, index) => (
              <span
                key={index}
                style={{
                  width: "40px",
                  textAlign: "center",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningProgress;
