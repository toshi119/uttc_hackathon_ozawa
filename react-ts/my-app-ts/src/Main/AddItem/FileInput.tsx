// FileInput.tsx
import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      onChange(selectedFile);
    } else {
      onChange(null);
    }
  };
  
  return (
    <input
      type="file"
      onChange={handleFileChange}
    />
  );
}

export default FileInput;
