import React, { useState } from "react";
import styled from "styled-components";
import token from "../token";

// 현재 학기를 계산하는 함수
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

type CourseAddProps = {
  onBackToList: () => void;
};

const CourseAdd: React.FC<CourseAddProps> = ({ onBackToList }) => {
  const [courseName, setCourseName] = useState("");
  const [startHour, setStartHour] = useState("10");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("11");
  const [endMinute, setEndMinute] = useState("15");
  const [days, setDays] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const userId = localStorage.getItem("userId");
  const { year, semester } = getCurrentSemester(); 

  const koreanToEnglishDays: Record<string, string> = {
    월: "MON",
    화: "TUE",
    수: "WED",
    목: "THU",
    금: "FRI",
    토: "SAT",
    일: "SUN",
  };

  const handleSubmit = async () => {
    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;

    const newCourse = {
      title: courseName,
      period: `${year}-01-10`,
      year,
      semester,
      color: "#95BAFF",
      day: days.map((day) => koreanToEnglishDays[day]),
      start_time: startTime,
      end_time: endTime,
      location,
    };

    try {
      const response = await token.post(`/course/${userId}/new`, newCourse);
      console.log("강의 추가 응답:", response.data);

      if (response.status === 200) {
        alert(`강의 "${courseName}"가 추가되었습니다!`);
        onBackToList();
      }
    } catch (error: any) {
      console.error("강의 추가 중 오류 발생:", error);
      alert(error.response?.data?.message || "강의 추가에 실패했습니다.");
    }
  };

  const handleDayChange = (day: string) => {
    setDays(
      days.includes(day) ? days.filter((d) => d !== day) : [...days, day]
    );
  };

  return (
    <Container>
      <Header>
        <Title onClick={onBackToList}>나의 강의 목록</Title>
      </Header>
      <Component>
        <ContainerHeader>
          <ContainerTitle>강의 추가</ContainerTitle>
        </ContainerHeader>
        <Form>
          <FormTitle>강의명</FormTitle>
          <Input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="강의명을 입력하세요."
          />

          <FormTitle>시간</FormTitle>
          <TimePickerContainer>
            <TimeSelect
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) =>
                i.toString().padStart(2, "0")
              ).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </TimeSelect>
            :
            <TimeSelect
              value={startMinute}
              onChange={(e) => setStartMinute(e.target.value)}
            >
              {["00", "15", "30", "45"].map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </TimeSelect>
            ~
            <TimeSelect
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) =>
                i.toString().padStart(2, "0")
              ).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </TimeSelect>
            :
            <TimeSelect
              value={endMinute}
              onChange={(e) => setEndMinute(e.target.value)}
            >
              {["00", "15", "30", "45"].map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </TimeSelect>
          </TimePickerContainer>

          <FormTitle>요일</FormTitle>
          <DayCheckboxContainer>
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <DayCheckbox key={day}>
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  checked={days.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                <label htmlFor={day}>{day}</label>
              </DayCheckbox>
            ))}
          </DayCheckboxContainer>

          <FormTitle>위치</FormTitle>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="강의실을 입력하세요."
          />

          <Button onClick={handleSubmit}>추가하기</Button>
        </Form>
      </Component>
    </Container>
  );
};

export default CourseAdd;

const Container = styled.div`
  height: 735px;
  padding: 20px;
  border-radius: 8px;
  background-color: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: none;
  border-radius: 8px 8px 0 0;
`;
const ContainerHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
`;
const ContainerTitle = styled.h2`
  color: #000;
  font-family: pretendardB;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const Title = styled.div`
  font-family: pretendardB;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const Component = styled.div`
  width: 100%;
  height: 100%;
  padding: 18px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormTitle = styled.div`
  font-family: pretendardM;
  font-size: 15px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const TimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeSelect = styled.select`
  width: 60px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  background: #f9f9f9;
`;

const DayCheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DayCheckbox = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
  }
`;

const Button = styled.button`
  width: 110px;
  height: 36px;
  border-radius: 28px;
  background: #2d41ff;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #1b31ff;
  }
`;
