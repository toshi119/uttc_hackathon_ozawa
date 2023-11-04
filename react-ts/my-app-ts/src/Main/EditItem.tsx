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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  InputLabel,
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

const EditItem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleSearch = useCallback(async () => {
    const user = fireAuth.currentUser;

    if (user) {
      const userEmail = user.email;
      try {
        const response = await fetch('http://localhost:8000/api/myItems', {
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

  const toggleExpand = (itemId: string) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditingItem(null);
    setEditDialogOpen(false);
  };

  const handleTitleChange = (newTitle: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, title: newTitle });
    }
  };

  const handleContentChange = (newContent: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, content: newContent });
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, category: newCategory });
    }
  };

  const handleChapterChange = (newChapter: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, chapter: newChapter });
    }
  };

  const handleSaveChanges = async () => {
    if (editingItem) {
      try {
        const response = await fetch('http://localhost:8000/api/updateItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingItem),
        });

        if (response.ok) {
          console.log('編集が成功しました');
          handleEditDialogClose();
          handleSearch();
        } else {
          console.error('編集が失敗しました');
        }
      } catch (error) {
        console.error('エラー: ', error);
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

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
              <Box key={item.id} style={{ margin: '40px', marginLeft: '40px', marginRight: '40px' }}>
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
                          <Typography variant="h4">{item.content}</Typography>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditItem(item)}
                      style={{ marginTop: '16px' }}
                    >
                      編集
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))
          )
        ) : (
          <p>検索結果なし</p>
        )}
      </div>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>アイテムの編集</DialogTitle>
        <DialogContent>
          <TextField
            label="タイトル"
            fullWidth
            value={editingItem?.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="内容"
            fullWidth
            multiline
            rows={4}
            value={editingItem?.content}
            onChange={(e) => handleContentChange(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <FormControl style={{ width: '100%', marginBottom: '16px' }}>
            <InputLabel>カテゴリ</InputLabel>
            <Select
              value={editingItem?.category}
              onChange={(e) => handleCategoryChange(e.target.value as string)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: '100%' }}>
            <InputLabel>章</InputLabel>
            <Select
              value={editingItem?.chapter}
              onChange={(e) => handleChapterChange(e.target.value as string)}
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter} value={chapter}>
                  {chapter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditItem;
