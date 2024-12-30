import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { Item } from "../types";
import { useInventory } from "../context/InventoryContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const AddItem = () => {
  const navigate = useNavigate();
  const { addItem } = useInventory();

  const handleSubmit = async (data: Item) => {
    try {
      await addItem(data);
      toast.success("Item added successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add the item. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">
        Add New Item
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
      <ItemForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddItem;
