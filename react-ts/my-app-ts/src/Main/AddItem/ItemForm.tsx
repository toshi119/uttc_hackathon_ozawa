// ItemForm.tsx
import { Typography, Button, Container, Paper } from '@mui/material';

import InputField from '../Components/InputField';
import SelectField from '../Components/SelectField';
import FileInput from '../Components/FileInput';

import useChapters from '../../Const/useChapters';
import useCategories from '../../Const/useCategories';

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
  onFileChange: (file: File | null, fileType: string | null) => void;
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
  onFileChange,
  onSubmit,
}) => {
  const chaptersOptions = useChapters();
  const categoriesOptions = useCategories();

  return (
    <Container>
      <Typography variant="h6">アイテムの追加</Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <form onSubmit={onSubmit}>
          <InputField label="タイトル" value={title} onChange={setTitle} fullWidth />
          <InputField label="内容" multiline rows={4} value={content} onChange={setContent} fullWidth />
          <SelectField label="カテゴリ" value={category} options={categoriesOptions} onChange={setCategory} fullWidth />
          <SelectField label="章" value={chapter} options={chaptersOptions} onChange={setChapter} fullWidth />
          <FileInput onChange={onFileChange} />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            送信
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ItemForm;
