import React, { createContext, useContext, useState, useEffect } from "react";
import { Item } from "../types";
import { fetchItems, addItem, updateItem, deleteItem } from "../api";
import { toast } from "sonner";

interface InventoryContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
  addItem: (item: Item) => Promise<void>;
  updateItem: (item: Item) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
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

  const addItemToInventory = async (item: Item) => {
    try {
      const response = await addItem(item);
      const newItem = response.data;
      setItems((prevItems) => [...prevItems, newItem]);
      toast.success("Item added successfully");
    } catch (err: any) {
      toast.error(err.response.data.error);
    }
  };

  const updateItemInInventory = async (item: Item) => {
    try {
      const response = await updateItem(item);
      const updatedItem = response.data;
      setItems((prevItems) =>
        prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i))
      );
      toast.success("Item updated successfully");
    } catch (err: any) {
      toast.error(err.response.data.error)
    }
  };

  const deleteItemFromInventory = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.success("Item deleted successfully");
    } catch (err: any) {
      toast.error(err.response.data.error);
    }
  };

  const totalItems = items.length;
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const lowStockItems = items.filter((item) => item.quantity < 10).length;

  return (
    <InventoryContext.Provider
      value={{
        items,
        loading,
        error,
        addItem: addItemToInventory,
        updateItem: updateItemInInventory,
        deleteItem: deleteItemFromInventory,
        totalItems,
        totalValue,
        lowStockItems,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
