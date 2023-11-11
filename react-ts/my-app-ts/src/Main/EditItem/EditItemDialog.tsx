import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel,
} from '@mui/material';
import useCategories from '../../Const/useCategories';
import useChapters from '../../Const/useChapters';
import FileInput from '../AddItem/FileInput';

interface EditItemDialogProps {
  editDialogOpen: boolean;
  handleEditDialogClose: () => void;
  editingItem: any | null;
  handleTitleChange: (newTitle: string) => void;
  handleContentChange: (newContent: string) => void;
  handleCategoryChange: (newCategory: string) => void;
  handleChapterChange: (newChapter: string) => void;
  handleSaveChanges: () => void;
  onFileChange: (file: File | null, fileType: string | null) => void;
}

const EditItemDialog: React.FC<EditItemDialogProps> = ({
  editDialogOpen,
  handleEditDialogClose,
  editingItem,
  handleTitleChange,
  handleContentChange,
  handleCategoryChange,
  handleChapterChange,
  handleSaveChanges,
  onFileChange,
}) => {
  const chaptersOptions = useChapters();
  const categoriesOptions = useCategories();
  const [editingFile, setEditingFile] = useState<File | null>(null);

  const handleLocalFileChange = (file: File | null, fileType: string | null) => {
    setEditingFile(file);
    onFileChange(file, fileType);
  };

  return (
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
            {categoriesOptions.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '100%', marginBottom: '16px' }}>
          <InputLabel>章</InputLabel>
          <Select
            value={editingItem?.chapter}
            onChange={(e) => handleChapterChange(e.target.value as string)}
          >
            {chaptersOptions.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FileInput onChange={(file, fileType) => handleLocalFileChange(file, fileType)} />
        {editingFile && <Typography variant="body2">現在のファイル: {editingFile.name}</Typography>}
        {editingItem && <Typography variant="body2">現在のファイル: {editingItem.fileName}</Typography>}
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
  );
};

export default EditItemDialog;
