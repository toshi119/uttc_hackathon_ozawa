// EditItem.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
} from '@mui/material';
import { fireAuth } from '../../Auth/firebase';

import SearchForm from '../SearchItem/SearchForm';
import EditItemResults from './EditItemResults';
import EditItemDialog from './EditItemDialog';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditItem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
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

  const handleEditItem = async (item: any) => {
    try {
      const user = fireAuth.currentUser;
      if (!user) {
        console.error('ユーザーがサインインしていません');
        return;
      }

      // Firebaseからファイルを取得
      if (item.file) {
        const response = await fetch(item.file);
        const blob = await response.blob();
        const file = new File([blob], item.fileType || '', { type: blob.type });
        item.file = file;
      }

      setEditingItem(item);
      setEditDialogOpen(true);
    } catch (error) {
      console.error('エラー: ', error);
    }
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
        const user = fireAuth.currentUser;
        if (!user) {
          console.error('ユーザーがサインインしていません');
          return;
        }

        const updatedData = { ...editingItem };

        if (editingItem.file instanceof File) {
          const storage = getStorage();
          const storageRef = ref(storage, 'files');
          const fileRef = ref(storageRef, editingItem.file.name);
          
          await uploadBytes(fileRef, editingItem.file);
          const url = await getDownloadURL(fileRef);

          updatedData.file = url;
        }

        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/updateItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
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

  const handleFileChange = (file: File | null, fileType: string | null) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, file, fileType });
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <SearchForm
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedChapter={selectedChapter}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
          setSelectedChapter={setSelectedChapter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          handleSearchButtonClick={handleSearchButtonClick}
        />
      </Container>
      <div>
        <EditItemResults
          results={results}
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
        onFileChange={handleFileChange}
      />
    </div>
  );
};

export default EditItem;
