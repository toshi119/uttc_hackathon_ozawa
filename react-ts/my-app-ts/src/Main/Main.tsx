import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Paper, Grid, Card, CardContent, Fab } from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

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
              <Link to="/additem">
                <Fab color="primary" aria-label="add">
                  <Add />
                </Fab>
              </Link>
              <Typography variant="h6">アイテムの追加</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Link to="/updateitem"> {/* Navigate to /updateitem */}
                <Fab color="secondary" aria-label="edit">
                  <Edit />
                </Fab>
              </Link>
              <Typography variant="h6">アイテムの更新</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Link to="/deleteitem"> {/* Navigate to /deleteitem */}
                <Fab color="error" aria-label="delete">
                  <Delete />
                </Fab>
              </Link>
              <Typography variant="h6">アイテムの削除</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Rest of your code... */}
      </Grid>
      {/* ここに新規にアップロードされたアイテムのリストを表示するコードを追加 */}
    </div>
  );
}

export default Main;

