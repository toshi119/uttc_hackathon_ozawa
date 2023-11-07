import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';

import InputField from './InputField';
import SelectField from './SelectField';
import FileInput from './FileInput';

import Chapters from '../../Const/Chapters'; 
import Categories from '../../Const/Categories'; 

interface ItemFormProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  chapter: string;
  setChapter: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  errorMessage: string;
  onSubmit: (event: React.FormEvent) => Promise<void>; 
}

const ItemForm: React.FC<ItemFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
  chapter,
  setChapter,
  file,
  setFile,
  errorMessage,
  onSubmit,
}) => {
  return (
    <Container>
      <Typography variant="h6">アイテムの追加</Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <form onSubmit={onSubmit}>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <InputField label="タイトル" value={title} onChange={setTitle} fullWidth />
          <InputField label="内容" multiline rows={4} value={content} onChange={setContent} fullWidth />
          <SelectField label="カテゴリ" value={category} options={Categories} onChange={setCategory} fullWidth />
          <SelectField label="章" value={chapter} options={Chapters} onChange={setChapter} fullWidth />
          <FileInput onChange={setFile} />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            送信
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ItemForm;