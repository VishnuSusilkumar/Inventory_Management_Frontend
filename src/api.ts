import axios from "axios";
import { Item } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
  throw error;
};

export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to Fetch Items");
  }
};

export const addItem = async (item: Item): Promise<Item> => {
  try {
    const response = await axios.post(`${API_URL}/items`, item);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to Add Item");
  }
};
