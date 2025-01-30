import React, { useState } from "react";
import styled from "styled-components";
import token from "../token"; 
import { useNavigate, useSearchParams } from "react-router-dom";

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

type FileUploadProps = {
  courses: Course[]; 
};

const FileUpload: React.FC<FileUploadProps> = ({ courses }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [searchParams] = useSearchParams();
const courseIdFromURL = searchParams.get("courseId");
const selectedCourse = courses.find(course => String(course.course_id) === courseIdFromURL);
  const navigate = useNavigate();
  console.log("FileUpload에서 받은 courses:", courses); 
  console.log("현재 선택된 강의:", selectedCourse); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) =>
        ["application/pdf", "text/plain"].includes(file.type)
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileUpload = async () => {
    console.log("현재 선택된 강의:", selectedCourse); 
    if (!selectedCourse || !selectedCourse.course_id) {
      alert("선택된 강의가 없습니다.");
      return;
    }
  
    const courseId = Number(selectedCourse.course_id);
    if (isNaN(courseId)) {
      alert("잘못된 강의 ID입니다.");
      return;
    }
  
    if (files.length === 0) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
  
    try {
      console.log(`업로드 요청: /course/file/${courseId}/upload`); 
      const response = await token.post(`/course/file/${courseId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("파일 업로드 성공:", response.data);
      alert(`"${selectedCourse.course_title}" 강의에 파일이 업로드되었습니다.`);
      setFiles([]);
    } catch (error: any) {
      console.error("파일 업로드 오류:", error);
      alert(error.response?.data?.message || "파일 업로드에 실패했습니다.");
    }
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
        <Title>강의 자료 업로드</Title>
      </Header>
      <UploadBox>
        <UploadArea>
          <CloudIcon src="/cloud.svg" alt="Upload" />
          <UploadText>파일을 업로드해주세요.</UploadText>
          <UploadSubtitle>TXT, PDF..</UploadSubtitle>
        </UploadArea>
        <BrowseButton>
          Browse File
          <input type="file" accept="application/pdf,text/plain" multiple onChange={handleFileChange} />
        </BrowseButton>
      </UploadBox>

      <FileList>
        {files.map((file, index) => (
          <FileItem key={index}>
            <FileIcon src={getFileLogo(file.type)} alt={file.type} />
            <FileInfo>
              <FileName>{file.name}</FileName>
              <FileSize>{(file.size / 1024).toFixed(2)}KB</FileSize>
            </FileInfo>
            <DeleteButton onClick={() => handleFileDelete(index)}>
              <DeleteLogo src="/deleteLogo.svg" />
            </DeleteButton>
          </FileItem>
        ))}
      </FileList>

      <UploadButton onClick={handleFileUpload}>업로드</UploadButton>
    </Container>
  );
};

export default FileUpload;


const Container = styled.div`
  width: 400px;
  height : 692px;
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
  margin-left : 80px;
  margin-right :120px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #2D41FF;
  }
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
  height : 126px;
`;

const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloudIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  margin-right : 270px;
`;

const UploadText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #1a1a1a;
  margin-right : 200px;
`;

const UploadSubtitle = styled.div`
  font-size: 12px;
  color: #656565;
  margin-top: 4px;
  margin-right : 270px;
`;
const UploadButton = styled.button`
 position : absolute;
 top : 730px;
`
const BrowseButton = styled.label`
  width: 127px;
  height: 32px;
  flex-shrink: 0;
  padding : 4px;
  display: inline-block;
  border-radius: 10px;
  border: 1.5px solid var(--C6C6C6, #C6C6C6);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  xcolor: var(--6A6A6A, #6A6A6A);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.304px;
  cursor: pointer;
  margin-left : 210px;
  margin-top : -35px;

  input {
    display: none;
  }

  &:hover {
    background:rgb(234, 234, 234);
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
`