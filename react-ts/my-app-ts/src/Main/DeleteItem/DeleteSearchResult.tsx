import React from 'react';
import { Box, Card, CardContent, Typography, Button, Checkbox } from '@mui/material';

interface DeleteSearchResultProps {
  results: any[];
  expandedItem: string | null;
  toggleExpand: (itemId: string) => void;
  checkedItems: string[];
  onCheckItem: (itemId: string) => void;
  onDeleteClick: () => void;
}

const DeleteSearchResult: React.FC<DeleteSearchResultProps> = ({ 
  results,
  expandedItem, 
  toggleExpand, 
  checkedItems,
  onCheckItem,
  onDeleteClick,
}) => {
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
            >
              削除
            </Button>
            {results.map((item) => (
              <Box key={item.id} style={{ margin: '40px' , marginLeft: '40px', marginRight: '40px'}}>
                <Card className="mb-4" style={{ padding: '16px' }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div className="w-11/12">
                        <Checkbox
                          checked={checkedItems.includes(item.id)}
                          onChange={() => onCheckItem(item.id)}
                        />
                        <Typography
                          variant="h3"
                          className="cursor-pointer"
                          onClick={() => toggleExpand(item.id)}
                        >
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
                      {expandedItem === item.id && (
                        <div className="mt-2">
                          <Typography variant="body1">
                            作成日時: {item.createdAt} 更新日時: {item.updatedAt}
                          </Typography>
                          <Typography variant="h4">
                            {item.content}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>検索結果なし</p>
        </div>
      )}
    </div>
  );
};

export default DeleteSearchResult;
