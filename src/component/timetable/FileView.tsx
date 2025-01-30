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
  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);
  const [summarizingFileId, setSummarizingFileId] = useState<number | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError("유효한 강의 ID가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await token.get(`/course/file/${courseId}`);
        setFiles(response.data.files || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "강의 자료를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [courseId]);

  const handleFileDelete = async (fileId: number) => {
    if (!window.confirm("정말로 이 파일을 삭제하시겠습니까?")) return;

    setDeletingFileId(fileId);

    try {
      await token.delete(`/course/file/${fileId}/delete`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
    } catch (err: any) {
      alert(err.response?.data?.message || "파일 삭제에 실패했습니다.");
    } finally {
      setDeletingFileId(null);
    }
  };

  const handleSummary = async (fileId: number) => {
    if (!window.confirm("이 파일의 요약을 생성하시겠습니까?")) return;

    setSummarizingFileId(fileId);

    try {
      await token.post(`/summary/${fileId}/new`);
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file.file_id === fileId ? { ...file, is_summarized: true } : file))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "요약 생성에 실패했습니다.");
    } finally {
      setSummarizingFileId(null);
    }
  };

  const handleViewSummary = async (fileId: number) => {
    setSummary(null);
    setSummaryError(null);

    try {
      const response = await token.get(`/summary/${fileId}`);
      setSummary(response.data.summary_content);
    } catch (err: any) {
      setSummaryError(err.response?.data?.message || "요약 내용을 불러올 수 없습니다.");
    }
  };

  const closePopup = () => {
    setSummary(null);
    setSummaryError(null);
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
              <DeleteButton onClick={() => handleFileDelete(file.file_id)} disabled={deletingFileId === file.file_id}>
                {deletingFileId === file.file_id ? "삭제 중..." : <DeleteLogo src="/deleteLogo.svg" />}
              </DeleteButton>
              {file.is_summarized ? (
                <SummaryButton onClick={() => handleViewSummary(file.file_id)}>자료보기</SummaryButton>
              ) : (
                <SummaryButton onClick={() => handleSummary(file.file_id)} disabled={summarizingFileId === file.file_id}>
                  {summarizingFileId === file.file_id ? "요약 중..." : "요약하기 →"}
                </SummaryButton>
              )}
            </FileItem>
          ))}
        </FileList>
      )}
      {(summary || summaryError) && (
        <Popup onClick={closePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closePopup}>✖</CloseButton>
            {summary ? (
              <>
                <SummayTitle>요약 내용</SummayTitle>
                <SummaryText>{summary}</SummaryText>
              </>
            ) : (
              <>
                <SummayTitle>요약 오류</SummayTitle>
                <SummaryText>{summaryError}</SummaryText>
              </>
            )}
          </PopupContent>
        </Popup>
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
  font-size: 14px;
  color: red;

  &:disabled {
    color: gray;
    cursor: default;
  }
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

  &:disabled {
    color: gray;
    cursor: default;
  }

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

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SummayTitle = styled.h3`
 color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 150%;
margin-bottom : 10px;
`

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const SummaryText = styled.p`
  font-size: 14px;
  text-align: left;
  white-space: pre-line;
`;