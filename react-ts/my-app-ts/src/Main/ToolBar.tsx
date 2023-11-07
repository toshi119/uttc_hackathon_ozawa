import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Paper, InputBase,IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate を追加

const ToolBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');  // 検索ボックスのテキストを管理
  const navigate = useNavigate();  // useNavigate フックを使用

  const handleSearch = () => {
    // 検索ボタンがクリックされたときの処理
    navigate(`/searchitem?searchTerm=${searchText}`); // URL に searchItem へのリンクとクエリを追加
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">UTTC_Knowledge</Typography>
        <div style={{ flex: 1 }}></div>
        <Link to="/signin">
          <Button color="inherit">ログアウト</Button>
        </Link>
        <Link to="/items">
          <Button color="inherit">アイテムの操作</Button>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Paper component="form" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            <InputBase
              placeholder="検索"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}  // テキスト変更を検知して state にセット
            />
            <IconButton type="button" aria-label="search" onClick={handleSearch}>
              <Search />
            </IconButton>
          </Paper>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
