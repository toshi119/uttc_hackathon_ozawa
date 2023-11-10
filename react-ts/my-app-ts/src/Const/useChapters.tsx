// useChapters.js
import { useState, useEffect } from 'react';

const useChapters = () => {
  const [chapters, setChapters] = useState<string[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/chapterNames');
        const data = await response.json();
        setChapters(data);
      } catch (error) {
        console.error('データの取得エラー:', error);
      }
    };

    fetchChapters();
  }, []);

  return chapters;
};

export default useChapters;
