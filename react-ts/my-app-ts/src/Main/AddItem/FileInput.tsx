import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onChange: (base64Data: string | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        onChange(base64Data);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      onChange(null);
    }
  };
  
  return (
    <input
      type="file"
      accept=".pdf,.doc,.docx,.txt,.jpg"
      onChange={handleFileChange}
    />
  );
}

export default FileInput;
