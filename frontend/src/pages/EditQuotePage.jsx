import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";

const EditQuotePage = ({showNotification}) => {
  const { id } = useParams(); // extrage id-ul din URL
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [error, setError] = useState(null);
  



  useEffect(() => {
    fetch(`http://localhost:5002/api/quotes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuoteData(data))
      .catch((err) => console.error("Error loading quote:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, ...quoteDataWithoutId} = quoteData;

    try {
      const response = await fetch(`http://localhost:5002/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteDataWithoutId),
      });

      if (response.ok) {
        showNotification("Quote updated successfully!", "succes");
        navigate("/");
        
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.error || "Failed to update quote");
      }
    } catch (error) {
      showNotification("Failed to update quote.", "error")
      console.error("Error updating quote:", error);
      setError("Error updating quote");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Edit Quote
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="quote"
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            rows="4"
            placeholder="Edit quote..."
            value={quoteData.quote}
            onChange={handleChange}
          ></textarea>

          <input
            name="author"
            type="text"
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            placeholder="Author name..."
            value={quoteData.author}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-md shadow-md hover:bg-gray-700 transition-all duration-200"
          >
            Save Changes
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-600 hover:underline">
            ← Back to Quotes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditQuotePage;
