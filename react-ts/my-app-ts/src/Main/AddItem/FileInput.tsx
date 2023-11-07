import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      onChange(selectedFile);
    }
  };

  return (
    <input
      type="file"
      accept=".pdf,.doc,.docx,.txt"
      onChange={handleFileChange}
    />
  );
}

export default FileInput;
