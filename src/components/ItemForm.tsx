import { useForm } from "react-hook-form";
import { Item } from "../types";

interface ItemFormProps {
  onSubmit: (data: Item) => void;
  initialData?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Item>({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-700"
        >
          Item Name
        </label>
        <input
          id="itemName"
          {...register("itemName", { required: "Item name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.itemName && (
          <p className="mt-1 text-sm text-red-600">{errors.itemName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          {...register("quantity", {
            required: "Quantity is required",
            min: 0,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          step="0.01"
          {...register("price", { required: "Price is required", min: 0 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          id="category"
          {...register("category", { required: "Category is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        {initialData ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
