import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { useEffect, useState } from "react";
import { Item } from "../types";

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
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{item.itemName}</h1>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Quantity</h3>
            <p>{item.quantity}</p>
          </div>
          <div>
            <h3 className="font-semibold">Price</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="font-semibold">Category</h3>
            <p>{item.category}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{item.description}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/edit/${item._id}`)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Edit Item
        </button>
      </div>
    </div>
  );
};

export default ViewItem;
