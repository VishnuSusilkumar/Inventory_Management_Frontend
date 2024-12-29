import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import { Item } from '../types';
import { useInventory } from '../context/InventoryContext';
import { toast } from 'sonner';

const AddItem = () => {
  const navigate = useNavigate();
  const { addItem } = useInventory();

  const handleSubmit = async (data: Item) => {
    try {
      await addItem(data);
      navigate('/');
    } catch (err) {
      toast.error('Failed to add the item. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <ItemForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddItem;

