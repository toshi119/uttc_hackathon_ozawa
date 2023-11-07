// MyItemList.tsx

import React from 'react';
import { Button } from '@mui/material';
import MySearchItem from './MySearchItem';

interface MyItemListProps {
  results: any[];
  checkedItems: string[];
  onCheckItem: (itemId: string) => void;
  onDeleteClick: () => void;
  onToggleExpand: (itemId: string) => void;
  expandedItem: string | null;
}

const MyItemList: React.FC<MyItemListProps> = ({
  results,
  checkedItems,
  onCheckItem,
  onDeleteClick,
  onToggleExpand,
  expandedItem,
}) => {
  return (
    <div>
      {results !== null ? (
        results.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <p style={{ fontSize: '24px' }}>検索結果なし</p>
          </div>
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
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>検索結果なし</p>
        </div>
      )}
    </div>
  );
};

export default MyItemList;
