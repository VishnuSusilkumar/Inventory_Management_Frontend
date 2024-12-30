import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

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
        toast.success("Item deleted successfully");
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
        <h1 className="text-3xl font-bold text-black">Inventory List</h1>
        <div className="space-x-4">
          <Link
            to="/add"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add New Item
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.itemName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/view/${item._id}`}
                    className="text-black hover:text-gray-600 inline-flex items-center"
                  >
                    <Eye size={18} />
                    <span className="sr-only">View</span>
                  </Link>
                  <Link
                    to={`/edit/${item._id}`}
                    className="text-black hover:text-gray-600 inline-flex items-center"
                  >
                    <Edit size={18} />
                    <span className="sr-only">Edit</span>
                  </Link>
                  <button
                    onClick={() => item._id && handleDeleteClick(item._id)}
                    className="text-black hover:text-gray-600 inline-flex items-center"
                  >
                    <Trash2 size={18} />
                    <span className="sr-only">Delete</span>
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
