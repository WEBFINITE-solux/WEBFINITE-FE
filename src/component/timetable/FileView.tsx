import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import token from "../token";

type FileData = {
  file_id: number;
  original_filename: string;
  is_summarized: boolean;
};

const FileView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError("유효한 강의 ID가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await token.get(`/course/file/${courseId}`);
        console.log(`📌 [${courseId}] 강의 자료 목록 응답:`, response.data);
        setFiles(response.data.files || []);
      } catch (err: any) {
        console.error("📌 강의 자료 목록 불러오기 오류:", err);
        setError(err.response?.data?.message || "강의 자료를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [courseId]);

  const handleSummary = async (fileId: number) => {
    console.log(`📌 파일 ID ${fileId} 요약 요청`);
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.file_id === fileId ? { ...file, is_summarized: true } : file
      )
    );
  };

  const handleFileDelete = (fileId: number) => {
    console.log(`📌 파일 ID ${fileId} 삭제 요청`);
    setFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
  };

  const getFileLogo = (filename: string) => {
    if (filename.endsWith(".pdf")) return "/pdfLogo.svg";
    if (filename.endsWith(".txt")) return "/txtLogo.svg";
    return "/fileDefault.svg";
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/timetable")}>{"<"}</BackButton>
        <Title>강의 자료 열람</Title>
      </Header>

      {loading ? (
        <Message>📂 강의 자료를 불러오는 중...</Message>
      ) : error ? (
        <Message>⚠️ {error}</Message>
      ) : files.length === 0 ? (
        <Message>📌 등록된 강의 자료가 없습니다.</Message>
      ) : (
        <FileList>
          {files.map((file) => (
            <FileItem key={file.file_id}>
              <FileIcon src={getFileLogo(file.original_filename)} alt="파일 아이콘" />
              <FileInfo>
                <FileName>{file.original_filename}</FileName>
              </FileInfo>
              <DeleteButton onClick={() => handleFileDelete(file.file_id)}>
                <DeleteLogo src="/deleteLogo.svg" />
              </DeleteButton>
              {file.is_summarized ? (
                <SummaryButton onClick={() => navigate(`/summary/${file.file_id}`)}>
                  자료보기
                </SummaryButton>
              ) : (
                <SummaryButton onClick={() => handleSummary(file.file_id)}>
                  요약하기 →
                </SummaryButton>
              )}
            </FileItem>
          ))}
        </FileList>
      )}
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
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const DeleteLogo = styled.img`
  width: 14px;
  height: 16px;
`;

const SummaryButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #007BFF;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  &:hover {
    background-color: #007BFF;
    color: white;
  }
`;

const Message = styled.div`
  font-size: 14px;
  color: #656565;
  text-align: center;
  padding: 20px;
`;
