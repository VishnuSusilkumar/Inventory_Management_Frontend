import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { Package, DollarSign, AlertTriangle } from "lucide-react";

const Header = () => {
  const { totalItems, totalValue, lowStockItems } = useInventory();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 mb-4 md:mb-0"
          >
            Inventory
          </Link>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
              <Package size={18} className="mr-2" />
              <span className="font-semibold">{totalItems}</span>
              <span className="ml-1 text-sm">Items</span>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1">
              <DollarSign size={18} className="mr-2" />
              <span className="font-semibold">${totalValue.toFixed(2)}</span>
              <span className="ml-1 text-sm">Value</span>
            </div>
            <div className="flex items-center bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">
              <AlertTriangle size={18} className="mr-2" />
              <span className="font-semibold">{lowStockItems}</span>
              <span className="ml-1 text-sm">Low Stock</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
