import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Inventory
          </Link>
          <nav>
            <Link
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Item
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
