// MyItemList.tsx

import React from 'react';
import { Button } from '@mui/material';
import MySearchItem from './MySearchItem';

interface MyItemListProps {
  results: any[];
  checkedItems: string[];
  onCheckItem: (itemId: string) => void;
  onDeleteClick: () => void;
  sortOption: string;
  onSortOptionChange: (option: string) => void; // 追加
  onToggleExpand: (itemId: string) => void;
  expandedItem: string | null;
}

const MyItemList: React.FC<MyItemListProps> = ({
  results,
  checkedItems,
  onCheckItem,
  onDeleteClick,
  sortOption,
  onSortOptionChange, // 追加
  onToggleExpand,
  expandedItem,
}) => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <select value={sortOption} onChange={(e) => onSortOptionChange(e.target.value)}>
          <option value="createdAt">新着投稿順</option>
          <option value="-createdAt">投稿日が古い順</option>
          <option value="updatedAt">新着更新順</option>
          <option value="-updatedAt">更新日が古い順</option>
        </select>
      </div>
      {results !== null ? (
        results.length === 0 ? (
          <p>検索結果なし</p>
        ) : (
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={onDeleteClick}
              disabled={checkedItems.length === 0}
            >
              削除
            </Button>
            {results.map((item) => (
              <MySearchItem
                key={item.id}
                item={item}
                checked={checkedItems.includes(item.id)}
                expandedItem={expandedItem}
                onCheck={() => onCheckItem(item.id)}
                onToggleExpand={() => onToggleExpand(item.id)}
              />
            ))}
          </div>
        )
      ) : (
        <p>検索結果なし</p>
      )}
    </div>
  );
};

export default MyItemList;
