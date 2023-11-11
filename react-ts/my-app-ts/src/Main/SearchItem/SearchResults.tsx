import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { renderFileContent } from '../Comonents/FileContentRenderer';

interface SearchResultsProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleOpenButtonClick = (itemId: string) => {
    setExpandedItem(itemId);
  };

  const handleClose = () => {
    setExpandedItem(null);
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
                        <Typography variant="h3" className="cursor-pointer" onClick={() => toggleExpand(item.id)}>
                          {item.title}
                        </Typography>
                        <div className="mt-2">
                          <Typography variant="body1">作成者: {item.createdByName}</Typography>
                          <Typography variant="body1">カテゴリ: {item.category}</Typography>
                          <Typography variant="body1">章: {item.chapter}</Typography>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenButtonClick(item.id)}
                          style={{marginTop: '8px',marginLeft: '8px' }}
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Dialog
                open={expandedItem === item.id}
                onClose={handleClose}
                fullScreen 
              >

                <DialogTitle>{item.title}</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" size="large" >
                    閉じる
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ))
        )
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '24px' }}>検索結果なし</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
