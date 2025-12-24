// 持久化存儲 Hook
import { useState, useEffect } from 'react';

export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (error) {
      console.error(`讀取 localStorage 失敗 (${key}):`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      const storageMode = window.localStorage.getItem('app_storage_mode') || 'browser';
      // 在使用本地文件夾模式時，不再寫入 localStorage，避免大圖觸發配額彈窗
      if (storageMode === 'folder') return;

      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('LocalStorage 儲存空間已滿！');
        // 僅瀏覽器存儲模式下提示，文件夾模式直接跳過
        const storageMode = window.localStorage.getItem('app_storage_mode') || 'browser';
        if (storageMode === 'browser') {
          alert('存儲空間不足！圖片過大或數據過多。建議：\n1. 使用更小的圖片（建議小於500KB）\n2. 删除一些不需要的模板\n3. 清理瀏覽器緩存');
        }
      } else {
        console.error(`保存到 localStorage 失败 (${key}):`, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};
