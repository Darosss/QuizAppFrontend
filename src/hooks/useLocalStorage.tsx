import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = <StorageType,>(
  key: string,
  defaultValue: StorageType,
) => {
  const [storageItem, setStorageItem] = useState<StorageType | null>(
    defaultValue,
  );

  const getStorageItem = async () => {
    const data = await AsyncStorage.getItem(key);
    if (typeof storageItem === "string") setStorageItem(data as StorageType);
    else {
      setStorageItem(data ? (JSON.parse(data) as StorageType) : null);
    }
  };

  const updateStorageItem = async (data: StorageType) => {
    if (typeof data !== "string") {
      const parsedData = JSON.stringify(data);
      await AsyncStorage.setItem(key, parsedData);
    } else {
      await AsyncStorage.setItem(key, data);
    }
    setStorageItem(data);

    return data;
  };

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  }

  useEffect(() => {
    getStorageItem();
  }, []);

  return [storageItem, updateStorageItem, clearStorageItem] as const;
};
