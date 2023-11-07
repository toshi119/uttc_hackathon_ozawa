import React from 'react';
import { Box, Card, CardContent, Checkbox, Typography } from '@mui/material';

interface MySearchItemProps {
  item: any;
  checked: boolean;
  expandedItem: string | null;
  onCheck: () => void;
  onToggleExpand: () => void;
}

const MySearchItem: React.FC<MySearchItemProps> = ({
  item,
  checked,
  expandedItem,
  onCheck,
  onToggleExpand,
}) => {
  return (
    <Box style={{ margin: '16px', marginLeft: '40px', marginRight: '16px' }}>
      <Card className="mb-4" style={{ padding: '16px' }}>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div className="w-11/12">
              <Checkbox checked={checked} onChange={onCheck} />
              <Typography variant="h3" className="cursor-pointer" onClick={onToggleExpand}>
                {item.title}
              </Typography>
              <div className="mt-2">
                <Typography variant="body1">作成者: {item.createdByName}</Typography>
                <Typography variant="body1">カテゴリ: {item.category}</Typography>
                <Typography variant="body1">章: {item.chapter}</Typography>
              </div>
            </div>
            {expandedItem === item.id && (
              <div className="mt-2">
                <Typography variant="body1">
                  作成日時: {item.createdAt} 更新日時: {item.updatedAt}
                </Typography>
                <Typography variant="h4">{item.content}</Typography>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MySearchItem;
