import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { Item } from "../types";
import { useInventory } from "../context/InventoryContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const EditItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, updateItem } = useInventory();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const foundItem = items.find((i) => i._id === id);
    if (foundItem) {
      setItem(foundItem);
    } else {
      navigate("/");
    }
  }, [id, items, navigate]);

  const handleSubmit = async (data: Item) => {
    if (id) {
      try {
        await updateItem({ ...data, _id: id });
        toast.success("Item updated successfully");
        navigate("/");
      } catch (err) {
        toast.error("Failed to update the item. Please try again.");
      }
    }
  };

  if (!item)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">
        Edit Item
      </h1>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-black hover:text-gray-600 flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>
      <ItemForm onSubmit={handleSubmit} initialData={item} />
    </div>
  );
};

export default EditItem;
