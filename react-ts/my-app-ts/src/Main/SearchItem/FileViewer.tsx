import React from 'react';

// fileが画像ファイルかどうかを判定する関数
const isImageFile = (file: string) => {
  // fileの拡張子を取得する
  const ext = file.split('.').pop()?.toLowerCase();
  // 画像ファイルの拡張子の配列を定義する
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  // fileの拡張子が画像ファイルの拡張子の配列に含まれるかどうかを返す
  return imageExts.includes(ext ?? '');
};

// fileを表示するコンポーネント
const FileViewer: React.FC<{ file: string }> = ({ file }) => {
  // fileが画像ファイルかどうかを判定する
  const isImage = isImageFile(file);
  // fileをBlobオブジェクトに変換する
  const blob = new Blob([file], { type: 'application/octet-stream' });
  // Blobオブジェクトから一時的なURLを生成する
  const url = URL.createObjectURL(blob);
  // fileが画像ファイルであれば、imgタグで表示する
  if (isImage) {
    return <img src={url} alt="アップロードされたファイル" style={{ width: '80%', height: 'auto' }} />;
  }
  // fileが画像ファイルでなければ、iframeタグで表示する
  return <iframe src={url} style={{ width: '80%', height: '600px' }} />;
};

export default FileViewer;
