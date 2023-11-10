const renderFileContent = (item: any) => {
    switch (item.fileType) {
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg+xml':
        return <img src={item.file} alt="アップロードされた画像" style={{ maxWidth: '100%',width: 'auto', height: '50%', margin: '0 auto' }} />;
      case 'pdf':
        return <iframe title="PDF Viewer" src={item.file} style={{ width: '70%', height: '50%', margin: '0 auto' }} />;
      case 'txt':
      case 'msword':
        return <pre style={{ margin: '0 auto', textAlign: 'center' }}>{item.content}</pre>;
      case 'mp3':
        return <audio controls src={item.file} style={{ margin: '0 auto', display: 'block' }} />;
      case 'mp4':
        return <video controls width="auto" height="50%" src={item.file} style={{ margin: '0 auto', display: 'block' }} />;
      case 'vnd.ms-powerpoint':
      case 'vnd.ms-excel':
        return (
          <iframe
            title={item.fileType === 'vnd.ms-powerpoint' ? 'PowerPoint Viewer' : 'Excel Viewer'}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.file)}`}
            style={{ width: '70%', height: '500px', margin: '0 auto' }}
          />
        );
      case '':
        return null;
      default:
        return (
          <a href={item.file} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center' }}>
            ファイルをダウンロード
          </a>
        );
    }
  };
  
  export { renderFileContent };
  