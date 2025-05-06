import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddQuotePage from "./pages/AddQuotePage";
import EditQuotePage from "./pages/EditQuotePage";
import DeleteQuotePage from "./pages/DeleteQuotePage";
import QuotesList from "./components/QuotesList";
import Notification from "./components/Notification";
import DarkModeToggle from "./components/DarkToggle";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  useEffect(() => {
    fetch("http://localhost:5002/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error("Error fetching quotes:", err));
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleAddQuote = (newQuote) => {
    setQuotes((prevQuotes) => [newQuote, ...prevQuotes]);
  };



  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6 transition-colors duration-100">
      <nav className="font-bold text-center mb-6">
        <Link to="/" className=" text-blue-500 hover:underline mx-4">
          Home
        </Link>
        <Link to="/AddQuote" className="text-blue-500 hover:underline mx-4">
          Add Quote
        </Link>
        <DarkModeToggle/>
      </nav>

      <Notification message={notification.message} type={notification.type} />

      <Routes>
        <Route path="/" element={<QuotesList quotes={quotes} />} />
        <Route
          path="/AddQuote"
          element={<AddQuotePage onAddQuote={handleAddQuote} showNotification={showNotification} />}
        />
        <Route
          path="/edit/:id"
          element={<EditQuotePage showNotification={showNotification} quotes={quotes} setQuotes={setQuotes} />}
        />
        <Route
          path="/delete/:id"
          element={<DeleteQuotePage showNotification={showNotification} quotes={quotes} setQuotes={setQuotes} />}
        />
      </Routes>
    </div>
  );
}
export default App;