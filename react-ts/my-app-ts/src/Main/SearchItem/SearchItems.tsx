import React, { useEffect, useState, useCallback } from 'react';
import ToolBar from '../ToolBar';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { useLocation } from 'react-router-dom';


const SearchItems: React.FC = () => {

  const location = useLocation();  // useLocation フックを使用
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('searchTerm') || ''; // URL クエリから searchItem を読み取る
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);  // 初期検索語句を設定
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [sortOption, setSortOption] = useState('createdAt');
  const [results, setResults] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/searchItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm,
          category: selectedCategory,
          chapter: selectedChapter,
          sortOption,
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
  }, [searchTerm, selectedCategory, selectedChapter, sortOption]);

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const toggleExpand = (itemId: string) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  return (
    <div>
      <ToolBar />
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
      <SearchResults
        results={results}
        expandedItem={expandedItem}
        toggleExpand={toggleExpand}
      />
    </div>
  );
};

export default SearchItems;
