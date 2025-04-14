import { useState } from "react"; 
const AddQuoteForm = ({ onAddQuote }) => {
const [quote, setQuote] = useState(""); 
const [author, setAuthor] = useState(""); 
const handleSubmit = async (e) => {
e.preventDefault(); 
if (!quote.trim() || !author.trim()) return; 
const newQuote = { quote, author }; 
try {
// trimitem cererea POST catre backend
const response = await fetch("http://localhost:5000/api/quotes", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newQuote),
});
if (response.ok) {

const savedQuote = await response.json();
onAddQuote(savedQuote);
setQuote("");
setAuthor("");
}
} catch (error) {
console.error("Error adding quote:", error);
}
};
return (
<div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-xl shadowmd
transition-all duration-300 hover:shadow-lg">
<h2 className="text-xl font-semibold text-gray-800 mb-4 textcenter">
Add a New Quote</h2>
<form onSubmit={handleSubmit} className="flex flex-col gap-4">
<textarea w-full p-3 rounded-md border border-gray-300 bggray-50 text-gray-700 focus:outline-none focus:ring-2 
   focus:ring-gray400 transition-all duration-200
rows="4"
placeholder="Enter quote..."
value={quote}
onChange={(e) => setQuote(e.target.value)}
></textarea>
<input
type="text"
className="w-full p-3 rounded-md border border-gray-300 bggray-
50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-
400 transition-all duration-200"
placeholder="Author name..."
value={author}
onChange={(e) => setAuthor(e.target.value)}
/>
<button
type="submit"
className="w-full bg-gray-600 text-white py-3 rounded-md
shadow-md hover:bg-gray-700 transition-all duration-200"
>
Add Quote
</button>
</form>
</div>
);
};
export default AddQuoteForm;