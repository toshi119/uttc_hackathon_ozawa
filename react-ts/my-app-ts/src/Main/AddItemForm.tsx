import React, { useState, ChangeEvent } from 'react';
import { Typography, Button, TextField, Select, MenuItem, Container, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { fireAuth } from '../Auth/firebase'; 
import Chapters from '../Const/Chapters'; 
import Categories from '../Const/Categories'; 
interface AddItemFormProps {
  onFormSubmitSuccess: () => void; // 送信が成功した場合に呼び出すコールバック関数
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onFormSubmitSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');


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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user = fireAuth.currentUser;
  
    if (user) {
      const userEmail = user.email;
  
      const data = {
        title,
        content,
        category,
        chapter,
        file,
        createdBy: userEmail,
        createdByName: userEmail,
      };
  
      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/addItem', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log('データが送信されました:', responseData);
          onFormSubmitSuccess();
        } else {
          setErrorMessage('データの送信に失敗しました');
          console.error('エラー:', response.statusText);
        }
      } catch (error) {
        setErrorMessage('エラーが発生しました');
        console.error('エラー:', error);
      }
    } else {
      setErrorMessage('ユーザーがサインインしていません');
      console.error('ユーザーがサインインしていません');
    }
  };

  return (
      <Container>
        <Typography variant="h6">アイテムの追加</Typography>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
              {Categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>  
              ))}
            </Select>
            <Select
              label="章"
              value={chapter}
              onChange={handleChapterChange}
              fullWidth
            >
            {Chapters.map(chapter => (
              <MenuItem key={chapter} value={chapter as string}>
                {chapter}
              </MenuItem>  
            ))}
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
