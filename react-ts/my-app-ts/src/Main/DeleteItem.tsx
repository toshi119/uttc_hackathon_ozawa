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
  Checkbox, 
  Dialog, 
  DialogActions,
  DialogContent, 
  DialogContentText, 
  DialogTitle,
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

const DeleteItem: React.FC = () => {
　const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]); // 選択したアイテムのID
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // 削除の確認ポップアップ

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

  const handleCheckItem = (itemId: string) => {
    const updatedCheckedItems = checkedItems.includes(itemId)
      ? checkedItems.filter((id) => id !== itemId)
      : [...checkedItems, itemId];
    setCheckedItems(updatedCheckedItems);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // バックエンドAPIのエンドポイントを指定
      const apiUrl = 'http://localhost:8000/api/deleteItem';
  
      // 選択したアイテムのIDを取得
      const itemIdsToDelete = checkedItems;
  
      // APIに送信するデータを作成
      const requestData = {
        itemIds: itemIdsToDelete,
      };
  
      // HTTP DELETEリクエストを送信
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
        　'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    　});
  
      if (response.ok) {
        await handleSearch();
        setOpenDeleteDialog(false);
        setCheckedItems([]);
      } else {
        // 削除が失敗した場合の処理
        console.error('削除に失敗しました');
      }
    } catch (error) {
      console.error('エラー: ', error);
    }
  };
  


  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Container
        maxWidth="sm"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}
      >
        <Paper component="form" style={{ padding: '8px', textAlign: 'center', width: '100%' }}>
          <InputBase
            placeholder="検索"
            inputProps={{ 'aria-label': 'search' }}
            style={{ width: '200%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>
        <Box
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}
        >
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
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteClick}
                disabled={checkedItems.length === 0}
              >
                削除
              </Button>
              {results.map((item) => (
                <Box key={item.id} style={{ margin: '16px', marginLeft: '40px', marginRight: '16px' }}>
                  <Card className="mb-4" style={{ padding: '16px' }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="w-11/12">
                          <Checkbox
                            checked={checkedItems.includes(item.id)}
                            onChange={() => handleCheckItem(item.id)}
                          />
                          <Typography
                            variant="h3"
                            className="cursor-pointer"
                            onClick={() => toggleExpand(item.id)}
                          >
                            {item.title}
                          </Typography>
                          <div className="mt-2">
                            <Typography variant="body1">作成者: {item.createdByName}</Typography>
                            <Typography variant="body1">カテゴリ: {item.category}</Typography>
                            <Typography variant="body1">章: {item.chapter}</Typography>
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
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </div>
          )
        ) : (
          <p>検索結果なし</p>
        )}
      </div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">アイテムを削除</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            選択したアイテムを削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            いいえ
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteItem;
