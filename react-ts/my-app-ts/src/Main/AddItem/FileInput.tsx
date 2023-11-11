// FileInput.tsx

import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onChange: (file: File | null, fileType: string | null) => void;
  defaultFile?: File | null;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, defaultFile }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const fileTypeSlash = selectedFile.type;
      const fileType = fileTypeSlash.split('/')[1];
      onChange(selectedFile, fileType);
    } else {
      onChange(null, null);
    }
  };

  return (
    <input
      type="file"
      onChange={handleFileChange}
      defaultValue={defaultFile ? defaultFile.name : ''}
    />
  );
}

export default FileInput;
