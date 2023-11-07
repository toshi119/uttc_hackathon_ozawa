// SearchResults.tsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface SearchResultsProps {
  results: any[];
  expandedItem: string | null;
  toggleExpand: (itemId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, expandedItem, toggleExpand}) => {
  return (
    <div>
      {results !== null ? (
        results.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <p style={{ fontSize: '24px' }}>検索結果なし</p>
          </div>
        ) : (
          results.map((item) => (
            <Box key={item.id} style={{ margin: '40px' , marginLeft: '40px', marginRight: '40px'}}>
              <Card className="mb-4" style={{ padding: '16px' }}>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div className="w-11/12">
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
          ))
        )
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>検索結果なし</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
