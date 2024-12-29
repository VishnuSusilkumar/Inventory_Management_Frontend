import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import InventoryList from "./pages/InventoryList";
import { Toaster } from "sonner";

function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<InventoryList />} />
              <Route path="/add" element={<AddItem />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;
