// SearchResults.tsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface SearchResultsProps {
  results: any[];
  expandedItem: string | null;
  toggleExpand: (itemId: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, expandedItem, toggleExpand, sortOption, setSortOption }) => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="createdAt">新着投稿順</option>
          <option value="-createdAt">投稿日が古い順</option>
          <option value="updatedAt">新睨更新順</option>
          <option value="-updatedAt">更新日が古い順</option>
        </select>
      </div>
      {results !== null ? (
        results.length === 0 ? (
          <p>検索結果なし</p>
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
        <p>検索結果なし</p>
      )}
    </div>
  );
};

export default SearchResults;
