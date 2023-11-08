import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onChange: (binaryData: ArrayBuffer | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryData = e.target?.result as ArrayBuffer;
        onChange(binaryData);
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      onChange(null);
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
