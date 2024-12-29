import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const InventoryList = () => {
  const { items, loading, error, deleteItem } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500">An error occurred: {error}</div>;

  //Delete Logic
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        await deleteItem(itemToDelete);
        setIsModalOpen(false);
        setItemToDelete(null);
      } catch (err) {
        toast.error("Failed to delete the item. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory List</h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add New Item
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/view/${item._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${item._id}`}
                    className="text-green-600 hover:text-green-900 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => item._id && handleDeleteClick(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default InventoryList;
