// FileViewer.tsx

import React from 'react';

// ファイルの種類を返す関数
const getFileType = (file: string) => {
  // メタデータを取得する
  const metadata = file.slice(0, file.indexOf(';'));
  // メタデータからファイルの種類を抽出する
  const fileType = metadata.slice(metadata.indexOf('/') + 1);
  // ファイルの種類を返す
  return fileType;
};

// ファイルを表示するコンポーネント
interface FileViewerProps {
  file: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  // ファイルの種類を取得する
  const fileType = getFileType(file);
  // ファイルの種類に応じて表示するコンポーネントを返す
  switch (fileType) {
    case 'jpeg':
      return (
        <img
          src={`data:image/jpeg;base64,${file}`}
          alt="アップロードされたファイル"
          style={{ width: '80%', height: 'auto' }}
        />
      );
    case 'pdf':
      return (
        <embed
          type="application/pdf"
          src={`data:application/pdf;base64,${file}`}
          style={{ width: '80%', height: 'auto' }}
        />
      );
    default:
      return <p>サポートされていないファイル形式です</p>;
  }
};

export default FileViewer;
