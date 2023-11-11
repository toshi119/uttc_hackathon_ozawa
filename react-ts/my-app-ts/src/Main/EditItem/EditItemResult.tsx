// EditItemResults.tsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// 追加: FileContentRenderer をインポート
import { renderFileContent } from '../SearchItem/FileContentRenderer';

interface EditItemResultsProps {
  results: any[];
  handleEditItem: (item: any) => void;
}

const EditItemResults: React.FC<EditItemResultsProps> = ({ results, handleEditItem }) => {
  const [openDialogItemId, setOpenDialogItemId] = React.useState<string | null>(null);

  const handleOpenDialog = (itemId: string) => {
    setOpenDialogItemId(itemId);
  };

  const handleCloseDialog = () => {
    setOpenDialogItemId(null);
  };

  return (
    <div>
      {results !== null ? (
        results.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <p style={{ fontSize: '24px' }}>検索結果なし</p>
          </div>
        ) : (
          results.map((item) => (
            <Box key={item.id} style={{ margin: '40px', marginLeft: '40px', marginRight: '40px' }}>
              <div>
                <Card className="mb-4" style={{ padding: '16px' }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div className="w-11/12">
                        <Typography variant="h3" className="cursor-pointer">
                          {item.title}
                        </Typography>
                        <div className="mt-2">
                          <Typography variant="body1">
                            作成者: {item.createdByName}
                          </Typography>
                          <Typography variant="body1">
                            カテゴリ: {item.category}
                          </Typography>
                          <Typography variant="body1">
                            章: {item.chapter}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenDialog(item.id)}
                      style={{ marginTop: '8px', marginRight: '8px' }}
                    >
                      Open
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditItem(item)}
                      style={{ marginTop: '8px' }}
                    >
                      編集
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </Box>
          ))
        )
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '24px' }}>検索結果なし</p>
        </div>
      )}

      {/* ダイアログ */}
      <Dialog
        open={Boolean(openDialogItemId)}
        onClose={handleCloseDialog}
        fullScreen
      >
        <DialogTitle>{/* ダイアログのタイトル */}</DialogTitle>
        <DialogContent>
          {/* ダイアログの内容 */}
          {results.map((item) => (
            <React.Fragment key={item.id}>
              {openDialogItemId === item.id && (
                <>
                  <Typography variant="body1">
                    作成者: {item.createdByName} カテゴリ: {item.category} 章: {item.chapter}
                  </Typography>
                  <Typography variant="body1">
                    作成日時: {item.createdAt} 更新日時: {item.updatedAt}
                  </Typography>
                  <hr style={{ margin: '8px 0', border: 'none', borderBottom: '1px solid #ccc' }} />
                  
                  {/* 追加: ファイルの内容を表示 */}
                  {renderFileContent(item)}
                  
                  <div style={{ margin: '8px 0' }} />
                  <Typography variant="h4">
                    {item.content.split('\n').map((line: string, index: number) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </>
              )}
            </React.Fragment>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" size="large">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditItemResults;
