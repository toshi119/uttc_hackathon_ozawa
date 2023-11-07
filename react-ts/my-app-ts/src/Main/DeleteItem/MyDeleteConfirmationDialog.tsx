import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface MyDeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const MyDeleteConfirmationDialog: React.FC<MyDeleteConfirmationDialogProps> = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">アイテムを削除</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          選択したアイテムを削除しますか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          いいえ
        </Button>
        <Button onClick={onConfirmDelete} color="primary" autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDeleteConfirmationDialog;
