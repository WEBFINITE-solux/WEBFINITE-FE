import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일
import "./../styles/aiPlan.css";

const AiPlan: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(""); // 선택된 강의 자료
  const [materials, setMaterials] = useState([
    { id: 1, name: "강의 1", range: ["1-1", "1-2", "1-3"] },
    { id: 2, name: "선형대수", range: ["2-1", "2-2", "2-3", "2-4"] },
    { id: 3, name: "강의 3", range: ["3-1", "3-2"] },
    { id: 4, name: "강의 4", range: ["4-1", "4-2", "4-3", "4-4", "4-5"] },
    { id: 5, name: "강의 5", range: ["5-1", "5-2", "5-3"] },
  ]); // 더미 데이터
  const [showPopup, setShowPopup] = useState(false); // 팝업창 표시 여부
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startUnit, setStartUnit] = useState("");
  const [endUnit, setEndUnit] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleMaterialSelection = (material: string) => {
    setSelectedMaterial(material);
    //setShowPopup(false);
  };
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(), // 시작 날짜 초기값
      endDate: new Date(), // 종료 날짜 초기값
      key: "selection",
    },
  ]);

  const handleDateRangeChange = (ranges: any) => {
    setDateRange([ranges.selection]); // 날짜 범위 업데이트
  };

  const selectedMaterialRange =
    materials.find((m) => m.name === selectedMaterial)?.range || [];

  return (
    <div className="ai-plan">

      <p>학습계획 정보 입력</p>

      {/* 강의 자료 선택 */}
      <div className="section">
        <label>강의 자료 선택하러 가기</label>
        <div className="material-selection">
          <input style={{width:"500px"}}
            type="text"
            value={selectedMaterial || "강의 자료 선택하러 가기"}
            readOnly
            onClick={() => setShowPopup(true)} // 팝업 열기
          />
        </div>
      </div>

      {/* 팝업창 */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>나의 강의 목록</p>
            <div style={{overflowY:'auto', height:'400px'}}>
              <ul>
                {materials.map((material) => (
                  <li
                    key={material.id}
                    onClick={() => handleMaterialSelection(material.name)}
                    className="popup-item"
                  >
                    {material.name}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
      {showWarning && (
        <div className="popup">
          <button onClick={() => setShowWarning(false)}>닫기</button>
        </div>
      )}


      <div style={{display:"flex", gap:'50px'}}>
        {/* 기간 선택 */}
        <div className="section">
      <label>기간</label>
      <div className="date-selection" onClick={() => setShowCalendar(true)}>
        {/* 선택된 날짜 표시 */}
        <div className="date-display">
          {dateRange[0].startDate.toLocaleDateString()} ~{" "}
          {dateRange[0].endDate.toLocaleDateString()}
        </div>
      </div>

      {/* 달력 표시 */}
      {showCalendar && (
        <div className="calendar-container">
          <DateRangePicker
            ranges={dateRange}
            onChange={handleDateRangeChange}
            months={2} // 두 개의 달력 표시
            direction="horizontal" // 가로로 정렬
            showDateDisplay={false} // 상단 날짜 표시 숨김
          />
          <button
            className="calendar-close"
            onClick={() => setShowCalendar(false)}
          >
            선택 완료
          </button>
        </div>
      )}
    </div>

        {/* 범위 선택 */}
        <div className="section">
          <label>범위</label>
          <div className="range-selection">
            <select
              value={startUnit}
              onChange={(e) => setStartUnit(e.target.value)}
              disabled={!selectedMaterial}
            >
              <option value="" disabled>
                시작 범위
              </option>
              {selectedMaterialRange.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <span>~</span>
            <select
              value={endUnit}
              onChange={(e) => setEndUnit(e.target.value)}
              disabled={!selectedMaterial}
            >
              <option value="" disabled>
                종료 범위
              </option>
              {selectedMaterialRange.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 상세 요구 사항 */}
      <div className="section">
        <label>상세 요구 사항</label>
        <textarea
          placeholder="ex) 해당 파일에 대한 학습계획을 세워라. 기간은 ㅇ/ㅇ ~ ㅇ/ㅇ 이고, 범위는 ~부터 ~까지이다."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
      </div>

      {/* 생성 버튼 */}
      <div className="footer">
        <button onClick={() => setShowWarning(true)}>생성하기</button>
      </div>
    </div>
  );
};

export default AiPlan;
