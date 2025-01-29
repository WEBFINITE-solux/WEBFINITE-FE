import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Course = {
  course_id: number;
  course_title: string;
  period: string;
  day: string[];
  start_time: string;
  end_time: string;
  location: string;
  color?: string;
  term: string;
};

type CourseListProps = {
  courses: Course[];
};

type FileState = {
  file: File;
  isSummarizing: boolean;
  isSummarized: boolean;
};

const FileView: React.FC<CourseListProps> = ({ courses }) => {
  const [files, setFiles] = useState<FileState[]>(
    [
      new File(["dummy content"], "선형대수.pdf", { type: "application/pdf" }),
      new File(["dummy content"], "선형대수(2).pdf", { type: "application/pdf" }),
      new File(["dummy content"], "선형대수 스크립트.txt", { type: "text/plain" }),
    ].map((file) => ({
      file,
      isSummarizing: false,
      isSummarized: false,
    }))
  );

  const navigate = useNavigate();

  const handleFileDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSummary = (index: number) => {
    setFiles((prevFiles) =>
      prevFiles.map((state, i) =>
        i === index ? { ...state, isSummarizing: true } : state
      )
    );

    setTimeout(() => {
      setFiles((prevFiles) =>
        prevFiles.map((state, i) =>
          i === index
            ? { ...state, isSummarizing: false, isSummarized: true }
            : state
        )
      );
    }, 2000); 
  };

  const getFileLogo = (type: string) => {
    if (type === "application/pdf") return "/pdfLogo.svg";
    if (type === "text/plain") return "/txtLogo.svg";
    return "";
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/timetable")}>{"<"}</BackButton>
        <Title>강의 자료 열람</Title>
      </Header>
      <FileList>
        {files.map((state, index) => (
          <FileItem key={index}>
            <FileIcon src={getFileLogo(state.file.type)} alt={state.file.type} />
            <FileInfo>
              <FileName>{state.file.name}</FileName>
              <FileSize>{(state.file.size / 1024).toFixed(2)}KB</FileSize>
            </FileInfo>
            <DeleteButton onClick={() => handleFileDelete(index)}>
              <DeleteLogo src="/deleteLogo.svg" />
            </DeleteButton>
            {state.isSummarizing ? (
  <SummaryInProgress>
    요약 중입니다...
    <Spinner src="/spinner.svg" alt="Loading" />
  </SummaryInProgress>
) : (
  <SummaryButton
    onClick={() => handleSummary(index)}
    isSummarized={state.isSummarized}
  >
    {state.isSummarized ? "자료보기" : "요약하기 →"}
  </SummaryButton>
)}
          </FileItem>
        ))}
      </FileList>
    </Container>
  );
};

export default FileView;

const Container = styled.div`
  width: 400px;
  height: 692px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: Pretendard, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin-left: 80px;
  margin-right: 120px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #2d41ff;
  }
`;

const FileList = styled.div`
  margin-top: 16px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
`;

const FileIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const FileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FileName = styled.div`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: bold;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: #656565;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const DeleteLogo = styled.img`
  width: 14.769px;
  height: 16px;
  flex-shrink: 0;
`;

const SummaryButton = styled.button<{ isSummarized: boolean }>`
  background-color: #ffffff;
  color: #000000;
  border-radius: 28.858px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  color: #1A1A1A;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; 
    &:hover {
      background-color: rgba(190, 190, 190, 0.5);
  `;

  const SummaryInProgress = styled.div`
  font-size: 13px;
  color: #333;
  font-weight: bold;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 8px;
`;

const Spinner = styled.img`
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

