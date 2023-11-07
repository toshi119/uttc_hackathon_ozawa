import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Button,
  InputBase,
  Paper,
} from '@mui/material';
import Chapters from '../../Const/Chapters';
import Categories from '../../Const/Categories';

interface EditItemSearchFormProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedChapter: string;
  setSelectedChapter: (chapter: string) => void;
  handleSearchButtonClick: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  sortOption: string;
  setSortOption: (sortOption: string) => void;
}

const EditItemSearchForm: React.FC<EditItemSearchFormProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedChapter,
  setSelectedChapter,
  handleSearchButtonClick,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
}) => {
  return (
    <div>
      <Paper component="form" style={{ padding: '8px', textAlign: 'center', width: '100%' }}>
        <InputBase
          placeholder="検索"
          inputProps={{ 'aria-label': 'search' }}
          style={{ width: '100%' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <div style={{ textAlign: 'center' }}>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="createdAt">新着投稿順</option>
          <option value="-createdAt">投稿日が古い順</option>
          <option value="updatedAt">新着更新順</option>
          <option value="-updatedAt">更新日が古い順</option>
        </select>
      </div>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
        <FormControl variant="outlined" style={{ minWidth: 150, height: '50%' }}>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            <MenuItem value="">選択してください</MenuItem>
            {Categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 150, height: '50%', marginLeft: '8px' }}>
          <Select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value as string)}
          >
            <MenuItem value="">選択してください</MenuItem>
            {Chapters.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" style={{ width: '25%' }} onClick={handleSearchButtonClick}>
          検索
        </Button>
      </Box>
    </div>
  );
};

export default EditItemSearchForm;
