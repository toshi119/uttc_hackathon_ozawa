import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  InputBase,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Box,
  Container,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { fireAuth } from '../Auth/firebase'; 

const chapters: string[] = [
  'エディタ',
  'OSコマンド',
  'Git',
  'GitHub',
  'HTML&CSS',
  'JavaScript',
  'React',
  'React×TypeScript',
  'SQL',
  'Docker',
  'Go',
  'HTTP Server',
  'RDBMSへの接続',
  'Unit Test',
  'フロントエンドとバックエンドの接続',
  'CI',
  'CD',
  '認証',
  'ハッカソン準備',
  'ハッカソンの概要',
];

const categories = ['技術ブログ', '技術書', '技術動画'];

const MyItems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    const user = fireAuth.currentUser;
  
    if (user) {
      const userEmail = user.email;
      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/myItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchTerm,
            category: selectedCategory,
            chapter: selectedChapter,
            sortOption,
            userEmail,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error('データを取得できませんでした');
          setResults([]);
        }
      } catch (error) {
        console.error('データを取得できませんでした: ', error);
        setResults([]);
      }
    }

  }, [searchTerm, selectedCategory, selectedChapter, sortOption]);

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const toggleExpand = (itemId: string) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  return (
    <div>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <Paper component="form" style={{ padding: '8px', textAlign: 'center', width: '100%' }}>
          <InputBase
            placeholder="検索"
            inputProps={{ 'aria-label': 'search' }}
            style={{ width: '200%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
          <FormControl variant="outlined" style={{ minWidth: 150, height: '50%' }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as string)}
            >
              <MenuItem value="">選択してください</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 150, height: '50%', marginLeft: '8px' }}>
            <Select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value as string)}
            >
              <MenuItem value="">選択してください</MenuItem>
              {chapters.map((chapter) => (
                <MenuItem key={chapter} value={chapter}>
                  {chapter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
          <Button variant="contained" color="primary" style={{ width: '25%' }} onClick={handleSearchButtonClick}>
            検索
          </Button>
        </Box>
      </Container>
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
  </div>
);
};

export default MyItems;