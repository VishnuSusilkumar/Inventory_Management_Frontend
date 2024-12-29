import React, { createContext, useContext, useState, useEffect } from "react";
import { Item } from "../types";
import { fetchItems } from "../api";

interface InventoryContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems()
      .then((fetchedItems) => {
        setItems(fetchedItems);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch items");
        setLoading(false);
      });
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        items,
        loading,
        error,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
