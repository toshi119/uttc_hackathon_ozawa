import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/categoryNames'); // ここに適切なAPIエンドポイントを入力
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('データの取得エラー:', error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
