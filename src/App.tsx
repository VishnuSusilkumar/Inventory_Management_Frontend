import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import ViewItem from "./pages/ViewItem";
import InventoryList from "./pages/InventoryList";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import "./styles/globals.css";

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
              <Route path="/edit/:id" element={<EditItem />} />
              <Route path="/view/:id" element={<ViewItem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;
