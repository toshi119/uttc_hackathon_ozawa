import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import { fireAuth } from '../../Auth/firebase';
import SearchForm from '../SearchItem/SearchForm';
import DeleteItemResults from './DeleteItemResults';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';


const DeleteItem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  const handleCheckItem = (itemId: string) => {
    const updatedCheckedItems = checkedItems.includes(itemId)
      ? checkedItems.filter((id) => id !== itemId)
      : [...checkedItems, itemId];
    setCheckedItems(updatedCheckedItems);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      // バックエンドAPIのエンドポイントを指定
      const apiUrl = 'https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/deleteItem';

      // 選択したアイテムのIDを取得
      const itemIdsToDelete = checkedItems;

      // APIに送信するデータを作成
      const requestData = {
        itemIds: itemIdsToDelete,
      };

      // HTTP DELETEリクエストを送信
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        await handleSearch();
        setOpenDeleteDialog(false);
        setCheckedItems([]);
      } else {
        // 削除が失敗した場合の処理
        console.error('削除に失敗しました');
      }
    } catch (error) {
      console.error('エラー: ', error);
    }
  };

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
        <DeleteItemResults
          results={results}
          checkedItems={checkedItems}
          onCheckItem={handleCheckItem}
          onDeleteClick={handleDeleteClick}
        />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default DeleteItem;
