import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type CourseAddProps = {
  onBackToList: () => void;
};

const CourseAdd: React.FC<CourseAddProps> = ({ onBackToList }) => {
  const [courseName, setCourseName] = useState("");
  const [startHour, setStartHour] = useState("10");
  const [startMinute, setStartMinute] = useState("00");
  const [startAmPm, setStartAmPm] = useState("AM");
  const [endHour, setEndHour] = useState("11");
  const [endMinute, setEndMinute] = useState("15");
  const [endAmPm, setEndAmPm] = useState("AM");
  const [days, setDays] = useState<string[]>([]); 
  const [location, setLocation] = useState("");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setIsOptionsOpen(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    alert(`강의가 추가되었습니다!`);
    onBackToList();
  };

  const handleDayChange = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day)); 
    } else {
      setDays([...days, day]); 
    }
  };

  const generateHourOptions = () =>
    Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const generateMinuteOptions = () =>
    Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  return (
    <Container>
      <Header>
        <Title>나의 강의 목록</Title>
        <OptionsContainer ref={optionsRef}>
          <OptionsButton onClick={toggleOptions}>⋮</OptionsButton>
          {isOptionsOpen && (
            <OptionsMenu>
              <OptionItem onClick={handleAddClick}>
                <OptionLogo src="/add.png" />
                <OptionContent>추가하기</OptionContent>
              </OptionItem>
              <OptionItem onClick={() => alert("강의 삭제하기")}>
                <OptionLogo src="/delete.png" />
                <OptionContent>삭제하기</OptionContent>
              </OptionItem>
            </OptionsMenu>
          )}
        </OptionsContainer>
      </Header>
      <Component>
        <ContainerHeader>
          <ContainerTitle>강의 추가</ContainerTitle>
        </ContainerHeader>
        <Form>
          <FormTitle>강의명</FormTitle>
          <Input
            placeholder="강의명을 입력하세요."
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <FormTitle>시간</FormTitle>
          <TimePickerContainer>
            <TimeSelect
              value={startAmPm}
              onChange={(e) => setStartAmPm(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </TimeSelect>
            <TimeSelect
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            >
              {generateHourOptions().map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </TimeSelect>
            <TimeSelect
              value={startMinute}
              onChange={(e) => setStartMinute(e.target.value)}
            >
              {generateMinuteOptions().map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </TimeSelect>
            <span>~</span>
            <TimeSelect
              value={endAmPm}
              onChange={(e) => setEndAmPm(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </TimeSelect>
            <TimeSelect
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            >
              {generateHourOptions().map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </TimeSelect>
            <TimeSelect
              value={endMinute}
              onChange={(e) => setEndMinute(e.target.value)}
            >
              {generateMinuteOptions().map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </TimeSelect>
          </TimePickerContainer>
          <FormTitle>요일</FormTitle>
          <DayCheckboxContainer>
            {[
              "월요일",
              "화요일",
              "수요일",
              "목요일",
              "금요일",
              "토요일",
              "일요일",
            ].map((day) => (
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
            placeholder="강의실을 입력하세요."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
  margin-top: -25px;
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
const Component = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  padding: 18px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;
const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: bold;
`;

const OptionsContainer = styled.div`
  position: relative;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #656565;
  cursor: pointer;
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 72px;
  right: -10px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 287px;
  height: 124px;
  flex-shrink: 0;
`;

const OptionItem = styled.div`
  padding: 14px 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #f1f3f5;
  }
`;

const OptionContent = styled.div`
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const OptionLogo = styled.img`
  width: 35.602px;
  height: 35.602px;
  flex-shrink: 0;
`;

const ContainerHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
`;
const ContainerTitle = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const FormTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
  appearance: none;
`;

const DayCheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const DayCheckbox = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
  }

  label {
    font-family: Pretendard;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 110px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 28.858px;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  cursor: pointer;
  margin-left: 200px;
  margin-top: 17px;

  &:hover {
    background-color: #f1f3f5;
  }
`;
