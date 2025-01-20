import React, { useState } from "react";
import styled from "styled-components";


const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

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

  const getFileLogo = (type: string) => {
    if (type === "application/pdf") return "pdfLogo.svg";
    if (type === "text/plain") return "txtLogo.svg";
    return "";
  };

  return (
    <Container>
      <Header>
        <Title>강의 자료 업로드</Title>
        <CloseButton>×</CloseButton>
      </Header>
      <UploadBox>
        <UploadArea>
          <CloudIcon src="cloud.svg" alt="Upload" />
          <UploadText>파일을 업로드해주세요.</UploadText>
          <UploadSubtitle>TXT,PDF...</UploadSubtitle>
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
            <DeleteButton onClick={() => handleFileDelete(index)}>🗑</DeleteButton>
          </FileItem>
        ))}
      </FileList>
    </Container>
  );
};

export default FileUpload;

const Container = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: Pretendard, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #656565;
  cursor: pointer;
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
`;

const UploadText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #1a1a1a;
`;

const UploadSubtitle = styled.div`
  font-size: 12px;
  color: #656565;
  margin-top: 4px;
`;

const BrowseButton = styled.label`
  display: inline-block;
  margin-top: 12px;
  background: #2d41ff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    background: #1b31ff;
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
  font-size: 16px;
  color: #ff5c5c;
  cursor: pointer;

  &:hover {
    color: #d9534f;
  }
`;
