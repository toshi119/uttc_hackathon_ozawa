const renderFileContent = (item: any) => {
    switch (item.fileType) {
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg+xml':
        return (
          <img
            src={item.file}
            alt="アップロードされた画像"
            style={{
              maxWidth: '100%',
              height: '70%',
              width: 'auto',
              margin: '0 auto',
              display: 'block',  // 中央揃えのため
            }}
          />
        );
      case 'pdf':
        return (
          <iframe
            title="PDF Viewer"
            src={item.file}
            style={{
              width: '70vw',
              height: '100vh', 
              margin: '0 auto',
              display: 'block',
            }}
          />
        );
      case 'txt':
        return (
          <pre style={{ maxWidth: '100%', margin: '0 auto', display: 'block' }}>
            {item.content}
          </pre>
        );
      case 'msword':
        return (
          <iframe
            title="Word Viewer"
            src={`https://docs.google.com/gview?url=${encodeURIComponent(item.file)}&embedded=true`}
            style={{ width: 'auto', height: '75%', margin: '0 auto', display: 'block' }}
            nonce="OHQmnAq-Vwf8J1SXvRdVEg" 
          />
        );
      case 'mp3':
        return (
          <audio
            controls
            src={item.file}
            style={{ margin: '0 auto', display: 'block', width: '70%' }}
          />
        );
      case 'mp4':
        return (
          <video
            controls
            width="auto"
            height="70%"
            src={item.file}
            style={{ margin: '0 auto', display: 'block' }}
          />
        );
      case 'vnd.openxmlformats-officedocument.presentationml.presentation':
      case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return (
          <iframe
            title={item.fileType === 'vnd.ms-powerpoint' ? 'PowerPoint Viewer' : 'Excel Viewer'}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.file)}`}
            style={{ width: 'auto', height: '75%', margin: '0 auto', display: 'block' }}
          />
        );
      case '':
        return null;
      default:
        return (
          <a
            href={item.file}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textAlign: 'center' }}
          >
            ファイルをダウンロード
          </a>
        );
    }
  };
  
  export { renderFileContent };
  