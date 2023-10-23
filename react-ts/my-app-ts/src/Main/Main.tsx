import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Paper, Grid, Card, CardContent, Fab } from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';

const Main: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">UTTC_Knowledge</Typography>
          <div style={{ flex: 1 }}></div>
          <Button color="inherit">ログアウト</Button>
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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Fab color="primary" aria-label="add">
                <Add />
              </Fab>
              <Typography variant="h6">アイテムの追加</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Fab color="secondary" aria-label="edit">
                <Edit />
              </Fab>
              <Typography variant="h6">アイテムの更新</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Fab color="error" aria-label="delete">
                <Delete />
              </Fab>
              <Typography variant="h6">アイテムの削除</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
          <Button variant="contained" color="primary">
            アイテムを検索
          </Button>
        </Grid>
      </Grid>
      {/* ここに新規にアップロードされたアイテムのリストを表示するコードを追加 */}
    </div>
  );
}

export default Main;
