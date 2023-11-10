import React from 'react';

// Function to render content based on file type
const renderFileContent = (item: any) => {
  switch (item.fileType) {
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg+xml':
      return <img src={item.file} alt="アップロードされた画像" style={{ width: '70%', height: 'auto' }} />;
    case 'pdf':
      return <iframe title="PDF Viewer" src={item.file} style={{ width: '70%', height: '500px' }} />;
    case 'txt':
    case 'msword':
      return <pre>{item.content}</pre>;
    case 'mp3':
      return <audio controls src={item.file} />;
    case 'mp4':
      return <video controls width="70%" height="auto" src={item.file} />;
    case 'vnd.ms-powerpoint':
      return (
        <iframe
          title="PowerPoint Viewer"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.file)}`}
          style={{ width: '70%', height: '500px' }}
        />
      );
    case 'vnd.ms-excel':
      return (
        <iframe
          title="Excel Viewer"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.file)}`}
          style={{ width: '70%', height: '500px' }}
        />
      );
    case '':
      return null;
    default:
      return (
        <a href={item.file} target="_blank" rel="noopener noreferrer">
          ファイルをダウンロード
        </a>
      );
  }
};

export { renderFileContent };
