// ToolBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Paper, InputBase } from '@mui/material';
import {Search } from '@mui/icons-material';
import { Link } from 'react-router-dom'; 
const ToolBar: React.FC = () => {
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
                        />
                        <IconButton type="submit" aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default ToolBar;