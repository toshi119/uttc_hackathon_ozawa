// Function to render content based on file type
const renderFileContent = (item: any) => {
  switch (item.fileType) {
    case 'image':
      return <img src={item.file} alt="アップロードされた画像" style={{ width: '70%', height: 'auto', margin: '0 auto' }} />;
    case 'pdf':
      return <iframe title="PDF Viewer" src={item.file} style={{ width: '70%', height: '500px', margin: '0 auto' }} />;
    case 'txt':
    case 'msword':
      return <pre style={{ margin: '0 auto', textAlign: 'center' }}>{item.content}</pre>;
    case 'mp3':
      return <audio controls src={item.file} style={{ margin: '0 auto', display: 'block' }} />;
    case 'mp4':
      return <video controls width="70%" height="auto" src={item.file} style={{ margin: '0 auto', display: 'block' }} />;
    case '':
      return null; // No content to render
    default:
      return (
        <a href={item.file} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center' }}>
          ファイルをダウンロード
        </a>
      );
  }
};

export { renderFileContent };
