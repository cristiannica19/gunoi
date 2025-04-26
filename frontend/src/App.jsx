import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddQuotePage from "./pages/AddQuotePage";
import EditQuotePage from "./pages/EditQuotePage";
import DeleteQuotePage from "./pages/DeleteQuotePage";
import QuotesList from "./components/QuotesList";
function App() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = () => {
    fetch("http://localhost:5002/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error("Error fetching quotes:", err));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAddQuote = (newQuote) => {
    setQuotes((prevQuotes) => [newQuote, ...prevQuotes]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="text-center mb-6">
        <Link to="/" className="text-blue-500 hover:underline mx-4">
          Home
        </Link>
        <Link to="/AddQuote" className="text-blue-500 hover:underline mx-4">
          Add Quote
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<QuotesList quotes={quotes} />} />
        <Route
          path="/AddQuote"
          element={<AddQuotePage onAddQuote={handleAddQuote} />}
        />
        <Route path="/edit/:id" element={<EditQuotePage />} />
        <Route path="/delete/:id" element={<DeleteQuotePage />} />
      </Routes>
    </div>
  );
}

export default App;
