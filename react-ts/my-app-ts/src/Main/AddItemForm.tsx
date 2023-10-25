import React, { useState, ChangeEvent } from 'react';
import { Typography, Button, TextField, Select, MenuItem, Container, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { fireAuth } from '../Auth/firebase'; 
interface AddItemFormProps {}

const AddItemForm: React.FC<AddItemFormProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleChapterChange = (event: SelectChangeEvent<string>) => {
    setChapter(event.target.value);
  };

  const handleSubmit = async () => {
    const user = fireAuth.currentUser;
  
    if (user) {
      const userEmail = user.email;
      const currentDateTime = new Date().toISOString();
  
      // データをオブジェクトにまとめる
      const data = {
        title,
        content,
        category,
        chapter,
        file,
        createdBy: userEmail,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      };
  
      // サーバーサイドのAPIエンドポイントにデータを送信
      try {
        const response = await fetch('/api/addItem', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log('データが送信されました:', responseData);
        } else {
          console.error('エラー:', response.statusText);
        }
      } catch (error) {
        console.error('エラー:', error);
      }
    } else {
      console.error('ユーザーがサインインしていません');
    }
  };

  return (
    <Container>
      <Typography variant="h6">アイテムの追加</Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="タイトル"
            variant="outlined"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="内容"
            multiline
            rows={4}
            variant="outlined"
            value={content}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
            fullWidth
          />
          <Select
            label="カテゴリ"
            value={category}
            onChange={handleCategoryChange}
            fullWidth
          >
            <MenuItem value="技術ブログ">技術ブログ</MenuItem>
            <MenuItem value="技術書">技術書</MenuItem>
            <MenuItem value="技術系動画">技術系動画</MenuItem>
          </Select>
          <Select
            label="章"
            value={chapter}
            onChange={handleChapterChange}
            fullWidth
          >
            <MenuItem value="章1">章1</MenuItem>
            <MenuItem value="章2">章2</MenuItem>
            <MenuItem value="章3">章3</MenuItem>
            {/* 他の章を追加 */}
          </Select>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            送信
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddItemForm;
