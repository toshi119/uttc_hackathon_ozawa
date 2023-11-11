
const renderFileContent = (item: any) => {
    switch (item.fileType) {
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg+xml':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={item.file} alt="アップロードされた画像" style={{ height: '75%', width: 'auto', margin: '0 auto' }} />
          </div>
        );
      case 'pdf':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <iframe title="PDF Viewer" src={item.file} style={{ width: '80%', height: '85%', margin: '0 auto' }} />
          </div>
        );
      case 'txt':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <pre style={{ maxWidth: '100%', margin: '0 auto' }}>{item.content}</pre>
          </div>
        );
      case 'msword':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <iframe
              title="Word Viewer"
              src={`https://docs.google.com/gview?url=${encodeURIComponent(item.file)}&embedded=true`}
              style={{ width: 'auto', height: '1000px', margin: '0 auto' }}
            />
          </div>
        );
      case 'mp3':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <audio controls src={item.file} style={{ margin: '0 auto', display: 'block', width: '70%' }} />
          </div>
        );
      case 'mp4':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <video controls width="70%" height="auto" src={item.file} style={{ margin: '0 auto', display: 'block' }} />
          </div>
        );
      case 'vnd.ms-powerpoint':
      case 'vnd.ms-excel':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <iframe
              title={item.fileType === 'vnd.ms-powerpoint' ? 'PowerPoint Viewer' : 'Excel Viewer'}
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.file)}`}
              style={{ width: '70%', height: '500px', margin: '0 auto' }}
            />
          </div>
        );
      case '':
        return null;
      default:
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href={item.file} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center' }}>
              ファイルをダウンロード
            </a>
          </div>
        );
    }
  };
  
  export { renderFileContent };
  