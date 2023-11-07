import React from 'react';
import { Button, InputBase, Paper, FormControl, Select, MenuItem, Box, Container } from '@mui/material';
import Categories from '../../Const/Categories';
import Chapters from '../../Const/Chapters';

interface MySearchFormProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedChapter: string;
  setSelectedChapter: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const MySearchForm: React.FC<MySearchFormProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedChapter,
  setSelectedChapter,
  sortOption,
  setSortOption,
  onSearch,
}) => {
  const handleSearchButtonClick = () => {
    onSearch();
  };

  return (
    <Container
      maxWidth="sm"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}
    >
      <Paper component="form" style={{ padding: '8px', textAlign: 'center', width: '100%' }}>
        <InputBase
          placeholder="検索"
          inputProps={{ 'aria-label': 'search' }}
          style={{ width: '200%' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <Box
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}
      >
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
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
        <Button variant="contained" color="primary" style={{ width: '25%' }} onClick={handleSearchButtonClick}>
          検索
        </Button>
      </Box>
    </Container>
  );
};

export default MySearchForm;
