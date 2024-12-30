import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { useEffect, useState } from "react";
import { Item } from "../types";
import { ArrowLeft, Edit } from "lucide-react";

const ViewItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items } = useInventory();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const foundItem = items.find((i) => i._id === id);
    if (foundItem) {
      setItem(foundItem);
    } else {
      navigate("/");
    }
  }, [id, items, navigate]);

  if (!item)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">
        {item.itemName}
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
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Quantity</h3>
            <p className="text-black">{item.quantity}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Price</h3>
            <p className="text-black">${item.price.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Category</h3>
            <p className="text-black">{item.category}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Description</h3>
            <p className="text-black">{item.description}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/edit/${item._id}`)}
          className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
        >
          <Edit size={20} className="mr-2" />
          Edit Item
        </button>
      </div>
    </div>
  );
};

export default ViewItem;
