// DeleteItemResults.tsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { renderFileContent } from '../SearchItem/FileContentRenderer';

interface DeleteItemResultsProps {
  results: any[];
  checkedItems: string[];
  onCheckItem: (itemId: string) => void;
  onDeleteClick: () => void;
}

const DeleteItemResults: React.FC<DeleteItemResultsProps> = ({ results, checkedItems, onCheckItem, onDeleteClick }) => {
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
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={onDeleteClick}
              disabled={checkedItems.length === 0}
              style={{ margin: '0 auto', display: 'block', marginBottom: '16px' }}
            >
              削除
            </Button>
            {results.map((item) => (
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
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenDialog(item.id)}
                            style={{ marginTop: '8px',marginLeft: '8px' }}
                          >
                            Open
                          </Button>
                          <Checkbox
                            checked={checkedItems.includes(item.id)}
                            onChange={() => onCheckItem(item.id)}
                          />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Box>
            ))}
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>検索結果なし</p>
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

export default DeleteItemResults;
