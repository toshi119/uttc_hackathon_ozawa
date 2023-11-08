import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface SearchResultsProps {
  results: any[];
  expandedItem: string | null;
  toggleExpand: (itemId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, expandedItem, toggleExpand }) => {
  const handleCardClick = (itemId: string) => {
    // カードをクリックしたときにエクスパンドを切り替える
    toggleExpand(itemId);
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
              {/* カード全体をクリック可能にする */}
              <div onClick={() => handleCardClick(item.id)}>
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
              </div>
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
