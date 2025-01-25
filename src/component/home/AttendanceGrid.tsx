import React from "react";
import "./../../styles/attendanceGrid.css"


interface Attendance {
  user_id: number;
  attend_id: number;
  attend_date: string; // 날짜 문자열
  is_attended: boolean;
  attend_date_cnt: number;
}

interface AttendanceGridProps {
  data: Attendance[]; // 출석 데이터
}

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const AttendanceGrid: React.FC<AttendanceGridProps> = ({ data }) => {
  // 날짜별로 데이터 매핑
  const attendanceMap = new Map();
  data.forEach((record) => {
    const date = new Date(record.attend_date);
    const day = date.getDay(); // 요일 (0: SUN, 1: MON, ...)
    if (!attendanceMap.has(day)) {
      attendanceMap.set(day, []);
    }
    attendanceMap.get(day).push(record);
  });

  return (
    <div className="attendance-grid">
      <div className="grid-container">
        <div className="grid-header">
          {days.map((day) => (
            <div key={day} className="header-item">
              {day}
            </div>
          ))}
        </div>
        <div className="grid-body">
          {days.map((_, dayIndex) => (
            <div key={dayIndex} className="day-column">
              {Array.from({ length: 7 }).map((_, hourIndex) => {
                const attended = attendanceMap.get(dayIndex)?.some(
                  (record: Attendance) => {
                    const recordDate = new Date(record.attend_date);
                    return recordDate.getHours() === hourIndex;
                  }
                );

                return (
                  <div
                    key={hourIndex}
                    className={`grid-item ${attended ? "attended" : ""}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceGrid;
