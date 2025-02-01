import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일
import "./../styles/aiPlan.css";
import "./../styles/study.css";
import { getCurrentSemester } from "../util/getCurrentSemester";
import { useNavigate } from "react-router-dom";

const AiPlan: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [selectedMaterial, setSelectedMaterial] =
    useState("강의 자료 선택하러 가기"); // 선택된 강의 자료
  const [materials, setMaterials] = useState([]); // 서버에서 받아온 데이터
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null); // 선택된 강의의 courseId
  const [selectedCourseFiles, setSelectedCourseFiles] = useState([]); // 선택된 강의의 파일 데이터
  const [selectedFileId, setSelectedFileId] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // 팝업창 표시 여부
  const [startUnit, setStartUnit] = useState("");
  const [endUnit, setEndUnit] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { year, semester } = getCurrentSemester();
        const response = await fetch(
          `https://d291-58-29-179-25.ngrok-free.app/course/${userId}/${year}/${semester}`,
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

        const data = await response.json();
        console.log("받아온 강의 자료:", data);
        setMaterials(data.courses || []);
      } catch (error) {
        console.error("강의 자료를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMaterials();
  }, []);

  const fetchCourseFiles = async (courseId: number) => {
    try {
      const response = await fetch(
        `https://d291-58-29-179-25.ngrok-free.app/course/file/${courseId}`,
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

      const data = await response.json();
      console.log("받아온 파일 데이터:", data);
      setSelectedCourseFiles(data.files || []);
    } catch (error) {
      console.error("파일 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleMaterialSelection = (material: any) => {
    setSelectedMaterial(material.title);
    setSelectedCourseId(material.id); // 선택된 강의의 courseId 저장
    fetchCourseFiles(material.id); // 파일 데이터 가져오기
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

  const selectedMaterialRange = [
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5",
    "1-6",
    "1-7",
    "1-8",
    "1-9",
  ]; // 모든 강의의 범위 고정

  const createPlan = async () => {
    if (!selectedCourseId || !selectedFileId) {
      alert("강의 자료와 파일을 선택하세요.");
      return;
    }

    // 날짜를 YYYY-MM-DD 형식으로 변환
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const bodyData = {
      prompt_text: additionalNotes,
      start_date: formatDate(dateRange[0].startDate), // 시작 날짜를 YYYY-MM-DD로 변환
      end_date: formatDate(dateRange[0].endDate), // 종료 날짜를 YYYY-MM-DD로 변환
      start_unit: startUnit,
      end_unit: endUnit,
      file_id: selectedFileId,
    };

    console.log("생성된 BodyData:", bodyData);

    try {
      const response = await fetch(
        `https://d291-58-29-179-25.ngrok-free.app/plan/${selectedCourseId}/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(bodyData), // JSON 데이터 설정
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류 발생: ${response.status}`);
      }

      const data = await response.json();
      console.log("생성된 학습 계획:", data);
      alert("학습 계획이 성공적으로 생성되었습니다!");
      navigate("/study");
    } catch (error) {
      console.error("학습 계획 생성 중 오류 발생:", error);
    }
  };

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
          <p style={{ fontSize: "20px", fontWeight: "700" }}>
            학습계획 정보 입력
          </p>
        </div>

        {/* 강의 자료 선택 */}
        <div style={{ paddingLeft: "35px", paddingTop: "30px" }}>
          <div className="section">
            <label>강의 자료</label>
            <div
              className="lecture-box"
              style={{ width: "655px", height: "60px", paddingLeft: "25px" }}
              onClick={() => setShowPopup(true)}
            >
              <p style={{ fontSize: "14px" }}>{selectedMaterial}</p>
              <img
                src="/lectureDataUpload.png"
                style={{ width: "30px" }}
                alt="upload"
              />
            </div>
          </div>

          {/* 팝업창 */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <div style={{ borderBottom: "1px solid #9A9A9A" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginLeft: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    나의 강의 목록
                  </p>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    height: selectedCourseFiles.length > 0 ? "200px" : "370px",
                  }}
                >
                  <ul>
                    {materials.map((material: any) => (
                      <div
                        key={material.id}
                        onClick={() => handleMaterialSelection(material)}
                        className="popup-item"
                      >
                        <img
                          src="/lectureListpng.png"
                          style={{ height: "40px", marginRight: "15px" }}
                          alt="lecture"
                        />
                        <li style={{ fontWeight: "bold", fontSize: "14px" }}>
                          {material.title}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>

                {/* 선택된 강의의 파일 목록 */}
                {selectedCourseFiles.length > 0 && (
                  <div style={{ overflowY: "auto", height: "170px" }}>
                    <div
                      style={{
                        borderBottom: "1px solid #9A9A9A",
                        borderTop: "1px solid #9A9A9A",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          marginLeft: "25px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                      >
                        선택된 강의 자료 파일 목록
                      </p>
                    </div>
                    <ul>
                      {selectedCourseFiles.map((file: any) => (
                        <div
                          key={file.file_id}
                          className="popup-item"
                          onClick={() => setSelectedFileId(file.file_id)}
                        >
                          <img
                            src="/lectureListpng.png"
                            style={{ height: "40px", marginRight: "15px" }}
                            alt="lecture"
                          />
                          <li style={{ fontWeight: "bold", fontSize: "14px" }}>
                            {file.original_filename}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    padding: "20px",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setShowPopup(false)}
                    style={{
                      borderRadius: "28.858px",
                      background: "#2D41FF",
                      boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.25)",
                      color: "white",
                      fontSize: "14px",
                      height: "35px",
                      width: "110px",
                    }}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}

          {showWarning && (
            <div className="popup">
              <div className="warging-popup">
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <button
                    onClick={() => setShowWarning(false)}
                    style={{ padding: "0px", backgroundColor: "transparent" }}
                  >
                    <img src="/x.png"></img>
                  </button>
                </div>

                <div style={{ display: "flex" }}>
                  <input type="checkbox"></input>
                  <p style={{ marginLeft: "5px" }}>오늘 하루 보지 않기 </p>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "90px" }}>
            {/* 기간 선택 */}
            <div className="section">
              <label>기간</label>
              <div
                className="date-selection"
                onClick={() => setShowCalendar(true)}
              >
                {/* 선택된 날짜 표시 */}
                <div style={{ display: "flex" }}>
                  <div className="period-box">
                    <img
                      src="/calendar.png"
                      style={{ width: "30px" }}
                      alt="calendar"
                    />
                    {formatter.format(dateRange[0].startDate)}
                  </div>
                  <h2
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    ~
                  </h2>
                  <div className="period-box">
                    <img
                      src="/calendar.png"
                      style={{ width: "30px" }}
                      alt="calendar"
                    />
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
                  />
                  <div className="top-group" style={{ paddingRight: "10px" }}>
                    <div />
                    <div className="button-group">
                      <button
                        className="study-button"
                        onClick={() => setShowCalendar(false)}
                      >
                        취소
                      </button>
                      <button
                        className="study-button"
                        onClick={() => setShowCalendar(false)}
                      >
                        선택완료
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 범위 선택 */}
            <div className="section">
              <label>범위</label>
              <div
                className="range-selection"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {/* 시작 범위 */}
                <div className="custom-dropdown">
                  <div className="contents-box">
                    <img
                      src="/file.png"
                      alt="folder"
                      style={{ width: "30px" }}
                    />
                    <span>{startUnit}</span>
                    단원
                  </div>
                  <select
                    value={startUnit}
                    onChange={(e) => setStartUnit(e.target.value)}
                    disabled={!selectedMaterialRange.length}
                  >
                    <option value="" hidden></option>
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
                    <img
                      src="/file.png"
                      alt="folder"
                      style={{ width: "30px" }}
                    />
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
              style={{ width: "800px", height: "200px", fontSize: "17px" }}
            />
          </div>
        </div>

        {/* 생성 버튼 */}
        <div className="ai-plan-footer">
          <button
            className="study-button"
            onClick={() => {
              setShowWarning(true); // 경고 팝업 표시
              createPlan(); // 학습 계획 생성 함수 호출
            }}
          >
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiPlan;
