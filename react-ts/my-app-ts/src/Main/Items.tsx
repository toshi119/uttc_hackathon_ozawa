import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, Fab } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import ToolBar from './ToolBar';
import AddItemForm from './AddItem/AddItemForm'; // AddItemForm をインポート
import DeleteItem from './DeleteItem/DeleteItem'
import EditItem from './EditItem/EditItem';

const Items: React.FC = () => {
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showDeleteItem, setShowDeleteItem] = useState(false);

  // 送信が成功した場合に呼び出されるコールバック関数
  const handleFormSubmitSuccess = () => {
    setShowAddItemForm(false); // フォームを非表示に切り替える
  };


  const toggleAddItemForm = () => {
    setShowAddItemForm((prev) => !prev);
    setShowEditItem(false);
    setShowDeleteItem(false);
  };

  const toggleEditItem = () => {
    setShowEditItem((prev) => !prev);
    setShowAddItemForm(false);
    setShowDeleteItem(false);
  };

  const toggleDeleteItem = () => {
    setShowDeleteItem((prev) => !prev);
    setShowAddItemForm(false);
    setShowEditItem(false);
  };

  return (
    <div>
      <ToolBar />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Fab color="primary" aria-label="add" onClick={toggleAddItemForm}>
                <Add />
              </Fab>
              <Typography variant="h6">アイテムの追加</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Fab color="secondary" aria-label="edit" onClick={toggleEditItem}>
                <Edit />
              </Fab>
              <Typography variant="h6">アイテムの更新</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Fab color="error" aria-label="delete" onClick={toggleDeleteItem}>
                <Delete />
              </Fab>
              <Typography variant="h6">アイテムの削除</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {showAddItemForm && <AddItemForm onFormSubmitSuccess={handleFormSubmitSuccess} />}
      {showEditItem && <EditItem />}
      {showDeleteItem && <DeleteItem />}
    </div>
  );
}

export default Items;
