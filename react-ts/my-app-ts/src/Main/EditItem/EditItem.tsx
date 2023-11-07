import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
} from '@mui/material';
import { fireAuth } from '../../Auth/firebase';

import EditItemSearchForm from './EditItemSearchForm';
import EditItemResult from './EditItemResult';
import EditItemDialog from './EditItemDialog';

const EditItem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleSearch = useCallback(async () => {
    const user = fireAuth.currentUser;

    if (user) {
      const userEmail = user.email;
      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/myItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchTerm,
            category: selectedCategory,
            chapter: selectedChapter,
            sortOption,
            userEmail,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error('データを取得できませんでした');
          setResults([]);
        }
      } catch (error) {
        console.error('データを取得できませんでした: ', error);
        setResults([]);
      }
    }
  }, [searchTerm, selectedCategory, selectedChapter, sortOption]);

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const toggleExpand = (itemId: string) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditingItem(null);
    setEditDialogOpen(false);
  };

  const handleTitleChange = (newTitle: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, title: newTitle });
    }
  };

  const handleContentChange = (newContent: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, content: newContent });
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, category: newCategory });
    }
  };

  const handleChapterChange = (newChapter: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, chapter: newChapter });
    }
  };

  const handleSaveChanges = async () => {
    if (editingItem) {
      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/updateItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingItem),
        });

        if (response.ok) {
          console.log('編集が成功しました');
          handleEditDialogClose();
          handleSearch();
        } else {
          console.error('編集が失敗しました');
        }
      } catch (error) {
        console.error('エラー: ', error);
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <EditItemSearchForm
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
          handleSearchButtonClick={handleSearchButtonClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </Container>
      <div>
        <EditItemResult
          results={results}
          expandedItem={expandedItem}
          toggleExpand={toggleExpand}
          handleEditItem={handleEditItem}
        />
      </div>
      <EditItemDialog
        editDialogOpen={editDialogOpen}
        handleEditDialogClose={handleEditDialogClose}
        editingItem={editingItem}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleCategoryChange={handleCategoryChange}
        handleChapterChange={handleChapterChange}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default EditItem;
