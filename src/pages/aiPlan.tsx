import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일
import "./../styles/aiPlan.css";

const AiPlan: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState("강의 자료 선택하러 가기"); // 선택된 강의 자료
  const [materials, setMaterials] = useState([
    { id: 1, name: "강의 1", range: ["1-1", "1-2", "1-3"] },
    { id: 2, name: "선형대수", range: ["2-1", "2-2", "2-3", "2-4"] },
    { id: 3, name: "강의 3", range: ["3-1", "3-2"] },
    { id: 4, name: "강의 4", range: ["4-1", "4-2", "4-3", "4-4", "4-5"] },
    { id: 5, name: "강의 5", range: ["5-1", "5-2", "5-3"] },
  ]); // 더미 데이터
  const [showPopup, setShowPopup] = useState(false); // 팝업창 표시 여부
  const [startUnit, setStartUnit] = useState("");
  const [endUnit, setEndUnit] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleMaterialSelection = (material: string) => {
    setSelectedMaterial(material);
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

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const selectedMaterialRange =
    materials.find((m) => m.name === selectedMaterial)?.range || [];

  return (
    <div className="ai-plan">
      <div className="plan-box">
        <div
          style={{
            paddingTop: "17px",
            paddingBottom: "17px",
            paddingLeft: "35px",
            borderBottom: "1px solid #9A9A9A",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "700" }}>학습계획 정보 입력</p>
        </div>

        {/* 강의 자료 선택 */}
        <div style={{ paddingLeft: "35px", paddingTop: "30px" }}>
          <div className="section">
            <label>강의 자료</label>
            <div
              className="lecture-box"
              style={{ width: "550px", height: "60px", paddingLeft: "25px" }}
              onClick={() => setShowPopup(true)}
            >
              <p style={{ fontSize: "14px" }}>{selectedMaterial}</p>
              <img src="/lectureDataUpload.png" style={{ width: "30px" }} alt="upload" />
            </div>
          </div>

          {/* 팝업창 */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <div style={{ borderBottom: "1px solid #9A9A9A"}}>
                <p style={{fontWeight: "bold", marginLeft:"25px", marginBottom:"10px"}}>나의 강의 목록</p>

                </div>
                
                <div style={{ overflowY: "auto", height: "370px" }}>
                  <ul>
                    {materials.map((material) => (
                      <div onClick={() => handleMaterialSelection(material.name)}
                      className="popup-item">
                        <img src="/lectureListpng.png" style={{height:"40px", marginRight:"15px"}}></img>
                        <li
                          key={material.id}
                          onClick={() => handleMaterialSelection(material.name)}
                          style={{fontWeight:"bold", fontSize:"14px"}}
                        >
                          {material.name}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
                <div style={{display:"flex", flexDirection: "row-reverse", padding:"20px", alignItems: "center"}}>
                  <button onClick={() => setShowPopup(false)} 
                  style={{borderRadius: "28.858px", 
                  background: "#2D41FF", 
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.25)", 
                  color:"white", 
                  fontSize:"14px",
                  height:"35px",
                  width: "110px",
                  }}>
                    선택 완료</button>
                </div>
                
              </div>
            </div>
          )}

          {showWarning && (
            <div className="popup">
              <button onClick={() => setShowWarning(false)}>닫기</button>
            </div>
          )}

          <div style={{ display: "flex", gap: "90px" }}>
            {/* 기간 선택 */}
            <div className="section">
              <label>기간</label>
              <div className="date-selection" onClick={() => setShowCalendar(true)}>
                {/* 선택된 날짜 표시 */}
                <div style={{display:"flex"}}>
                  <div className="period-box">
                    <img src="/calendar.png" style={{ width: "30px" }}/>
                    {formatter.format(dateRange[0].startDate)}
                  </div>
                  <h2 style={{marginLeft:"20px", marginRight:"20px", marginTop:"auto", marginBottom: "auto"}}>~</h2>
                  <div className="period-box">
                    <img src="/calendar.png" style={{ width: "30px" }}/>
                    {formatter.format(dateRange[0].endDate)}
                  </div>
                  
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
                    color="#2D41FF"
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
              <div className="range-selection" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* 시작 범위 */}
                <div className="custom-dropdown">
                  <div className="contents-box">
                    <img src="/file.png" alt="folder" style={{ width: "30px" }} />
                    <span>{startUnit}</span>
                    단원
                  </div>
                  <select
                    value={startUnit}
                    onChange={(e) => setStartUnit(e.target.value)}
                    disabled={!selectedMaterialRange.length}
                  >
                    {selectedMaterialRange.map((range: string) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <h2 style={{ margin: "0 10px" }}>~</h2>

                {/* 종료 범위 */}
                <div className="custom-dropdown">
                  <div className="contents-box">
                    <img src="/file.png" alt="folder" style={{ width: "30px" }} />
                    <span>{endUnit}</span>
                    단원 
                  </div>
                  <select
                    value={endUnit}
                    onChange={(e) => setEndUnit(e.target.value)}
                    disabled={!selectedMaterialRange.length}
                  >
                    {selectedMaterialRange.map((range: string) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 요구 사항 */}
        <div
          style={{
            marginTop: "25px",
            paddingLeft: "35px",
            paddingTop: "40px",
            background: "#F2F2F2",
            paddingBottom: "10px",
            borderBottom: "1px solid #9A9A9A",
            
          }}
        >
          <div className="section">
            <label>상세 요구 사항</label>
            <textarea
              placeholder="학습 기간, 범위 외의 추가적인 요구사항을 적어주세요.
ex) oo 부분을 위주로 계획을 세워라."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              style={{ width: "800px", height: "150px", fontSize: "14px" }}
            />
          </div>
        </div>

        {/* 생성 버튼 */}
        <div className="ai-plan-footer">
          <button className="ai-plan-create-but" onClick={() => setShowWarning(true)}>생성하기</button>
        </div>
      </div>
    </div>
  );
};

export default AiPlan;
