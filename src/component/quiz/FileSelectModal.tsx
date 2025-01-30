import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import token from "../token";

interface FileData {
  file_id: number;
  original_filename: string;
  is_summarized: boolean;
}

interface FileSelectModalProps {
  courseId: number;
  onClose: () => void;
  onSelect: (file: FileData) => void;
}

const FileSelectModal: React.FC<FileSelectModalProps> = ({ courseId, onClose }) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("✅ courseId 값 확인:", courseId);
    const fetchFiles = async () => {
      try {
        const response = await token.get(`/course/file/${courseId}`);
        setFiles(response.data.files || []);
      } catch (error) {
        console.error("🚨 강의 자료 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchFiles();
  }, [courseId]);

  const handleFileClick = (file: FileData) => {
    setSelectedFileId(file.file_id);
    console.log("✅ 선택된 파일 ID:", file.file_id);
    navigate(`/quiz/create/choose`, { state: { courseId, fileId: file.file_id } });
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          강의 자료 선택
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>
          {loading ? (
            <Message>📂 강의 자료를 불러오는 중...</Message>
          ) : (
            files.map((file) => (
              <FileItem
                key={file.file_id}
                onClick={() => handleFileClick(file)}
                selected={file.file_id === selectedFileId}
              >
                {file.original_filename} {file.is_summarized ? "(요약 완료)" : "(요약 없음)"}
              </FileItem>
            ))
          )}
        </Content>
      </Modal>
    </Overlay>
  );
};

export default FileSelectModal;



const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 500px;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }
`;

const FileItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "#fff")};
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#e0e0e0" : "#f9f9f9")};
  }
`;

const Message= styled.div`
  font-size: 14px;
  color: #666;
`;
